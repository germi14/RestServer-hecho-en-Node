const express = require('express')
const cors= require('cors');

const {dbConeccion} = require('../database/config');


class Server{

    constructor() {
      this.app = express();
      this.port = process.env.PORT;
      this.usuariosRoutesPath = '/api/usuarios';
      this.authPath           = '/api/auth';
      this.categoriasPath     = '/api/categorias';
      this.productosPath      = '/api/productos';
      this.buscarPath         = '/api/buscar'

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
        
        this.app.use( express.static('public') ); // Directorio Publico

    }

    routes(){ 

        this.app.use( this.authPath, require('../routes/authRoutes'));
        this.app.use( this.buscarPath, require('../routes/buscarRoutes'));
        this.app.use(this.productosPath, require('../routes/productosRoutes'));
        this.app.use(this.categoriasPath, require('../routes/categoriasRoutes'));
        this.app.use( this.usuariosRoutesPath, require('../routes/usuariosRoutes'));
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }

}


module.exports = Server;