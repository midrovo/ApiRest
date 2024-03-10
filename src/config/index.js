require('dotenv').config();

module.exports.config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DBNAME
}
