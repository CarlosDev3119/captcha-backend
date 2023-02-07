const jwt = require('jsonwebtoken');

const generarJWT = ( id = '', nombre_usuario = '', id_rol = '' ) => {
    return new Promise((resolve, reject) => {

        const payLoad = { id, nombre_usuario, id_rol };

        jwt.sign( payLoad, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1h'
        }, (err, token) => {
            if(err) {
                console.error(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })

    });
}

module.exports = {
    generarJWT,
}