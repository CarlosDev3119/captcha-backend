const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mssql'
});

const dbConnection = async () => {

    try{
        await db.authenticate();
        console.log('Connection has been established successfully.');
    }catch(e){
        console.error('Unable to connect to the database:', error);
    }

} 

const closeConnection = () => {
    db.close();
}

module.exports = {
    dbConnection,
    db,
    closeConnection
}
