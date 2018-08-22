'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('user', userSchema);
