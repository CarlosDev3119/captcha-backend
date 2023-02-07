const { Usuario, Rol } = require("../models")


const existeEmail = async ( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ where: { correo }});
    if( existeEmail ) throw new Error(`El correo ${correo} ya esta registrado en la bd`)
}

const existeUsuario = async ( nombre_usuario = '') => {
    const existeUsuario = await Usuario.findOne({ where: { nombre_usuario }})
    if( existeUsuario ) throw new Error(`El usuario ${nombre_usuario} ya esta registrado en la bd`)
    
}

const existeRol = async ( id_rol = '') => {
    const existeRol = await Rol.findOne({ where: { id: id_rol }})
    if( !existeRol ) throw new Error(`El rol  ${id_rol} no esta registrado en la bd`)
}

module.exports = {
    existeEmail,
    existeUsuario,
    existeRol
}