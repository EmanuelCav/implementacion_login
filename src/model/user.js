const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    firstname: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z]+$/, 'Firstname is not valid']
    },

    lastname: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z]+$/, 'Lastname is not valid']
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is not valid'],
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('User', userSchema)