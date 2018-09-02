'use strict';

const express = require('express');
const User = require('../user/User');
const router = express.Router();

let seqNo = Math.round(Math.random() * process.env.SEQ_START);
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

let sendTextMessage = (phoneNo, ticketLink) => {
    return client.messages
        .create({
            body: `Open up this link to view your valet ticket: ${ticketLink}`,
            from: process.env.TWILIO_PHONE_NO,
            to: phoneNo
        });
}

/**
 * Endpoint to generate an e-ticket
 *
 * @name POST/ticket
 *
 * @param {string} first_name - First name of user
 * @param {string} last_name - Surname of user
 * @param {string} phone_no - User's cellphone number
 * @param {string} reg_no - Car's registration number
 * @param {string} color - Car color
 * @param {string} manufacturer - Car manufacturer
 * @param {string} model - Car model
 *
 * Returns HTTP 200 OK status code
 */
router.route('/')
    .post((req, res, next) => {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const phone_no = req.body.phone_no;
        const reg_no = req.body.reg_no;
        const color = req.body.color;
        const manufacturer = req.body.manufacturer;
        const model = req.body.model;
        const ticket_no = `${seqNo}${reg_no}`;
        const ticketLink = `${process.env.APP_BASE_URL}user/${ticket_no}/login`;

        let user = new User({
            first_name,
            last_name,
            phone_no,
            ticket: {
                no: ticket_no,
            },
            car: {
                reg_no,
                color,
                manufacturer,
                model
            },
        });

        user.save()
        .then((value) => {
                process.env.SEQ_START++;
                seqNo = Math.round(Math.random() * process.env.SEQ_START);

                sendTextMessage(phone_no, ticketLink)
                    .then((values) => {
                        res.status(200).send();
                        console.log('Text message sent');
                        console.log(`==========\n${ticketLink}\n==========`);
                    })
                    .catch((err) => {
                        return next({
                            error: err,
                            status: 500,
                            message: 'There was a problem processing the request'
                        });
                    });
            }, (err) => {
                next(err);
            });
    });

module.exports = router;
