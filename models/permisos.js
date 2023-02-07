const { DataTypes } = require('sequelize');
const { db } = require('../database/config');


const Permiso =  db.define('Permiso', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        permiso: {
            type:DataTypes.STRING,
            
        }
    },
        {
            timestamps:false
        }
);


module.exports = Permiso;