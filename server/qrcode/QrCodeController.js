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
            { "ticket.no": 1, "ticket.paid": 1, "ticket.amount": 1, "car.reg_no": 1 }
        )
        .then((user) => {
            if (!user) {
                return res.status(404).send('No such resource exists!');
            }
            const data = {
                ticket_no: user.ticket.no,
                reg_no: user.car.reg_no,
                amount: user.ticket.amount,
                status: user.ticket.paid ? 'PAID' : 'UNPAID'
            };
            res.status(200);
            res.send(data);
            console.log('===========\nQRCode sent\n===========');
        }, (err) => {
            next(err);
        });
    });

module.exports = router;
