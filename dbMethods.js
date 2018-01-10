const MongoClient = require('mongodb').MongoClient;
import config from './serverConfig.js'
const url = config.databaseUrl;
const collection = config.collectionName;
const database = config.databaseName;

export const find = ({ searchBy = {}, sortBy = "", filter = {type: ""}, cursor = 1 }) => {
    //TODO: validate params before using it and return proper errors if validation is not passed
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
                    skip: 1000*(cursor ? (cursor - 1) : 0) || 0, //case NaN returns 0
                    limit: 1000, //hardcoded response limitation
                    sort: sortBy ? {[sortBy]:-1} : {_id:1}
                };

            //callback as variable to prevent code duplication
            const collectionCallback = (err, result) => {
                if (err) {
                    console.log('Error in collection callback', err);
                    //TODO: create proper error responses for different types of errors
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
                                    $gte: filter.options.from ? new Date(filter.options.from) : new Date(2000, 1, 1), //if empty, returns (min, max)
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
                                    $gte: filter.options.from !== undefined ? parseFloat(filter.options.from) : -Infinity, //if empty, returns (min, max)
                                    $lte: filter.options.to !== undefined ? parseFloat(filter.options.to) : Infinity,
                                },
                                currency: filter.options.currency ? filter.options.currency : 'USD' //default currency
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