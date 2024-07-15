const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Ruta para mostrar todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ isFavorite: -1 });
        res.render('page/shop', { products: products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});

module.exports = router;