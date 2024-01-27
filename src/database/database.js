const mongoose = require('mongoose');

const { mongo_db } = require('../config/config');

(async () => {

    try {

        const connection = await mongoose.connect(`${mongo_db}`)

        if(connection.STATES.connected) {
            console.log("Base de datos funcionando");
        }
        
    } catch (error) {
        console.log(error);
    }

})()