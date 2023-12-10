const http = require('node:http')
const app = require('./src/app')
require('dotenv').config()
require('./src/config/db')

const server = http.createServer(app)
const PORT = process.env.PORT || 3000

server.listen(PORT)
//TODO: Cambiar los console.log por lineas que se agregan en un fichero log.
server.on('listening', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})
server.on('error', (error) => console.log(error))

// Config socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: '*' // desde donde pueden acceder * es todos los sitios
    }
});

io.on('connection', (socket) => {
    console.log('se ha conectado un nuevo cliente');
    //cada socket tiene un id asi puedo saber quien se ha conectado y gestionar el usario que se conecta
    // ejer: mando un mensaje a todos los clientes menos al que se conecta par ello .broadcast
    socket.broadcast.emit('mensaje_chat', {
        username: 'INFO',
        message: 'Se ha conectado un nuevo usuario'
    });

    //actualizar el numero de clientes conectados
    io.emit('usuarios_conectados', io.engine.clientsCount);



    socket.on('mensaje_chat', (data, userData) => {
        // Voy a emitir el mensaje a todos los clientes conectados
        io.emit('mensaje_chat', { ...data, ...userData });
    });

    socket.on('disconnect', () => {
        io.emit('mensaje_chat', {
            username: 'INFO',
            message: 'Se ha desconectado un usuario 👋🏻'
        });
        io.emit('usuarios_conectados', io.engine.clientsCount);
    });
});