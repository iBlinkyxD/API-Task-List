const express = require('express');
const authentication = require('./authentication');
const users = require('./users');

const router = express.Router();

module.exports = () => {

    authentication(router);
    users(router);
    return router;
};