const { request, response } = require("express");
const req = require("express/lib/request");

const rolAdmin = (req = request, res= response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario;

    if(rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `${nombre} no es administrador y no puede borrar usuarios`
        });
    }
    next();
}

const tieneRole = (...roles) => {
    
    return (req= request, res= response, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }
        
        if( !roles.includes(req.usuario.rol) ){
            return res.status(401).json({
                msg: `Para borrar usuarios se necesita tener uno de estos roles ${roles}`
            })
        }

        next();
    }

}




module.exports = {
    rolAdmin,
    tieneRole
}