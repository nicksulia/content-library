const MongoClient = require('mongodb').MongoClient;
import config from './serverConfig.js'
const url = config.databaseUrl;
const collection = config.collectionName;
const database = config.databaseName;

export const find = ({ searchBy = {}, sortBy = "", filter = {type: ""}, cursor = 1 }) => {

    return new Promise((res, rej) => {
        MongoClient.connect(url, (err, client) => {
            if (err) {
                console.log('Error in mongo-client callback');
                rej({err, client});
            }
            res({db:client.db(database), client:client});
        });
    }).then(({db, client}) => {

        return new Promise((res,rej) => {
            //limitations and sort options as variable to prevent code duplication
            const options =
                {
                    limit: 1000*(cursor || 1),
                    sort: sortBy ? {[sortBy]:-1} : {_id:1}
                };

            //callback as variable to prevent code duplication
            const collectionCallback = (err, result) => {
                if (err) {
                    console.log('Error in collection callback', err);
                    rej({err, client});
                }
                res({result, client});
            };
            if(filter.type) {
                switch (filter.type) {
                    case 'range-date':
                        db.collection(collection).find(
                            Object.assign({},{
                                modified: {
                                    $gte: filter.options.from ? new Date(filter.options.from) : new Date(2000, 1, 1),
                                    $lte: filter.options.to ? new Date(filter.options.to) : new Date(2040, 1, 1),
                                }
                            },searchBy),
                            options
                            )
                            .toArray(collectionCallback);
                        break;
                    case 'range-currency':
                        db.collection(collection).find(
                            Object.assign({},{
                                value: {
                                    $gte: filter.options.from ? parseFloat(filter.options.from) : -Infinity,
                                    $lte: filter.options.to ? parseFloat(filter.options.to) : Infinity,
                                },
                                currency: filter.options.currency ? filter.options.currency : 'USD'
                            },searchBy),
                            options
                        )
                            .toArray(collectionCallback);
                        break;
                    default:
                        db.collection(collection).find(searchBy, options).toArray(collectionCallback);
                }
            }
            db.collection(collection).find(searchBy, options).toArray(collectionCallback);
        });
    });
};