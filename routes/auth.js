const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Ruta POST para registrarse
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validación de datos (opcional)

        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crear nuevo usuario
        user = new User({
            username,
            email,
            password
        });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Guardar usuario en la base de datos
        await user.save();

        res.status(201).json({ msg: 'Usuario registrado correctamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta POST para iniciar sesión
router.post('/login', async (req, res) => {
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
                //redirige a la pagina de inicio una vez que se verifica que el email y la contrasenia son correctos
                res.redirect('/');
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});



module.exports = router;