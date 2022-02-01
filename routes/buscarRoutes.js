// Estas rutas son para manejar las busquedas de usuarios, de categorias y de productos

const { Router } = require('express');
const { buscar } = require('../controllers/buscarControler');

const router = Router();

router.get('/:coleccion/:termino', buscar)



module.exports= router;