require('dotenv').config();
require('./models/user')

const Server = require('./models/server');

const server = new Server();

server.listen()
