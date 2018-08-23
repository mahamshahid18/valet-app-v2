'use strict';

const express = require('express');
const User = require('../user/User');
const checkToken = require('../auth/TokenCheck');

const router = express.Router();

/**
 * Endpoint which returns data needed for QR Code
 * verificaton - to check if payment has been made
 *
 * @name GET/user/validation
 *
 * @param {string} ticket - Ticket number generated for user
 *
 * Returns HTTP 200 OK status code
 * Returns a JSON object containing user data for validation
 */
router.route('/')
    .get(checkToken, (req, res, next) => {
        const ticketNum = req.query.ticket;
        User.findOne(
            { "ticket.no": ticketNum },
            { "ticket.paid": 1, "ticket.amount": 1, "car.reg_no": 1 }
        )
        .then((user) => {
            const segments = [
                { 'data': `${user.car.reg_no}\n`, mode: 'byte' },
                { 'data': `${user.ticket.amount}\n`, mode: 'byte' },
                { 'data': user.ticket.paid ? 'PAID' : 'UNPAID', mode: 'alphanumeric' }
            ];
            res.status(200);
            res.send(segments);
            console.log('===========\nQRCode sent\n===========');
        }, (err) => {
            next(err);
            res.send(err);
        });
    });

module.exports = router;
