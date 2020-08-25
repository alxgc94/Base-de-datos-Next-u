const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const PORT = 8083;
const app = express();
const Server = http.createServer(app);
const Routing = require('./server/rutas.js');
const eventRouting = require('./server/eventosRutas.js');



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('client'));
app.use('/login', Routing);
app.use('/events', eventRouting);
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.sendFile('./client/index.html');
});

Server.listen(PORT, function() {
    mongoose.connect('mongodb+srv://manuel:21415246@cluster0.gkzru.gcp.mongodb.net/test?retryWrites=true&w=majority', function(err) {
        if (err) console.log('Error connecting database', err);
        console.log('Database connected!');
    })
    console.log('Server is listening on port: ' + PORT);


})