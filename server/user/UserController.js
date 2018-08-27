'use strict';

const express = require('express');
const User = require('./User');
const tokenCheck = require('../auth/TokenCheck');

const router = express.Router();

/**
 * Endpoint to get user details
 *
 * @name GET/user
 *
 * @param {string} ticket - Ticket number generated for user
 *
 * Returns HTTP 200 OK status code
 * Returns a JSON object containing user details
 */
router.route('/')
    .get(tokenCheck, (req, res, next) => {
        const ticketNum = req.query.ticket;
        User.findOne({
            "ticket.no": ticketNum,
            "_id": req.userId
        })
        .then((user) => {
            res.status(200);
            res.json(user);
            console.log('===========\nUser sent\n===========');
            console.log(user);
        }, (err) => {
            next(err);
            res.send(err);
        });
    })
    .patch(tokenCheck, (req, res, next) => {
        const ticketNum = req.query.ticket;
        User.updateOne(
            { "ticket.no": ticketNum },
            { $set: { "ticket.paid": true } }
        )
        .then(() => {
            res.status(200).send();
            console.log('===========\nTicket status updated\n===========');
        }, (err) => {
            next(err);
            res.send(err);
        });
    });

router.route('/verify')
    .get(tokenCheck, (req, res, next) => {
        User.findOne({
            "_id": req.id
        })
        .then((user) => {
            res.status(200).send();
        }, (err) => {
            next(err);
            res.send(err);
        });
    });

module.exports = router;
