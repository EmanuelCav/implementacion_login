const { Schema, model, Types } = require('mongoose');

const { ObjectId } = Types

const cartSchema = new Schema({

    products: [{
        type: ObjectId,
        ref: 'ProductCart'
    }]

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Cart', cartSchema)