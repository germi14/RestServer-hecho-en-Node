// Estas rutas van a hacer para manejar los productos

const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerProductos,
        obtenerProducto,
        crearProducto,
        actualizarProducto,
        borrarProducto } = require('../controllers/productosControler');

const { existeProductoById } = require('../helpers/db-validators');
const { existeCategoriaById } = require('../helpers/db-validators');

const validarCampos = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { rolAdmin } = require('../middlewares/validar-roles');

const router = Router();

// obtener todas las categorias - publico
router.get('/', obtenerProductos);


// obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom( existeProductoById),
    validarCampos
], obtenerProducto);

// crear nueva categoria - privado- cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo Valido').isMongoId(),
    check('categoria').custom( existeCategoriaById),
    validarCampos
], crearProducto);

// actualizar por id - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id').custom( existeProductoById),
    validarCampos
], actualizarProducto);

// borrar una categoria - privado - admin
router.delete('/:id', [
    validarJWT,
    rolAdmin,
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom( existeProductoById),
    validarCampos
],borrarProducto);

module.exports = router;