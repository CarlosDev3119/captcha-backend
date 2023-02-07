const fs = require("fs");

const { response } = require('express');
const { solveImage } = require("../helpers/subir-imagen");


const convertirImagen = async (req, res = response) => {

    try{
        
        const captcha = fs.readFileSync( req.files.imagen.tempFilePath, { encoding: 'base64' } );
        
        const resp = await solveImage(captcha);

        res.json({textCatpcha: resp})

    }catch(msg){
        return res.status(404).json({msg});
    }

}


module.exports = {
    convertirImagen
}