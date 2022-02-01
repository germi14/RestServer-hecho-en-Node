//Configuracion del servidor utilizando el paquete externo express, aca se definen los path de las rutas de la aplicacion 

const express = require('express')
const cors= require('cors');

const {dbConeccion} = require('../database/config');
const fileUpload = require('express-fileupload');


class Server{

    constructor() {
      this.app = express();
      this.port = process.env.PORT;
      this.usuariosRoutesPath = '/api/usuarios';
      this.authPath           = '/api/auth';
      this.categoriasPath     = '/api/categorias';
      this.productosPath      = '/api/productos';
      this.buscarPath         = '/api/buscar';
      this.uploads            = '/api/uploads';

        // Conectar a base de datos
      this.conectarDB();

      // middlewares
      this.middlewares();

      // Rutas de mi aplicacion
      this.routes();
    
    }

    async conectarDB(){
        await dbConeccion();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json());
        
        //Directorio publico
        this.app.use( express.static('public') ); // Directorio Publico

        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes(){ 

        this.app.use( this.authPath, require('../routes/authRoutes'));
        this.app.use( this.buscarPath, require('../routes/buscarRoutes'));
        this.app.use(this.productosPath, require('../routes/productosRoutes'));
        this.app.use(this.categoriasPath, require('../routes/categoriasRoutes'));
        this.app.use( this.usuariosRoutesPath, require('../routes/usuariosRoutes'));
        this.app.use(this.uploads, require('../routes/uploadsRoutes'));
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }

}


module.exports = Server;