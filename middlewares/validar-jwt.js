const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res = response, next) =>{

    const token = req.header('x-token'); 

    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try{     
        const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

       //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        //Verificar si el usuario con este uid existe en la base de datos o fue borrado fisicamente de la collecion
        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe en la base de datos'
            })
        }

        //Verificar si el usuario con este uid tiene estado true o false es decir si fue borrado de la BD 

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - Usuario fue eliminado de la base de datos'
            })
        }

        req.usuario = usuario;

        next();

    } catch(err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no es valido'
        })
    }

}


module.exports = {
    
    validarJWT
}