//Controlador para la ruta de subir archivos

const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2 // Paquete externo para guardar imagenes en otro servidor
cloudinary.config( process.env.CLOUDINARY_URL ); // configuracion de cloudinary

const { response, request } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

//Controlador para la carga de archivo nuevo
const cargarArchivo = async (req= request, res= response) => {
      

        try{
        const pathArchivo = await subirArchivo ( req.files, ['jpg', 'gif', 'jpeg', 'png'],'archvivos-de-imagenes' ); 
//En este ejemplo estoy utilizando la validacion para guardar solo imagenes, pero tambien podia hacerlo para guardar solo documentos, o ambas, en ese caso tendria que ver las condiciones que deseo
        res.json({
            nombre: pathArchivo
        });
        } catch(err){
            res.status(400).json({
                msg: err
            })
        }
}

/* Esto esta comentado porque este codigo es para almacenar un archivo en un servidor externo llamado cloudinary, ya que las imagenes si las dejo guardadas
en una carpeta del proyecto, el servidor heroku donde tengo guardada la aplicacion borra los archivos que no sean parte del codigo cada cierto tiempo,
entonces es una buena practica tener las imagenes guardades en otro servidor

 //Este controlador es para almacenar imagenes en una carpeta del mismo proyecto
const actualizarImagen = async (req= request, res= response) => {

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un usuario con el id: ${id}`})
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un producto con el id: ${id}`})
            }
        break;
    
        default:
            return res.status(500).json({msg: 'Al programador se le olvido validar este campo'});
    }

        //Limpiar imageness previas
        if( modelo.img ){
            // hay que borrar la imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', `archvivos-de-${coleccion}`, modelo.img);
            console.log(modelo.img)
            console.log(pathImagen);
            console.log(fs.existsSync(pathImagen));
            if(fs.existsSync(pathImagen) ){
                fs.unlinkSync(pathImagen);
            }
        }
        const coleccionSeleccionada =  await subirArchivo ( req.files, undefined,`archvivos-de-${coleccion}`, modelo.img );
        modelo.img = coleccionSeleccionada;
            //Guardar en BD
        await modelo.save();
    
    res.json(modelo);

}*/

//Controlador para la actualizacion de archivos segun coleccion de la base de datos seleccionada
const actualizarImagenCloudinary = async (req= request, res= response) => {

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un usuario con el id: ${id}`})
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un producto con el id: ${id}`})
            }
        break;
    
        default:
            return res.status(500).json({msg: 'Al programador se le olvido validar este campo'});
    }

        //Limpiar imageness previas
        if( modelo.img ){
            // hay que borrar la imagen del servidor
            const nombreArr = modelo.img.split('/'); 
            const nombre = nombreArr[nombreArr.length -1]; 
            const [ nombreId] = nombre.split('.'); 
            cloudinary.uploader.destroy(nombreId); 
        }

        const { tempFilePath} = req.files.archivo;  
        const resp = await cloudinary.uploader.upload( tempFilePath ); 


        modelo.img = resp.secure_url; 
            //Guardar en BD
        await modelo.save();
    
    res.json(modelo);

}

//Controlador para obtener la imagen por id del usuario o producto 
const mostrarImagen = async (req=request, res=response)=>{

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un usuario con el id: ${id}`})
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un producto con el id: ${id}`})
            }
        break;
    
        default:
            return res.status(500).json({msg: 'Al programador se le olvido validar este campo'});
    }

        //Limpiar imageness previas
        if( modelo.img ){
            // hay que borrar la imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', `archvivos-de-${coleccion}`, modelo.img);
            if(fs.existsSync(pathImagen) ){
                return res.sendFile(pathImagen)
            }
        }

        const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
        res.sendFile(pathImagen);
}


module.exports = {
    cargarArchivo,
    actualizarImagenCloudinary,
    //actualizarImagen, //Este controlador es para almacenar imagenes en una carpeta del mismo proyecto
    mostrarImagen
}