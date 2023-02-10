const { response } = require("express");

const esAdminRole = async (req, res = response, next) => {

        if( !req.usuarioAuth ){
            return res.status(401).json({
                msg: 'Se quiere verificar rol sin autenticacion de usuario'
            })
        }
        const { permiso, nombre_usuario } = req.usuarioAuth;
        if( permiso !== 'SUPER_USER' ){
            return res.status(401).json({
                msg: `${ nombre_usuario } no es administrador - no tiene permiso para realizar esa accion`
            })
        }

        next();

}

const esUsuarioGeneral = async (req, res = response, next) => {

    if( !req.usuarioAuth ){
        return res.status(401).json({
            msg: 'Se quiere verificar rol sin autenticacion de usuario'
        })
    }
    const { permiso, nombre_usuario } = req.usuarioAuth;
    if( permiso !== 'SUPER_USER' && permiso !== 'GENERAL_USER' ){
        return res.status(401).json({
            msg: `${ nombre_usuario } - no tiene permiso para realizar esa accion`
        })
    }

    next();

}

module.exports = {
    esAdminRole,
    esUsuarioGeneral
};