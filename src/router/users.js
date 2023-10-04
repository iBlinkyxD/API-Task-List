const express = require('express');
const {getAllUsers, deleteUser, updateUser} = require('../controllers/users');
const {isAuthenticated, isOwner} = require('../middlewares');

module.exports = (router) => {
    router.get('/users', getAllUsers);
    router.delete('/users/delete/:id', deleteUser)
    router.patch('/users/update/:id', updateUser)
};
