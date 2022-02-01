// Estas rutas son para manejar los usuarios

const { Router } = require('express');
const { check } = require('express-validator'); 

const validarCampos = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { rolAdmin, tieneRole } = require('../middlewares/validar-roles');

const { esRoleValido, emailExiste, existeUsuarioById } = require('../helpers/db-validators');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuariosControler');

const router = Router();

//Obtener usuarios
router.get('/', usuariosGet);

//Actualizar usuarios
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId().bail().custom(existeUsuarioById),
    check('rol').custom( (rol) => esRoleValido(rol) ),
    validarCampos
] ,usuariosPut);

//Crear Usuarios
router.post('/',[  
    check('correo','Este correo no es valido').isEmail(), 
    check('correo').custom( (correo) => emailExiste(correo) ),
    check('nombre','El Nombre es obligatorio').not().isEmpty(), 
    check('password','La contrasena es obligatoria y debe contener mas de 6 letras').isLength( {min:6} ),
    check('rol').custom( (rol) => esRoleValido(rol) ), 
    validarCampos 
] ,usuariosPost); 

//Borrar Usuarios
router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'No es un ID válido').isMongoId().bail().custom(existeUsuarioById),
    validarCampos
], usuariosDelete);


module.exports = router;