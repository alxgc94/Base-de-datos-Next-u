const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./model/usuario');
const MongoClient = require('mongodb').MongoClient;
var Event = require('./model/evento.js');

router.post('/', async function (req, res, next) {
    const user1 = req.body.user
    const pass1 = req.body.pass
    try {
        const user = await User.findOne({}, {
            userId: user1

        })
        const pass = await User.findOne({}, {
            pass: pass1
        })
        var match = user && bcrypt.compare("" + pass1, "" + pass);
        console.log(match)
        if (user && match) {
            return res.status(200).send('Validado');
        } else {
            return res.status(400).send('Access denied');
        }
    } catch (err) {
        console.log('error rutasjs')
        return res.status(500).send({
            message: err.message
        });
    }
})

module.exports = router