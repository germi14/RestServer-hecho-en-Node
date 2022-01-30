// Estas rutas van a hacer para manejar las busquedas

const { Router } = require('express');
const { buscar } = require('../controllers/buscarControler');

const router = Router();

router.get('/:coleccion/:termino', buscar)



module.exports= router;