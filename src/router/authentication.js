const express = require('express');
const {register} = require('../controllers/authentication');

module.exports = (router) => {
    router.post('/auth/register', register);
};
