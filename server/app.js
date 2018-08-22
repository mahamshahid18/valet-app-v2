'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dbConfig = require('./db/dbConfig');
const DbConnector = require('./db/DbConnector');
let UserController = require('./user/UserController');
let QrCodeController = require('./qrcode/QrCodeController');
let TicketController = require('./ticket/TicketController');

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

    let dbCon = new DbConnector(dbConfig.dbServer, dbConfig.dbPort, dbConfig.dbName);
    dbCon.connect()
        .then(() => {
            console.log('Db connected successfully');
        }, (err) => {
            console.log(err);
            process.exit(1);
        });
});

app.use('/ticket', TicketController);
app.use('/user', UserController);
app.use('/qrcode', QrCodeController);
