'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../user/User');
const router = express.Router();

router.route('/')
    .post((req, res, next) => {
        let ticket_no = req.body.ticket_no;
        let phone = req.body.phone;
        let reg_no = req.body.reg_no;
        let tokenSecret = process.env.SECRET;

        User.findOne({
            "ticket.no": ticket_no,
            "phone_no": phone,
            "car.reg_no": reg_no
        })
        .then((user) => {
            if(!user) {
                res.status(401).send({ auth: false, token: null});
            } else {
                let token = jwt.sign({ id: user._id }, tokenSecret, {
                    expiresIn: '1h'
                });
                res.status(200);
                res.send({ auth:true, token: token});
            }
        }, (err) => {
            next(err);
            res.send(err);
        });
    });

module.exports = router;
