const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Usuario =  db.define('Usuario', {
    id_usuario:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },nombre_usuario: {

        type:DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type:DataTypes.STRING,
        allowNull: false
    },
    id_rol:{

        type: DataTypes.INTEGER,
        references: 'Role',
        referecesKey: 'id',
        allowNull: false, 
        defaultValue: 2
    },
    fecha_registro: {
        type: 'TIMESTAMP',
        defaultValue: db.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }, 
    estatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        defaultValue: true

    }, 
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    }},
    {
        timestamps:false
    }
);


module.exports = Usuario;