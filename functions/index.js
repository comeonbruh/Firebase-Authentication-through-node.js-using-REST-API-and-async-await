const functions = require("firebase-functions");
const admin  = require("firebase-admin")
const express = require("express");
const bcrypt = require('bcrypt');
var saltRounds = 10;
const app = express();

admin.initializeApp()

app.post('/create', async(req , res) => {
    await bcrypt.hash(req.body.password, saltRounds, (err , hash) => {
        console.log(hash)
        try{
            admin.auth().createUser({
                email : req.body.email,
                emailVerified : false,
                phoneNumber : req.body.phone,
                password : hash,
                displayName : req.body.name,
                disabled : false
            }).then((userRecord) => {
                console.log('Successfully created new user:', userRecord.uid);
              })
        } catch(e){
            console.log(e)
            res.json({message : 'Error creating user'})
        }
    })
})

exports.users = functions.https.onRequest(app);