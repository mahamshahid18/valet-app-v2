'use strict';

const mongoose = require('mongoose');

class DbConnector {
    constructor() {
        this.serverName = process.env.DB_BASE_URL;
        this.port = process.env.DB_PORT;
        this.dbName = process.env.DB_NAME;
    }

    connect() {
        const dbUri = `${this.serverName}:${this.port}`;
        return mongoose.connect(`mongodb://${dbUri}/${this.dbName}`, { useNewUrlParser: true });
    }
}

module.exports = DbConnector;
