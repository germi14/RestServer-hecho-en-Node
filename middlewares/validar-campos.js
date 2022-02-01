//Este middelware es para obtener los resultados de cualquier validacion que pudo haber generado una repuesta, estas se guardan en la validationResult

const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => { 

    const erroresValidatorPost = validationResult(req);
    if(!erroresValidatorPost.isEmpty()){
        return res.status(400).json(erroresValidatorPost);
    }

    next();

}


module.exports = validarCampos;