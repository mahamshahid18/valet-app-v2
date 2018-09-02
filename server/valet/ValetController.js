'use strict';

const express = require('express');
const Valet = require('./Valet');
const tokenCheck = require('../auth/TokenCheck');
const md5 = require('md5');

const router = express.Router();

router.route('/')
    .post((req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;

        const valet = new Valet({
            username: username,
            password: md5(password)
        });

        valet.save()
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                next(err);
            });
    });

router.route('/verify')
    .get(tokenCheck, (req, res, next) => {
        Valet.findOne({
            "_id": req.id
        })
        .then((valet) => {
            if (!valet) {
                res.status(404).send('No such resource exists!');
            }
            res.status(200).send();
        }, (err) => {
            next(err);
        });
    });

module.exports = router;
