const { response } = require('express');
const { Rol, Permiso } = require('../models');

const crearRol = async (req, res = response) => {

    try{    
        const body = req.body;
        const rol = new Rol(body);
        await rol.save(); 

        res.status(200).json({
            msg: rol
        })

    }catch(error){
        res.status(400).json({
            error: error
        })
    }
}

const obtenerRol = async (req, res = response) => {

    try{
        const roles = await Rol.findAll({
            include: {
                model: Permiso,
                attributes: ['permiso']
            }
        });

        // const roles = await Rol.findAll();

        res.status(200).json({
            roles
        })

    }catch(error){
        res.status(400).json({
            error: error
        })
    }

}
module.exports = {
    crearRol,
    obtenerRol
}