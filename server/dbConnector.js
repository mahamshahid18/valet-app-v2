'use strict';

const mongoose = require('./mongoose');

class DbConnector {
    constructor(server, port, db) {
        this.serverName = server;
        this.port = port;
        this.dbName = db;
    }

    connect() {
        const dbUri = `${this.serverName}:${this.port}`;
        return mongoose.connect(`mongodb://${dbUri}/${this.dbName}`, { useNewUrlParser: true });
    }
}

module.exports = DbConnector;
