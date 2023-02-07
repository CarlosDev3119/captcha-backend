const { response } = require('express');

const { Permiso } = require('../models');

const crearPermiso = async (req, res = response) => {

    try{
        
        const { body } = req;
        const permiso = new Permiso(body);
        await permiso.save(); 
        
        res.json({
            msg: 'permisos post',
            permiso            
        })

    }catch(msg){
        return res.status(404).json({error: msg});
    }

}

const obtenerPermisos = async (req, res= response) => {

    try{

        const permisos = await Permiso.findAll();
        res.json({
            permisos            
        })

    }catch(msg){
        return res.status(404).json({error: msg});
    }

}


module.exports = {
    crearPermiso,
    obtenerPermisos
}