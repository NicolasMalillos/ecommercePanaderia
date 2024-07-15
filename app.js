//Paquetes y archivos 
const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/connectDB'); 
const productsRouter = require('./routes/products'); 
const adminRouter = require('./routes/admin'); 
const session = require('express-session');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const registerRoute = require('./routes/register'); 
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();


app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
//middleware

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware de session
app.use(session({
    secret: 'secreta', // Cambia esto por una clave secreta segura en producción
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const cartRouter = require('./routes/cart');




// Importar rutas
app.use('/productos', productsRouter); 
app.use('/admin', adminRouter); 
app.use('/api/auth', authRoutes);
app.use('/register', registerRoute);
app.use('/', indexRouter);
app.use('/cart', cartRouter);








// Conectar a la base de datos MongoDB local
const db = 'mongodb://localhost:27017/test/users'; // Reemplaza 'tu_base_de_datos' por el nombre de tu base de datos







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
app.get('/cart', (req, res) => {
    res.render('page/cart')
});


    
// Ruta POST para registrarse
app.post('/api/auth/register', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        console.log('usuario no exite, creando uno nuevo');
        //crear un nuevo usuario
        user = new User({ username, email, password });
        


        //encriptar la contrasenia antes de guardar el usuario
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // guardar el usuario en la base de datos
        await user.save();
        console.log('Usuario guardaado en la base de datos');
        

        const payload = {user: {id: user.id}};

        jwt.sign(
            payload,
            'secreta', // Cambia esto por una clave secreta segura en producción
            { expiresIn: 3600 }, // 1 hora
            (err, token) => {
                if (err) throw err;
                console.log('Token creado');
                res.json({ token });
            }
        );

        res.redirect('/')
    } catch (err) {
        console.error('Error en la ruta /register:', err.message);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta POST para iniciar sesión
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }

        // Crear y asignar un token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            'secreta', // Cambia esto por una clave secreta segura en producción
            { expiresIn: 3600 }, // 1 hora
            (err, token) => {
                if (err) throw err;
                //direcciona al home
               
                res.redirect('/home');
                // redirige a la pagina de inicio
            }
        );
        
    } catch (err) {
        console.error('Error en la ruta /login: ', err.message);
        res.status(500).send('Error en el servidor');
    }
});







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

