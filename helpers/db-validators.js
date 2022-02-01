//Dentro de este archivo se encuentran todas las validaciones especificas que utilizo en algunas rutas
const mongoose = require('mongoose');

const Role = require('../models/role');

const Usuario = require('../models/usuario');

const Categoria = require('../models/categoria');
const Producto = require('../models/producto');


// Validacion personalizada para comprobar si el rol del usuario es valido, es decir si el rol esta en la base de datos de roles
const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne( {rol} ); 
    if(!existeRol){ 
        throw new Error (`El rol ${rol} no esta registrado en la base de datos`)
    }
}

// Validacion personalizada para comprobar si el correo ingresado existe en la base de datos de Usuarios

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ){
        throw new Error (`El correo ${correo} ya esta registrado`)
    }
}

//Validacion personalizada para comprobar si existe un usuario para el id ingresado

const existeUsuarioById = async (id) => {

        const existeUsuario = await Usuario.findById(id);
     
        if ( !existeUsuario ) {
            throw new Error(`El usuario con'${ id }' no existe`);
        }
}

//Validacion personalizada para comprobar si la categoria existe
const existeCategoriaById = async (id) => {

    const existeCategoria = await Categoria.findById(id);
 
    if ( !existeCategoria ) {
        throw new Error(`La categoria con'${ id }' no existe`);
    }
}

//Validacion personalizada para comprobar si el producto existe
const existeProductoById = async (id) => {

    const existeProducto = await Producto.findById(id);
 
    if ( !existeProducto ) {
        throw new Error(`El producto con'${ id }' no existe`);
    }
}

//Validar colecciones permtidas
const coleccionesPermitidas = async (coleccion= '', colecciones=[]) => {
    if(!colecciones.includes(coleccion)){
        throw new Error (`La coleccion ${coleccion} no esta dentro de las permitidas ${colecciones}`)
    }
    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioById,
    existeCategoriaById,
    existeProductoById,
    coleccionesPermitidas
}