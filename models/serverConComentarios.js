// const express = require('express')
// const cors= require('cors');


// class Server{

//     constructor() {
//       this.app = express(); // Cuando se lance una nueva instancia de mi Server voy a crearme la app de express aqui como una propiedad
//       this.port = process.env.PORT;

//       // middlewares
//       this.middlewares();

//       // Rutas de mi aplicacion
//       this.routes();
//     //    this.a();
    
//     }
    
//     // a(){
//     //     return console.log('hola');
//     // }

//     middlewares(){

//         //CORS
//         this.app.use( cors() );

//         this.app.use( express.static('public') ); // Directorio Publico

//     }

//     routes(){ // En estas rutas van los endpoints, que son las peticiones http que son funciones que le dan nuevas funcionalidades
//                 // a mi server

//         this.app.get('/api', (req, res) => { // con get obtenemos o mostramos algo de la api
//             res.json({
//                 msj: 'get API'
//             })
//           });

//           this.app.put('/api', (req, res) => { // actualizmaos data
//             res.json({
//                 msj: 'put API'
//             })
//           });

//           this.app.post('/api', (req, res) => { // creamos nuevos recursos, como por ejemplo nuevos usuarios
//             res.json({
//                 msj: 'post API'
//             })
//           });

//           this.app.delete('/api', (req, res) => { // borramos algo del server
//             res.json({
//                 msj: 'delete API'
//             })

//                         /* Códigos de respuestas HTTP
//             Es muy importante que nuestros servicios siempre retornen un código de respuesta dependiendo de lo que suceda. */

//           });
//     }

//     listen(){
//         this.app.listen(this.port, () => {
//             console.log("Servidor corriendo en puerto", this.port);
//         });
//     }

// }


// module.exports = Server;