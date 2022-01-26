const mongoose = require('mongoose');

const dbConeccion = async() => {

    try{

       await mongoose.connect( process.env.MONGODB_CADENA_CONEXION, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
       } );

       console.log('Base de datos online novia')

    } catch(error){
        console.log(error);
        throw new Error('Error inicializando la base de datos');
    }




}




module.exports = {
    dbConeccion

}