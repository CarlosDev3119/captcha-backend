const bcryptjs = require('bcryptjs');
const { response } = require("express");
const { generarJWT } = require('../helpers/generar-jwt');
const { Usuario } = require("../models");

const login = async (req, res = response) => {

    const { correo, pass } = req.body;

    try{

        const usuarioDB = await Usuario.findOne({ where: {correo} });

        if( !usuarioDB.dataValues ) return res.status(401).json({msg: 'Error al iniciar sesion, usuario erroneo'});
        if( !usuarioDB.dataValues.estatus ) return res.status(401).json({msg: 'Error El usuario ya no esta registrado en la BD'});

        const validarPassword = bcryptjs.compareSync(pass, usuarioDB.dataValues.pass);
        if( !validarPassword ) return res.status(400).json({msg: "Usuario / Password Incorrectos - password"});

        const { id_usuario, id_rol, nombre_usuario, correo: email} = usuarioDB.dataValues;

        const usuario = {
            idUsuario: id_usuario,
            idRol: id_rol,
            nombreUsuario: nombre_usuario,
            correo: email
        }

        const token = await generarJWT( usuario.idUsuario, usuario.nombreUsuario, usuario.idRol );

        res.json({
            usuario,
            token
        })

    }catch(error){
        return res.status(404).json({msg: 'Error al intentar iniciar sesion', error});

    }
}

module.exports = {
    login
}