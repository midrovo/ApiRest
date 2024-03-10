const { MongoClient } = require('mongodb');
const { config } = require('../config');
const debug = require('debug')('app:module-database');

var connection = null
module.exports.database = (collection) => new Promise(async (resolve, reject) => {
    try {
        if(!connection) {
            const client = new MongoClient(config.mongoUri);
            connection = await client.connect();
            debug('Nueva conexion realizada con MongoDB atlas');
        }

        debug('Reutilizando conexion')
        const db = connection.db(config.mongoDbName);
        resolve(db.collection(collection))

    } catch(error) {
        reject(error)
    }
})

