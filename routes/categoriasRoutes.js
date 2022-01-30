// Estas rutas van a hacer para manejar las categorias

const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria } = require('../controllers/categoriasControler');

const { existeCategoriaById } = require('../helpers/db-validators');

const validarCampos = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { rolAdmin } = require('../middlewares/validar-roles');

const router = Router();

// obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom( existeCategoriaById),
    validarCampos
], obtenerCategoria);

// crear nueva categoria - privado- cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// actualizar por id - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom( existeCategoriaById),
    validarCampos
], actualizarCategoria);

// borrar una categoria - privado - admin
router.delete('/:id', [
    validarJWT,
    rolAdmin,
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom( existeCategoriaById),
    validarCampos
],borrarCategoria);

module.exports = router;