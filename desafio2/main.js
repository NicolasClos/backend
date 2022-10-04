const fs = require('fs');

// CREACIÓN DE LA CLASE

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
            console.log(contenido)
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

// EJECUCIÓN CÓDIGO

const nuevoArchivo = new Container('./productos.txt');

nuevoArchivo.save({title: "Iphone 14 pro", price: "1400", thumbnail: "https://www.apple.com/v/iphone-14-pro/a/images/meta/iphone-14-pro_overview__e2a7u9jy63ma_og.png"})

/*

PROBAR UNO POR UNO

nuevoArchivo.getById(2)

nuevoArchivo.getAll()

nuevoArchivo.deleteById(1)

nuevoArchivo.deleteAll()

*/