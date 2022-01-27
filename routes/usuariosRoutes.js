// Estas rutas van a hacer para manejar un usuario

const { Router } = require('express');
const { check } = require('express-validator'); 

const validarCampos = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { rolAdmin, tieneRole } = require('../middlewares/validar-roles');

const { esRoleValido, emailExiste, existeUsuarioById } = require('../helpers/db-validators');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuariosControler');



const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId().bail().custom(existeUsuarioById),
    check('rol').custom( (rol) => esRoleValido(rol) ),
    validarCampos
] ,usuariosPut);

router.post('/',[  
    check('correo','Este correo no es valido').isEmail(), 
    check('correo').custom( (correo) => emailExiste(correo) ),
    check('nombre','El Nombre es obligatorio').not().isEmpty(), 
    check('password','La contrasena es obligatoria y debe contener mas de 6 letras').isLength( {min:6} ),
    check('rol').custom( (rol) => esRoleValido(rol) ), 
    validarCampos 
] ,usuariosPost); 


router.delete('/:id', [
    validarJWT,
    //rolAdmin,este middelware fuerza a que solo el usuario con rol de administrador pueda borrar usuarios
    tieneRole('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'No es un ID válido').isMongoId().bail().custom(existeUsuarioById),
    validarCampos
], usuariosDelete);


module.exports = router;