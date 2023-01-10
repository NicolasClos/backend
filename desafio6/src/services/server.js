const express = require('express');
const http = require('http');

const io = require('socket.io');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/api', (req, res) => {
    res.json({
        msg: 'ok'
    })
});

const myHTTPServer = http.Server(app);

const myWebSocketServer = io(myHTTPServer);

myWebSocketServer.on('connection', (socket) => {
    console.log(`Se acaba de conectar un cliente`);
    console.log(`ID Socket server: ${socket.id}`);
    console.log(`ID Socket client: ${socket.client.id}`);

    socket.on('nombreEvento', (data)=>{
        console.log('Me acaban de mandar un mensaje')
        console.log(data);
    })
})

module.exports = myHTTPServer;