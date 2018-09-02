'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../user/User');
const Valet = require('../valet/Valet');
const router = express.Router();

router.route('/user')
    .post((req, res, next) => {
        let ticket_no = req.body.ticket_no;
        let phone = req.body.phone;
        let reg_no = req.body.reg_no;

        const user = User.findOne({
            "ticket.no": ticket_no,
            "phone_no": phone,
            "car.reg_no": reg_no
        });
        next(user);
    });

router.route('/valet')
    .post((req, res, next) => {
        let uname = req.body.uname;
        let pwd = req.body.pwd;

        const valet = Valet.findOne({
            "username": uname,
            "password": pwd
        });
        next(valet);
    });

router.use((promise, req, res, next) => {
    let tokenSecret = process.env.SECRET;

    promise.then((resource) => {
        if (!resource) {
            return res.status(404).send('No such resource exists!');
        }

        let token = jwt.sign({ id: resource._id }, tokenSecret, {
            expiresIn: '1h'
        });
        res.status(200);
        res.send({ auth: true, token: token });
    })
    .catch((err) => {
        next(err);
    });
});

module.exports = router;
