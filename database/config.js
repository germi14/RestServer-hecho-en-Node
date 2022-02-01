const mongoose = require('mongoose');

//Configuracion de la conexion a la base de datos hecha en mongoDB y utilizando el paquete externo mongoose para manejarla

const dbConeccion = async() => {

    try{

       await mongoose.connect( process.env.MONGODB_CADENA_CONEXION, { // Esta cadena de conexion esta almacenada en las variables de entorno, y debe ser solicitada al programador del backend
           useNewUrlParser: true,
           useUnifiedTopology: true,
       } );

       console.log('Base de datos online');

    } catch(error){
        console.log(error);
        throw new Error('Error inicializando la base de datos');
    }

}

module.exports = {
    dbConeccion
}