//Controlador para la ruta de busqueda de usuarios, categorias o productos

const { response, request } = require('express');

const {ObjectId} = require('mongoose').Types;

const Usuario = require('../models/usuario');
const  Categoria = require('../models/categoria');
const  Producto  = require('../models/producto');


// Al agregar mas colecciones a la BD anadirlas aca
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos'
];

// Controlador para la ruta buscar Usuario, Se utiliza en este mismo codigo mas abajo en un switch
const buscarUsuarios = async (termino= '', res= response) =>{

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({ 
            resultados: ( usuario ) ? [ usuario ] : 'No hay resultados para su busqueda escriba bien el nombre o el correo que desea buscar'
        });
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [ {nombre: regex,}, {correo: regex} ],
        $and: [ { estado: true } ]
        });

    const cuenta = await Usuario.count({
        $or: [ {nombre: regex,}, {correo: regex} ],
        $and: [ { estado: true } ]
        });
    

    return res.json({
        total: cuenta,
        resultados: usuarios
    });

}

// Controlador para la ruta buscar Categorias, Se utiliza en este mismo codigo mas abajo en un switch
const buscarCategorias = async (termino= '', res= response) =>{

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({ 
            resultados: ( categoria ) ? [ categoria ] : 'No hay resultados para su busqueda escriba bien el id que desea buscar'
        });
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({nombre: regex, estado: true}); 

    const cuenta = await Categoria.count({nombre: regex, estado: true});
    

    return res.json({
        total: cuenta,
        resultados: categorias
    });

}

// Controlador para la ruta buscar Productos, Se utiliza en este mismo codigo mas abajo en un switch

const buscarProductos = async (termino= '', res= response) =>{

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const producto = await Producto.findById(termino).populate('categoria','nombre').populate('usuario','nombre');
        return res.json({ 
            resultados: ( producto ) ? [ producto ] : 'No hay resultados para su busqueda escriba bien el id que desea buscar'
        });
    }

    const regex = new RegExp(termino, 'i'); 

    const productos = await Producto.find({nombre: regex, estado: true}).populate('categoria','nombre').populate('usuario','nombre');

    const cuenta = await Producto.count({nombre: regex, estado: true});
    

    return res.json({
        total: cuenta,
        resultados: productos
    });

}

const buscar = async (req = request, res= response) => { // Este como tal es el controlador que escoge cual controlador particular utilizar dependiendo de la coleccion de BD escogida

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las coleccion "${coleccion}" no existe en la base datos, las colecciones existentes son ${coleccionesPermitidas}, revise este campo`
        })
    }

    switch (coleccion) {
        case 'usuarios':  
            buscarUsuarios(termino, res)
        break;

        case 'categorias':
            buscarCategorias(termino, res)
        break;

        case 'productos':
            buscarProductos(termino, res)
        break;

        default:   
            return res.status(500).json({
                msg: 'Se le olvido al programador hacer esta busqueda'
            })
            break;
    }
};

module.exports= {
    buscar
}





