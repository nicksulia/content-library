import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import config from './serverConfig.js';// get our config file

import User from './models/User.js';

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
app.get('/register', function(req, res) {

    // create a sample user
    const nick = new User({
        name: 'Nick',
        password: 'P@ssw0rd',
        admin: true
    });
    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

app.get('/', function(req, res) {
    res.send(`Hello! The API is at http://localhost:${port}/api`);
});

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
const apiRoutes = express.Router();

// ---------------------------------------------------------
// authentication (no middleware necessary since this isn`t authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                const payload = {
                    admin: user.admin
                };
                const token = jwt.sign(payload, app.get('secret'), {
                    expiresIn: 86400 // expires in 24 hours
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
apiRoutes.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.headers.authorization.split(" ")[1];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('secret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome!' });
});

apiRoutes.post('/', function(req, res) {
    res.json({ message: 'Welcome!' });
});

apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

apiRoutes.get('/check', function(req, res) {
    res.json(req.decoded);
});

app.use('/api', apiRoutes);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log(`Server available on http://localhost:${port}`);