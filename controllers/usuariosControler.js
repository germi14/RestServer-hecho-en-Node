const { response, request } = require('express'); 

const usuariosGet = (req = request, res= response) => {

    const {q, nombre='No name', apikey, page=1, limit } = req.query; 

    res.json({
        msg: 'get API - desde el controlador independiente',
        q,
        nombre,
        apikey,
        page,
        limit
    });
};

const usuariosPost = (req, res= response) => {

    const {nombre, edad} = req.body; 

    res.json({
        msg: 'post API - desde el controlador independiente',
        nombre,
        edad
    });
};

const usuariosPut = (req, res= response) => {

    const {id} = req.params;  

    res.json({
        msg: 'put API - desde el controlador independiente',
        id
    });
};

const usuariosDelete = (req, res= response) => {

    res.json({
        msg: 'delete API - desde el controlador independiente'
    });
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}