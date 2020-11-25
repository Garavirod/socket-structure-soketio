// Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./Sockets');
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // Http server
        this.server = http.createServer(this.app);
        // Settings sokets
        this.io = socketio(this.server);
    }

    middlewares(){
        // Deploy public dir
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    settingSockets(){
        new Sockets(this.io);
    }

    initServer(){
        //init middlewares
        this.middlewares(); 
        // Init socket
        this.settingSockets();
        // Init server
        this.server.listen(this.port,()=>{
            console.log(`Server running on port :> ${this.port}`);
        });
    }
}

module.exports = Server;