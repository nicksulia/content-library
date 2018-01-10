export default Object.freeze({
    'secret': 'allyourbasearebelongstous', //secret for node-jwt
    'databaseUrl': 'mongodb://localhost:27001/testDB', //used for node connection
    'databaseName': 'testDB',
    'collectionName': 'data',
    'port': '8009', //server port
    'portDB': '27001', // db port (used for import)
    'hostDB':'127.0.0.1' //db host (used for import)
});