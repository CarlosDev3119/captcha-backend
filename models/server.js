const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor(){
        this.port = process.env.PORT || 3000;
        this.app = express();
        this.paths = {
            convert: '/api/convert',
            auth: '/api/auth',
            users: '/api/users',
            permisos: '/api/permisos',
            roles: '/api/roles',
            auth: '/api/auth'
        }

        this.middlewares();

        this.routes();

        this.conectarDB();

    }

    async conectarDB() {
        await dbConnection()
    }

    
    middlewares() {

        //CORS
        this.app.use( cors() );

        //parse body
        this.app.use( express.json() );

        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    routes() {

        this.app.use( this.paths.convert, require('../routes/images') );
        this.app.use( this.paths.users, require('../routes/usuarios') );
        this.app.use( this.paths.permisos, require('../routes/permisos') );
        this.app.use( this.paths.roles, require('../routes/roles') );
        this.app.use( this.paths.auth, require('../routes/auth') );


    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port)
        })
    }

}

module.exports = Server;