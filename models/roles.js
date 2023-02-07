const { DataTypes } = require('sequelize');
const { db } = require('../database/config');
const Permiso = require('./permisos');

const Rol =  db.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_rol: {
            type: DataTypes.STRING
        },
        id_permiso:{
            type: DataTypes.INTEGER,
            references: 'Permiso',
            referecesKey: 'id'
        },
        estatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
            defaultValue: true
        }
    },
        {
            timestamps:false
        }
);


module.exports = Rol;