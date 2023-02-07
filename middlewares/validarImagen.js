const { response } = require("express");

const extensionesValidas = ['png', 'jpg', 'jpeg'];

const validarImagen = ( req, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) return  res.status(400).json({msg: 'no hay imagen que subir - archivo'});
    
    const {imagen} = req.files;
    const nombreCortado = imagen.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    if( !extensionesValidas.includes(extension) ) return res.status(400).json({msg: `El formato no coincide con los permitidos ${extensionesValidas} `})
    
    next();
    
}

module.exports = {
    validarImagen
}