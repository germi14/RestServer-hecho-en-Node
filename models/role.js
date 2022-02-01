//Modelo de los roles para los usuarios que trabajen en la cafeteria
// La base de datos fue hecha en mongoDB

const { Schema, model } = require('mongoose');


const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

module.exports = model('Role', RoleSchema);