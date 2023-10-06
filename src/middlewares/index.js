const express = require('express');
const {get, merge} = require('lodash');

const {getUserBySessionToken} = require('../db/users');
const {getTaskById} = require('../db/task');

module.exports.isOwner = async (req, res, next) => {
    try{
        const {id} = req.params;
        const currentUserId = get(req, 'identity._id');

        if(!currentUserId){
            return res.sendStatus(403);
        }

        if(currentUserId.toString() != id){
            return res.sendStatus(403);
        }

        next();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

module.exports.isTaskOwner = async (req, res, next) => {
    try{
        const {userid, taskid} = req.params;
        const currentUserId = get(req, 'identity._id');

        if(!currentUserId){
            return res.sendStatus(403);
        }

        if(currentUserId.toString() != userid){
            return res.sendStatus(403);
        }

        const task = await getTaskById(taskid);

        if(currentUserId.toString() != task.createdBy){
            return res.sendStatus(400);
        }
        next();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

module.exports.isAuthenticated = async (req, res, next) => {
    try{
        const sessionToken = req.cookies['USER-AUTH'];

        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser){
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser});

        return next();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}