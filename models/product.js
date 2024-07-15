const mongoose = require('mongoose');

const productosEsquema = new mongoose.Schema({

    nombre_producto: String,
    cantidad_stock: Number,
    descripcion: String,
    imagen: String,
    marca: String,
    fecha_vencimiento: String,
    fecha_ingreso: String,
    categoria: String,
    oferta: Boolean,
    precio_oferta: Number,
    precio: Number,
    isFavorite: { type: Boolean, default: false }
}); 
//                                Coleccion
const Productos = mongoose.model('Productos', productosEsquema)

module.exports = Productos; 