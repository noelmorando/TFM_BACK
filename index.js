const http = require('node:http');
const fs = require('fs');
const app = require('./src/app');
require('dotenv').config();
require('./src/config/db');

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const logFilePath = './erroreslog';

server.listen(PORT);

server.on('listening', () => {
    const successMessage = `Servidor escuchando en puerto ${PORT}\n`;
    fs.appendFile('errores.log', successMessage, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de errores.log:', err);
        }
    });
});

server.on('error', (error) => {
    // Agregar el error al archivo errores.log
    const errorMessage = `Error en el servidor: ${error.message}\n${error.stack}\n\n`;
    fs.appendFile(logFilePath, errorMessage, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de errores.log:', err);
        }
    });
});
