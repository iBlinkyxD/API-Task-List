const express = require('express');
const {getAllUsers, deleteUser, updateUser} = require('../controllers/users');
const {isAuthenticated, isOwner} = require('../middlewares');

module.exports = (router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/delete/:id', isAuthenticated, isOwner, deleteUser)
    router.patch('/users/update/:id', isAuthenticated, isOwner, updateUser)
};
