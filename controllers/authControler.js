const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/generarJWT');
const Usuario = require('../models/usuario');


const login = async (req, res = response) => {

    const { correo, password} = req.body;

    try{
        //Verificar si el correo existe
        const usuario = await Usuario.findOne( {correo} );
        if(!usuario) {
            return res.status(400).json({
                msg: 'El correo no es correcto'
            })
        }

        //Verificar si el usuario esta activo en la BD
        if(!usuario.estado) {            
            return res.status(400).json({
                msg: 'La persona ya se fue'
            })
        }


        //Verificar la contrasena
        const passwordValida = bcryptjs.compareSync( password, usuario.password); 
        if(!passwordValida){
            return res.status(400).json({
                msg: 'La contrasena es incorrecta'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );


        
    res.json({
        usuario,
        token
    })

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el administrador'
        });
    }

}


module.exports= {
    login
}