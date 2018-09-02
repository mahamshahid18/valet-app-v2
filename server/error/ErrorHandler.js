'use strict';

let errorHandler = (err, req, res, next) => {
    res.status(err.status);
    res.send(err);
    console.log('\n<<<<<<<<   Error Occurred   >>>>>>>>');
    console.log('Status: ' + err.status);
    console.log('Message: ' + err.error);
    console.log('\n' + JSON.stringify(err) + '\n');

    next();
};

module.exports = errorHandler;
