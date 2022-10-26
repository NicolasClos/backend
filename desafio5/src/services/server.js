// REQUIRES
const fs = require('fs/promises');
const path = require('path');
const { engine } = require('express-handlebars');

const express = require('express');
const app = express();


// PATHS 
const filePath = path.resolve(__dirname, '../productos.json');
const viewPath = path.resolve(__dirname, '../../views/');
const layoutsPath = `${viewPath}/layouts`;
const partialsPath = `${viewPath}/partials`;
const defaultLayoutPath = `${layoutsPath}/index.hbs`;


app.use(express.static('public'))

// CONFIG HANDLEBARS
app.set('view engine', 'hbs');
app.set('views', viewPath);
app.engine('hbs', engine({
    layoutsDir: layoutsPath,
    extname: 'hbs',
    defaultLayout: defaultLayoutPath,
    partialsDir: partialsPath
}));

// HANDLEBARS
app.get('/productos', (req, res)=>{
    res.render('main', {nombre: 'NICO'});
});

app.get('/test', (req, res)=>{
    res.json({
        msg: 'ok'
    });
});

app.post('/producto', async (req, res)=>{
    const json = await fs.readFile(filePath, 'utf8');
    const productos = JSON.parse(json);

    const data = req.body;

    const {title, price, thumbnail} = data;

    if(!title || !price || !thumbnail){
        return res.status(400).render('prods');
    }

    productos.push(data);

    productos[productos.length - 1].id = productos.length;

    await fs.writeFile(filePath, JSON.stringify(productos));

    res.render('prods');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use(express.static('public'));

module.exports = app;