const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => { 

    const erroresValidatorPost = validationResult(req);
    if(!erroresValidatorPost.isEmpty()){
        return res.status(400).json(erroresValidatorPost);
    }

    next();

}


module.exports = validarCampos;