const server = require('./services/server');
const PORT = 8080;

server.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});