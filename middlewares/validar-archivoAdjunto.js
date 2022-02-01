//Este middelware es para validar si el archivo adjunto ha sido enviado

const { request, response } = require("express");


const validarArchivoAdjuntoExistente = (req= request, res = response, next) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) { // Aqui revisa tres condiciones, 1ero si no vienen archivos, 2do si los archivos que vienen al menos uno tiene una propiedad, 3ero que no venga el nombre del archivo
        return res.status(400).json({
            msg: 'No existen archivos que subir'
          });
      }
      next();
}

module.exports = validarArchivoAdjuntoExistente;