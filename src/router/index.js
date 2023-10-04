const express = require('express');
const authentication = require('./authentication');

const router = express.Router();

module.exports = () => {

    authentication(router);

    return router;
};