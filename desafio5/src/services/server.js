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
app.set('view engine', 'hbs'); // voy a usar handlebars
app.set('views', viewPath); // mi carpeta de views está en tal lugar
app.engine('hbs', engine({
    layoutsDir: layoutsPath,
    extname: 'hbs', // esta propiedad permite hacer la extensión más corta
    defaultLayout: defaultLayoutPath, // esta propiedad permite utilizar un layout default
    partialsDir: partialsPath // 
})); //

// HANDLEBARS
app.get('/', async (req, res)=>{
    const data = await fs.readFile(filePath, 'utf8');
    const productos = JSON.parse(data);
    res.render('main');
}); 

app.get('/productos', (req, res)=>{
    res.render('main')
});
// main hace referencia a la linea 22 app.set('views', viewPath);
// {  }

/*
const funcionPost = ()=>{
    axios.post(`/productos?title=${title}&price=${price}&thumbnail=${thumbnail}`)
};
*/


app.post('/productos', async (req, res)=>{
    const json = await fs.readFile(filePath, 'utf8');
    const productos = JSON.parse(json);

    const data = req.body;

    console.log(data)
/*
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
    });*/
});

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use(express.static('public'));

module.exports = app;