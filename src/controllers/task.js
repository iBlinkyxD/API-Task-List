const express = require('express');
const mongoose = require('mongoose');

const {userTasks, createTask, getTasks, deleteTaskById, updateTaskById, getTaskById} = require('../db/task');
const {getUserById} = require('../db/users');

module.exports.addTask = async (req, res) => {
    try{
        const{id} = req.params;
        const{title, description, dueDate, completed} = req.body;
        const userId = await getUserById(id);

        if(!title){
            return res.sendStatus(400);
        }

        const task = await createTask({
            title,
            description,
            dueDate,
            completed,
            createdBy: userId
        });
        
        return res.status(200).json(task).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}

module.exports.getUserTasks = async (req, res) => {
    try{
        const{id} = req.params;
        const userId = await getUserById(id);

        if(!userId){
            return res.sendStatus(400);
        }

        const tasks = await userTasks(userId);
        return res.status(200).json(tasks);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

module.exports.getAllTasks = async (req, res) => {
    try{
        const tasks = await getTasks();
        return res.status(200).json(tasks);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

module.exports.deleteUserTasks = async (req, res) => {
    try{
        const {userid, taskid} = req.params;
        
        const deleteTask = await deleteTaskById(taskid);

        return res.json(deleteTask);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

module.exports.updateTask = async (req, res) => {
    try{
        const {userid, taskid} = req.params;
        const{title, description, dueDate, completed} = req.body;

        if(!title){
            return res.sendStatus(400);
        }

        const task = await getTaskById(taskid);

        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.completed = completed;
        task.editedOn = Date.now();
        delete task.createdOn;

        await task.save();

        return res.status(200).json(task).end();
    }catch(error){
        console.log(error);
        return res.sendStatus(400)
    }
}