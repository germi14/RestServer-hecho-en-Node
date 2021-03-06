//Modelo de las productos de la cafeteria, los cuales pertenecen a una categoria definida en la misma BD
// La base de datos fue hecha en mongoDB

const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    img:{
        type: String
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId, 
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String,
        default: ''
    },
    disponible: {
        type: Boolean,
        default: true
    }
});


ProductoSchema.methods.toJSON = function () {
    const {__v, estado, ...producto} = this.toObject();
    return producto
}

module.exports = model('Producto', ProductoSchema);