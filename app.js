//Paquetes y archivos 
const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/connectDB'); 
const productsRouter = require('./routes/products'); 
const adminRouter = require('./routes/admin'); 
const session = require('express-session');


//middleware
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/productos', productsRouter); 
app.use('/admin', adminRouter); 
//pepe.com/productos/shop
//pepe.com/admin/crud
//pepe.com/admin/agregate

//Rutas GET
app.get('/', (req, res) => {
    res.render('page/home')
});

app.get('/about', (req, res) => {
    res.render('page/about')
});
app.get('/contact', (req, res) => {
    res.render('page/contact')
});

app.get('/login', (req, res) => {
    res.render('page/login')
});
app.get('/register', (req, res) => {
    res.render('page/register')
});

app.get('/exito', (req, res) => {
    res.render('page/exito')
});



app.set('view engine', 'ejs');














//Funcion que activa la conexion

const iniciar = async () => {
    try {
        await connectDB(process.env.MONGO_URL) //URL de entorno

      
    } catch (error) {
        console.log(error)
    }
}

iniciar(); 

//Puerto 
app.listen(process.env.PORT, () => {
    console.log('Puerto ejecuntadose')
});

