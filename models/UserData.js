const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    cookie: {
        type: String,
        required: true,
        unique: true
    },
    threads: Array
});

const userData = model('userdata', userSchema);
module.exports = userData;
