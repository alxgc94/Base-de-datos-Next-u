var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventosSchema = new Schema({
    start: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    end: {
        type: Date,
        default: ''
    },
    start_hour: {
        type: String,
        default: ''
    },
    end_hour: {
        type: String,
        default: ''
    },
    user_id: {
        type: String,
        default: ''
    },
})

var Event = mongoose.model('Evento', eventosSchema);

module.exports = Event;