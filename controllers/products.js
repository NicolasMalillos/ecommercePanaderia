const Productos = require('../models/product');


const obtenerTodosLosProductos = async (req, res) => {
    const products = await Productos.find();

    console.log('Todo bien, se realizo la busqueda')
    res.render('page/shop', { products: products })

}

const carritoDeCompras = async (req, res) => {
    console.log('Esta funcion muestra el carrito');

    const idReq = { _id: req.params.id };
    let products = await Productos.findOne(idReq)
        .then(product => {
            res.render('page/carrito', { product });
            console.log('El resultado es', product)
        })
        .catch(error => {
            console.log(error)
        })

}




//Buscar por categorias
const buscarPorAmbientadores = async (req, res) => {
    try {

        const productos = await Productos.find({ categoria: 'Ambientadores' });
        res.status(200).json({ productos, numProducts: productos.length });

    } catch (error) {

        console.error('Error al obtener productos de la categoria', error)
        res.status(500).json({ error: `Error al obtener productos de la categoria ${categoria}` });
    }
}

const buscarPorHigiene = async (req, res) => {
    try {

        const productos = await Productos.find({ categoria: 'Higiene Personal' });
        res.status(200).json({ productos, numProducts: productos.length });

    } catch (error) {

        console.error('Error al obtener productos de la categoria', error)
        res.status(500).json({ error: `Error al obtener productos de la categoria ${categoria}` });
    }
}

const buscarPorLimpiezaIndustrial = async (req, res) => {
    try {

        const productos = await Productos.find({ categoria: 'Limpieza Industrial' });
        res.status(200).json({ productos, numProducts: productos.length });

    } catch (error) {

        console.error('Error al obtener productos de la categoria', error)
        res.status(500).json({ error: `Error al obtener productos de la categoria ${categoria}` });
    }
}

const buscarPorLimpiezaHogar = async (req, res) => {
    try {

        const productos = await Productos.find({ categoria: 'Pasteleria' });
        res.status(200).json({ productos, numProducts: productos.length });

    } catch (error) {

        console.error('Error al obtener productos de la categoria', error)
        res.status(500).json({ error: `Error al obtener productos de la categoria ${categoria}` });
    }
}

module.exports = {
    obtenerTodosLosProductos,
    buscarPorAmbientadores,
    buscarPorHigiene,
    buscarPorLimpiezaIndustrial,
    buscarPorLimpiezaHogar,
    carritoDeCompras
}