const express = require('express');
const {addTask, getUserTasks, getAllTasks, deleteUserTasks, updateTask} = require('../controllers/task.js');
const {isAuthenticated, isOwner, isTaskOwner} = require('../middlewares');

module.exports = (router) => {
    router.post('/task/add/:id' ,addTask);
    router.get('/task/:id', getUserTasks);
    router.get('/task', getAllTasks);
    router.delete('/task/delete/:userid/:taskid', deleteUserTasks);
    router.patch('/task/update/:userid/:taskid', updateTask);
};
