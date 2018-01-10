import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';

import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import config from './serverConfig.js';// get our config file
import User from './models/User.js';
import { find } from './dbMethods.js';
const port = config.port || 8080;

mongoose.connect(config.databaseUrl); // connect to database
app.set('secret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =================================================================
// routes ==========================================================
// =================================================================

/**
 * register call
 * responses with {success: [bool], name: [string], password [string] }
 */
app.get('/register', (req, res) => {

    // create a sample user
    const nick = new User({
        name: 'Nick',
        password: 'P@ssw0rd',
        admin: true
    });
    nick.save((err) => {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true, name: 'Nick', password: 'P@ssw0rd' });
    });
});
//static files
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.resolve(__dirname, './dist/style.css'));
});

app.get('/assets/bundle.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './dist/bundle.js'));
});
//-------------

//unsecured api for test purposes
app.post('/apis', (req, res) => {
    find(req.body).then(({result, client}) => {
        client.close();
        res.send(result)
    }, ({err, client}) => {
        client.close();
        res.status(503).send(err);
    });
});

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
const apiRoutes = express.Router();

// ---------------------------------------------------------
// authentication (no middleware necessary since this isn`t authenticated)
// ---------------------------------------------------------
apiRoutes.post('/authenticate', (req, res) => {
    // find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(400).send({ success: false, code: 'user.not.found', message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.status(400).send({ success: false, code: 'wrong.password', message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                const payload = {
                    admin: user.admin
                };
                const token = jwt.sign(payload, app.get('secret'), {
                    expiresIn: 600 // expires in 10 minutes
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use((req, res, next) => {
    // check header or post parameters for token
    const token = req.body.token || ( req.headers.authorization ? req.headers.authorization.split(" ")[1] : undefined ); //to handle error with split

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('secret'), function(err, decoded) {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(400).send({
                        success: false,
                        code: 'token.expired',
                        message: `Token expired at ${new Date(err.expiredAt)}`
                    });
                }
                // because of some magic authorization failed
                return res.status(400).send({ success: false, code: 'auth.failed' , message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(400).send({
            success: false,
            code:'no.token',
            message: 'No token provided'
        });

    }

});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------

//secured users API
apiRoutes.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    });
});

//secured check (is token expired) API
apiRoutes.get('/check', (req, res) => {
    res.json({success: true});
});

//secured get data call API
apiRoutes.post('/findData', (req, res) => {
    find(req.body).then(({result, client}) => {
        client.close();
        res.send(result)
    }, ({err, client}) => {
        client.close();
        res.status(503).send(err);
    });
});

app.use('/api', apiRoutes);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log(`Server available on http://localhost:${port}`);