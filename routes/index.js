const express = require('express');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
    res.render('page/home', { title: 'Inicio' });
});

module.exports = router;