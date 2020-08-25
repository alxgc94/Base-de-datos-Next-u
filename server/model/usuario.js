var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
})

var User = mongoose.model('usuarios', userSchema);

module.exports = User;