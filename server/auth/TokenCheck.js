'use strict';

const jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
    let token = req.headers.authorization;
    let tokenSecret = process.env.SECRET;

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token set' });
    }

    jwt.verify(token, tokenSecret, (err, decoded) => {
        if (err) {
            return next({
                error: err,
                status: 401,
                message: 'Invalid token, token has expired'
            });
        }
        req.id = decoded.id;
        next();
    });
}

module.exports = checkToken;
