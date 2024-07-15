const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 



// Ruta POST para registrar usuarios
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos
        let user = await User.findOne({ email });
        if (user) {
            return res.render('page/register', { error_msg: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        user = new User({ username, email, password });

        // Encriptar la contraseña antes de guardar el usuario
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Guardar el usuario en la base de datos
        await user.save();

        // Generar token de autenticación
        const payload = { user: { id: user.id } };
        jwt.sign(payload, 'secreta', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
        res.redirect('/')
    } catch (err) {
        console.error('Error en la ruta /register:', err.message);
        res.status(500).send('Error en el servidor');
    }
});






module.exports = router;