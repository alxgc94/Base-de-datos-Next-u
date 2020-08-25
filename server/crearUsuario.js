const mongoose = require('mongoose');
var User = require('./model/usuario.js');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://manuel:21415246@cluster0.gkzru.gcp.mongodb.net/test?retryWrites=true&w=majority', function() {
    var _user = new User({
        userId: 'prueba',
        pass: bcrypt.hashSync('123', 10)
    })

    _user.save(function(err, user) {
        if (err) console.log(err);

        console.log('user', user);
    })
})