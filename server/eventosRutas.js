const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var Event = require('./model/evento.js');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

router.post('/new', async(req, res) => {
    const event = req.body;
    var user = req.body.user
    try {
        if (req.body.end_date != null) {
            await new Event({
                start: event.start,
                title: event.title,
                end: event.end,
                start_hour: event.start_hour,
                end_hour: event.end_hour,
                user_id: user
            }).save();
            res.status(200).send('Evento');
        } else {
            await new Event({
                start: event.start,
                title: event.title,
                end: event.start,
                start_hour: event.start_hour,
                end_hour: event.end_hour,
                user_id: user
            }).save();
            res.status(200).send('Evento');
        }
    } catch (err) {
        console.log(err.stack)
        return res.status(400).send({
            message: err.message
        });
    }
})

router.get('/all', async function(req, res) {
    const events = await Event.find();
    var eventsRespuesta = [];

    for (let i = 0; i < events.length; i++) {
        const elemento = events[i];
        eventsRespuesta.push({
            id: elemento._id,
            title: elemento.title,
            start: elemento.start,
            end: elemento.end,
            user_id: elemento.user_id
        });
    }
    return res.status(200).send(eventsRespuesta);
})

router.post('/delete/:id', async function(req, res) {
    try {
        const eventDeleted = await Event.findByIdAndDelete(req.body.id);

        if (eventDeleted) {
            res.status(200).send('Evento eliminado satisfactoriamente!');
        } else {
            res.status(200).send('Evento no se logró eliminar');
        }
    } catch (e) {
        res.status(400).send('Error interno del servidor');
    }

})

router.put('/update', async function(req, res) {
    const event = req.body;
    var user = req.body.user
    const filterId = event.id
    try {
        let evento = {
            start: event.start,
            title: event.title,
            end: event.end,
            start_hour: event.start_hour,
            end_hour: event.end_hour,
            user_id: user
        };
        const updateEvent = await Event.findOneAndUpdate(filterId, evento)
        if (updateEvent) {
            res.status(200).send('OK');
        }

    } catch (e) {
        console.log(e.message);
        res.status(400).send('Registro no actualizado.');
    }

})

module.exports = router