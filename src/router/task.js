const express = require('express');
const {addTask, getUserTasks, getAllTasks, deleteUserTasks, updateTask} = require('../controllers/task.js');
const {isAuthenticated, isOwner, isTaskOwner} = require('../middlewares');

module.exports = (router) => {
    router.post('/task/add/:id', isAuthenticated, isOwner ,addTask);
    router.get('/task/:id', isAuthenticated, isOwner, getUserTasks);
    router.get('/task', isAuthenticated, getAllTasks);
    router.delete('/task/delete/:userid/:taskid', isAuthenticated, isTaskOwner, deleteUserTasks);
    router.patch('/task/update/:userid/:taskid', isAuthenticated, isTaskOwner, updateTask);
};
