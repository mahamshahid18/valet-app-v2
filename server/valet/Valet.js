'use strict';

const mongoose = require('mongoose');

const valetSchema = new mongoose.Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('valet', valetSchema);
