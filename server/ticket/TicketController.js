'use strict';

const express = require('express');
const User = require('../user/User');

const router = express.Router();

// start of the sequence number for generating tickets
// let seqNo = JSON.parse(fs.readFileSync('./sequencer.json')).start;
let seqNo = Math.round(Math.random() * 100);

/**
 * Endpoint to generate an e-ticket
 *
 * @name POST/generateTicket
 *
 * @param {string} name - Name of user
 * @param {string} phone - User's cellphone number
 * @param {string} reg_no - Car's registration number
 * @param {string} color - Car color
 * @param {string} model_make - Car's model & make
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
        const ticketLink = `http://localhost:4200/ticket/${ticket_no}`;

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
                seqNo = Math.round(Math.random() * 100);

                console.log(`==========\n${ticketLink}\n==========`);

                res.status(200).send();

                // fs.writeFile('sequencer.json', JSON.stringify({
                //     'start': seqNo
                // }, null, 4));
            }, (err) => {
                next(err);
                res.status(500);
                res.send({
                    status: 500,
                    error: err,
                });
            });
    });

module.exports = router;
