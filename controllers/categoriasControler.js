const { response, request } = require('express');
const Categoria = require("../models/categoria");


  // obtenerCategorias

const obtenerCategorias = async (req = request, res= response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true};

    const [totalRegistros, categorias] = await Promise.all( [
        Categoria.countDocuments(query),
        Categoria.find(query).populate('usuario', 'nombre').skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        totalRegistros,
        categorias
    });
};



 // obtenerCategoria

 const obtenerCategoria = async (req = request, res= response) =>{

    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json( categoria );

 }

 // Crear Cateogria

const crearCategoria = async (req=request, res= response)=> {

    const nombre = req.body.nombre.toUpperCase();  

    const categoriaDB = await Categoria.findOne( {nombre} ); 


    if(categoriaDB){ 
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }
    const usuario= req.usuario._id;

    //Generar la data
        const data = { 
        nombre,
        usuario
        }

    const categoria = await new Categoria( data );
    
    //Guardar en DB
    await categoria.save();
    
    res.status(201).json(categoria);
}


// actualizarCategoria

const actualizarCategoria = async(req=request, res= response) =>{
    
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new:true });

    res.json(categoria);

}


// borrarCategoria  - cambiar estado a false

const borrarCategoria = async (req = request, res= response) =>{

    const {id} = req.params;
    const cateogriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false}, { new:true });

    res.json({
        'La categoria borrada fue': cateogriaBorrada}
        );


}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}