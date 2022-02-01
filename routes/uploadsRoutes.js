// Estas rutas son para manejar la subida de archivos

const { Router } = require('express');
const { check } = require('express-validator');
const {cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary} = require('../controllers/uploadsControler');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const validarArchivoAdjuntoExistente = require('../middlewares/validar-archivoAdjunto');

const validarCampos = require('../middlewares/validar-campos');

const router = Router();

// Subir archivo nuevo
router.post('/',[
    validarArchivoAdjuntoExistente
],cargarArchivo);

//Actualizar imagen segun que coleccion es, usuario o producto, y segun el id de estos
router.put('/:coleccion/:id', [
    check('id','El id deber ser de mongo').isMongoId(),
    check('coleccion').custom( c=> coleccionesPermitidas(c,['usuarios','productos'])), // Aca verifico si la coleccion esta dentro de la permitida, y como segundo argumento de esta validacion personalizada le mando las colecciones que quiero permitir
    validarArchivoAdjuntoExistente,
    validarCampos
], actualizarImagenCloudinary /* actualizarImagen*/); // la imagen ahora se guarda en un servidor remoto, pero el controlador comentado es para guardar archivo en una carpeta local que se creara en el mismo directorio de la carpeta de la aplicacion

//Obtener la imagen segun que coleccion es, usuario o producto, y segun el id de estos
router.get('/:coleccion/:id', [
    check('id','El id deber ser de mongo').isMongoId(),
    check('coleccion').custom( c=> coleccionesPermitidas(c,['usuarios','productos'])), // Aca verifico si la coleccion esta dentro de la permitida, y como segundo argumento de esta validacion personalizada le mando las colecciones que quiero permitir
    validarCampos
], mostrarImagen);


module.exports = router;