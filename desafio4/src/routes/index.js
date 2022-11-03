const fs = require('fs/promises');
const path = require('path');
const { Router } = require('express');

const filePath = path.resolve(__dirname, '../productos.json');

const route = Router();

route.get('/', async (req, res)=>{
    const data = await fs.readFile(filePath, 'utf8');
    const productos = JSON.parse(data);
    res.json(productos);
});

route.get('/:id', async (req, res)=>{
    const data = await fs.readFile(filePath, 'utf8');
    const id = req.params.id;
    const productos = JSON.parse(data);

    const prodId = productos.findIndex(product => product.id == id);

    if(prodId < 0){
        return res
                .status(404)
                .json({ error : 'Producto no encontrado' });
    }

    res.json(productos[prodId]);
});

route.post('/', async (req, res)=>{
    const json = await fs.readFile(filePath, 'utf8');
    const productos = JSON.parse(json);

    const data = req.body;

    const {title, price, thumbnail} = data;

    if(!title || !price || !thumbnail){
        return res.status(400).json({
            msg: '¡Campos invalidos!'
        });
    }

    productos.push(data);

    productos[productos.length -1].id = productos.length;

    await fs.writeFile(filePath, JSON.stringify(productos));

    res.status(201).json({
        msg: 'Ok',
    });
});

route.put('/:id', async (req, res)=>{
    const productos = JSON.parse(await fs.readFile(filePath, 'utf8'));
    const id = req.params.id;
    const {title, price, thumbnail} = req.body;
    const prodId = productos.findIndex(product => product.id == id);

    if(prodId < 0){
        return res
                .status(404)
                .json({ error : 'Producto no encontrado' });
    }

    if(!title || !price || !thumbnail){
        return res
                .status(400)
                .json({msg: "¡Campos inválidos!"});
    }

    const prodActualizado = {
        title,
        price,
        thumbnail,
        id: id
    };

    productos.splice(prodId, 1, prodActualizado);

    await fs.writeFile(filePath, JSON.stringify(productos));

    res.json({
        msg: '¡Producto actualizado!'
    });
});

route.delete('/:id', async (req, res)=>{
    const data = await fs.readFile(filePath, 'utf8');
    const id = req.params.id;
    const productos = JSON.parse(data);

    const prodId = productos.findIndex(product => product.id == id);

    console.log(req.params);

    if(prodId < 0){
        return res
                .status(404)
                .json({ error : 'Producto no encontrado' });
    }

    productos.splice(prodId, 1);
    await fs.writeFile(filePath, JSON.stringify(productos, null, '\t'));

    res.json({
        msg: `Borrando producto con id ${id}`
    });
});

module.exports = route;