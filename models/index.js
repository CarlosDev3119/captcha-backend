const Permiso = require('./permisos');
const Rol = require('./roles');
const Usuario = require('./user');

Permiso.hasMany(Rol , {foreignKey: 'id_permiso', sourceKey: 'id'});
Rol.belongsTo(Permiso , {foreignKey: 'id_permiso', targetKey: 'id'});

Rol.hasMany(Usuario , {foreignKey: 'id_rol', sourceKey: 'id'});
Usuario.belongsTo(Rol , {foreignKey: 'id_rol', targetKey: 'id'});



module.exports = {
    Permiso,
    Rol,
    Usuario
}