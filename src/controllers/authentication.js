const express = require('express');

const {getUserByEmail, createUser} = require('../db/users');
const {random, authentication} = require('../helpers');

module.exports.register = async (req, res) => {
    try{
        const{email, password, username} = req.body;

        if(!email || !password || !username){
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser){
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication:{
                salt,
                password: authentication(salt, password),
            },
        });
        
        return res.status(200).json(user).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}