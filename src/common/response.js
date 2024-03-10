const createError = require('http-errors');

module.exports.response = {
    success: (res, status, message, body={}) => {
        res.status(status).json({ message, body });
    },

    error: (res, error = null) => {
        const { statusCode, message } = error ? error : new createError.InternalServerError();
        res.status(statusCode).json({ message });
    }
}