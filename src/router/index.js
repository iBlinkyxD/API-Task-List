const express = require('express');
const authentication = require('./authentication');
const users = require('./users');
const task = require('./task');

const router = express.Router();

module.exports = () => {

    authentication(router);
    users(router);
    task(router);
    return router;
};