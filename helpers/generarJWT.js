//Se genera el JSON WEB TOKEN, el cual sera utilizado como token necesario en algunas peticiones crud
const jwt = require('jsonwebtoken')

const generarJWT = (uid='') => {

    return new Promise ( (resolve, reject) => { 
        
        const payload = { uid }; 

        
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, { // Esta llave secreta es para firmar el token y se encuentra declarada como una variable de entorno, la cual debe ser solicitada al programador del back
            expiresIn: '10h'
        }, (err, token) =>{
            if (err){
                console.log(err);
                reject('No se pudo generar el token')
            }else {
                resolve( token );
            }
        })


    })
}

module.exports = {
    generarJWT
}