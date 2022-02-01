//Modelo de los usuarios que trabajan en la cafeteria
// La base de datos fue hecha en mongoDB

const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contrasena es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROL',
        emun: ['ADMIN_ROL','USER_ROL','VENTAS_ROL']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },


});

UsuarioSchema.methods.toJSON = function () {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid=_id;
    return usuario
}

module.exports = model( 'Usuario', UsuarioSchema );