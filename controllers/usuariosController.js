const { response } = require("express");
const { encriptarHash } = require("../helpers/encriptar");
const { generarJWT } = require("../helpers/generar-jwt");
const { Usuario, Rol } = require("../models");



const obtenerUsuarios = async (req, res = response) => {

    try{

        const usuarios = await Usuario.findAll({
            include:{
                model: Rol,
                attributes: ['nombre_rol']
            }
        });

        const usuariosData = usuarios.map( ({ dataValues }) => {

            return {
                idUsuario: dataValues.id_usuario,
                idRol: dataValues.id_rol,
                nombreUsuario: dataValues.nombre_usuario,
                correo: dataValues.correo,
            }
       
        });


        res.json({
            usuarios: usuariosData
        })

    }catch(err){
        res.status(400).json({
            msg: 'Error al obtener los usuarios',
            err
        })
    }

}

const crearUsuario = async (req, res = response) => {

    try{

        const { nombre_usuario, correo, pass, id_rol } = req.body;
        //encriptar password
        const password = encriptarHash(pass);

        const dataUsuario = new Usuario({nombre_usuario, correo, pass: password, id_rol});
        await dataUsuario.save();

        const {nombre_usuario: userName, correo: email, id_rol: idRol, id_usuario} = dataUsuario.dataValues;
        const token = await generarJWT(id_usuario, nombre_usuario, idRol);

        const usuario = {
            idUsuario: id_usuario,
            idRol,
            nombreUsuario: userName,
            correo: email
        }

        res.json({
            usuario,
            token
        })
    }catch(error){
        res.status(400).json({
            msg: 'Error al crear usuario',
            error
        })
    }

}

module.exports = {
    obtenerUsuarios,
    crearUsuario
}