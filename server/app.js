'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Twilio = require('twilio');
const helmet = require('helmet');
const fs = require('fs');
const dbConfig = require('./dbConfig');
const dbConnector = require('./dbConnector');

// start of the sequence number for generating tickets
// let seqNo = JSON.parse(fs.readFileSync('./sequencer.json')).start;
let seqNo = Math.round(Math.random() * 100);
let userModel;

let createUserModel = () => {
    userModel = mongoose.model('user', new mongoose.Schema({
        first_name: String,
        last_name: String,
        phone_no: String,
        ticket: {
            no: { type: String, unique: true, required: true, uppercase: true },
            paid: { type: Boolean, default: false },
            amount: { type: Number, default: 5 }
        },
        car: {
            reg_no: { type: String, required: true, uppercase: true },
            color: String,
            manufacturer: String,
            model: String
        }
    }));
}

const app = express();
// support encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
    res.send('Greetings, young one!');
});

app.listen(3000, () => {
    console.log('Server started; listening on port 3000');

    let dbCon = new dbConnector(dbConfig.dbServer, dbConfig.dbPort, dbConfig.dbName);
    dbCon.connect()
        .then(() => {
            console.log('Db connected successfully');
            createUserModel();
        }, (err) => {
            console.log(err);
            process.exit(1);
        });
});

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
app.route('/ticket')
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

        let user = new userModel({
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

                // add twilio app credentials
                const accountSid = 'ACe95761f79c6402d49380108bdba3be0c';
                const authToken = '73cd5dd816f8ccbe3bde5ec5c21a6e35';
                const twilioPhoneNumber = '+18589430166';

                const client = new Twilio(accountSid, authToken);

                // send ticket link to user via sms
                // client.messages.create({
                //     body: `Open up this link to view your valet ticket: ${ticketLink}`,
                //     to: phoneNumber,
                //     from: twilioPhoneNumber
                // });

                console.log(`==========\n${ticketLink}\n==========`);

                res.status(200).send();

                // fs.writeFile('sequencer.json', JSON.stringify({
                //     'start': seqNo
                // }, null, 4));
            }, (err) => {
                next(err);
                res.send(err);
            });
    });


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
app.route('/user')
    .get((req, res, next) => {
        const ticketNum = req.query.ticket;
        userModel.findOne(
            { "ticket.no": ticketNum }
        )
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
    .patch((req, res) => {
        const ticketNum = req.query.ticket;
        userModel.updateOne(
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
app.route('/qrcode')
    .get((req, res, next) => {
        const ticketNum = req.query.ticket;
        userModel.findOne(
            { "ticket.no" : ticketNum},
            { "ticket.paid": 1, "ticket.amount": 1, "car.reg_no": 1 }
        )
        .then((user) => {
            const segments = [
                { 'data': `${user.car.reg_no}\n`, mode: 'byte' },
                { 'data': `${user.ticket.amount}\n`, mode: 'byte' },
                { 'data': user.ticket.paid? 'PAID' : 'UNPAID', mode: 'alphanumeric' }
            ];
            res.status(200);
            res.send(segments);
            console.log('===========\nQRCode sent\n===========');
        }, (err) => {
            next(err);
            res.send(err);
        });
    });
