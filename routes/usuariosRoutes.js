// Estas rutas van a hacer para manejar un usuario

const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuariosControler');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);


router.delete('/', usuariosDelete);


module.exports = router;