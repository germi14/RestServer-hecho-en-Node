// Estas rutas son para manejar la autenticacion por google

const { Router } = require('express');
const { check } = require('express-validator');


const { login, googleSignIn } = require('../controllers/authControler');
const validarCampos = require('../middlewares/validar-campos');

const router = Router();

// Login de google
router.post('/login', [
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contrasena es obligatoria').not().isEmpty(),
    validarCampos
], login);

//Iniciar sesion en google
router.post('/google', [
    check('id_token','id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);


module.exports = router;