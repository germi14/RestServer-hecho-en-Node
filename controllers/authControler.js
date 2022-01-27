const bcryptjs = require('bcryptjs');
const { response, request } = require('express');
const { DefaultTransporter } = require('google-auth-library');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSignIn = async (req= response, res= request) => {

    const {id_token} = req.body;

    try{
        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        //Si el usuario no existe debo crearlo
        if(!usuario){

            const data = {
                nombre,
                correo,
                password: 'd',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        //Si el usuario esta borrado de la BD debo bloquear su acceso
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario bloqueado, hable con el admin'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}


module.exports= {
    login,
    googleSignIn
}