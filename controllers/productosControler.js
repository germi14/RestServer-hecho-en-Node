//Controlador para la ruta Productos

const { response, request } = require('express');
const Producto = require("../models/producto");


  // obtenerProductos 
const obtenerProductos = async (req = request, res= response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true};

    const [totalRegistros, productos] = await Promise.all( [
        Producto.countDocuments(query),
        Producto.find(query).populate('usuario', 'nombre').populate('categoria', 'nombre').skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        totalRegistros,
        productos
    });
};

 // obtenerProduco 
 const obtenerProducto = async (req = request, res= response) =>{

    const {id} = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('usuario', 'nombre');

    res.json( producto );

 }

 // Crear Producto
const crearProducto = async (req=request, res= response)=> {

    const {estado, usuario, ...body} =  req.body;


    const productoDB = await Producto.findOne( {nombre: body.nombre.toUpperCase()} ); 


    if(productoDB){ // Si existen envio un error avisando que ya existe
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }
    const nombre= req.body.nombre.toUpperCase();

    //Generar la data
        const data = {  
            usuario: req.usuario._id,
            nombre: body.nombre.toUpperCase(),
            precio: body.precio,
            descripcion: body.descripcion,
            disponible: body.disponible,
            categoria: body.categoria
        
        }

    const producto = await new Producto( data );
    
    //Guardar en DB
    await producto.save();
    
    res.status(201).json(producto);
}


// actualizarProducto
const actualizarProducto = async(req=request, res= response) =>{
    
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    if(data.nombre){
    data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new:true });

    res.json(producto);

}


// borrarProducto  - cambiar estado a false
const borrarProducto = async (req = request, res= response) =>{

    const {id} = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, { new:true });

    res.json({
        'La categoria borrada fue': productoBorrado}
        );
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}