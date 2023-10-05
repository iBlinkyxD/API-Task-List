const express = require('express');

const {deleteUserById, getUsers, getUserById} = require('../db/users');

module.exports.getAllUsers = async (req, res) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

module.exports.deleteUser = async (req, res) => {
    try{
        const {id} = req.params;

        const deleteUser = await deleteUserById(id);

        return res.json(deleteUser);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

module.exports.updateUser = async (req, res) => {
    try{
        const {id} = req.params;
        const {username} = req.body;
        
        if(!username){
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        user.username = username;
        await user.save();

        return res.status(200).json(user).end();
    }catch(error){
        console.error();
        return res.sendStatus(400);
    }
}