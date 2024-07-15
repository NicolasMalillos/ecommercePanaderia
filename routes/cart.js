const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Asegúrate de que esta ruta es correcta

// Inicializar el carrito en la sesión
router.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

// Obtener el carrito
router.get('/', (req, res) => {
    const cart = req.session.cart;
    res.render('page/cart', { cart });
});

// Ruta para añadir un producto al carrito
router.post('/add', async (req, res) => {
    const { productId } = req.body;

     // Verifica si el carrito ya existe en la sesión, si no, crea uno nuevo
        if (!req.session.cart) {
        req.session.cart = [];
    }
    try{
      // Busca el producto en la base de datos
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Añade el producto al carrito
        req.session.cart.push({
            productId: product._id,
            nombre: product.nombre_producto,
            precio: product.precio,
            imagen: product.imagen,
            cantidad: 1 
        });

        // Redirige a la página del carrito
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para eliminar un producto del carrito
router.post('/remove', (req, res) => {
    const { productId } = req.body;

    if (!req.session.cart) {
        return res.redirect('/cart');
    }

    // Filtra los productos del carrito para eliminar el producto especificado
    req.session.cart = req.session.cart.filter(item => item.productId.toString() !== productId);

    // Redirige a la página del carrito
    res.redirect('/cart');
});

// Actualizar cantidad de producto
router.post('/update/:id', (req, res) => {
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity, 10);

    const cartItem = req.session.cart.find(item => item.product._id.toString() === productId);
    if (cartItem) {
        cartItem.quantity = quantity;
    }

    res.redirect('/cart');
});

module.exports = router;