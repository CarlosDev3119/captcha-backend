const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const { Usuario, Rol, Permiso } = require('../models');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.headers['x-token'];
    if( !token ) return res.status( 401 ).json({ msg: 'No hay token en la peticion' });

    try{
        //validar token
        const { id, id_rol } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //validar usuario
        const usuario = await Usuario.findOne({where: {id_usuario: id}});
        
        if(!usuario) return res.status( 401 ).json({ msg: 'Token no valido: El usuario no existe en la BD' });
        if(!usuario.estatus) return res.status( 401 ).json({ msg: 'Token no valido: El usuario no esta activo en la BD' });
        //Extraer Permisos
        const permisos = await Rol.findOne({where:{id: id_rol}, include: {
            model: Permiso
        }});

        const permiso = permisos.dataValues.Permiso.dataValues.permiso;
        
        const {pass, estatus, ...rest} = usuario.dataValues;
        rest.permiso = permiso;
        req.usuarioAuth = rest;

        next();
        
    }catch(error){
        res.status(401).json({ msg: 'Token no valido' });
    }

}

module.exports = {
    validarJWT
}