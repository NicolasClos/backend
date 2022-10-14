// UTILIZO LA CLASE CONTAINER DEL DESAFIO PASADO
const fs = require('fs');

class Container{
    constructor(srcArchivo){
        this.src = srcArchivo
    }
    async save(obj){
        try{
            const contenido = await fs.promises.readFile(`${this.src}`, 'utf-8');
            const contenidoDeserializado = JSON.parse(contenido);
            contenidoDeserializado.push(obj);
            obj.id = contenidoDeserializado.length;
            const contenidoSerializado = JSON.stringify(contenidoDeserializado);
            await fs.promises.writeFile(`${this.src}`, contenidoSerializado);
        }
        catch(err){
            console.error("No se pudo acceder al archivo!", err)
        }  
    };
    async getById(id){        
        try{
            const contenido = await fs.promises.readFile(`${this.src}`, 'utf-8');
            const contenidoDeserializado = JSON.parse(contenido);
            for(let i = 0; i < contenidoDeserializado.length; i++){
                if(contenidoDeserializado[i].id === id){
                console.log(contenidoDeserializado[i]);
                }
            }
        }
        catch(err){
            console.log('No se encontró el producto asociado a ese ID', err)
        }
    };
    async getAll(){
        try{
            const contenido = await fs.promises.readFile(`${this.src}`, 'utf-8');
            const contenidoDeserializado = JSON.parse(contenido);
            return contenidoDeserializado;
        }
        catch(err){
            console.log('Error de lectura', err)
        }
    };
    async deleteById(id){
        try{
            const contenido = await fs.promises.readFile(`${this.src}`, 'utf-8');
            const contenidoDeserializado = JSON.parse(contenido);
            for(let i = 0; i < contenidoDeserializado.length; i++){
                if(contenidoDeserializado[i].id === id){
                    contenidoDeserializado.splice(i, 1);
                    await fs.promises.writeFile(`${this.src}`, JSON.stringify(contenidoDeserializado));
                }
                
            }
            
        }
        catch(err){
            console.log('No se encontró el producto asociado a ese ID', err)
        }
    }
    async deleteAll(){
        const contenido = await fs.promises.readFile(`${this.src}`, 'utf-8');
        const contenidoDeserializado = JSON.parse(contenido);
        for(let i = 0; i < contenidoDeserializado.length; i++){
                contenidoDeserializado.splice(i);
        }
        await fs.promises.writeFile(`${this.src}`, JSON.stringify(contenidoDeserializado));
    }
}



// CREO UN NUEVO CONTAINER CON EL ARCHIVO DE PRODUCTOS

const nuevoArchivo = new Container('./src/productos.txt');

console.log(nuevoArchivo.getAll())

const express = require('express');

const app = express();

const PORT  = 8080;

app.get('/productos', (req, res) => { 
    res.json(nuevoArchivo.getAll());
})

app.get('/productoRandom', (req, res) => {
    res.json(nuevoArchivo.getById(Math.floor(Math.random() * nuevoArchivo.getAll().length)))
})

const server = app.listen(PORT, ()=>{
})