const express=require('express'); 
const router = express.Router(); 
const {obtenerTodosLosProductos, buscarPorAmbientadores, buscarPorLimpiezaHogar, buscarPorHigiene,
     buscarPorLimpiezaIndustrial, carritoDeCompras} = require('../controllers/products')

//RUTAS


router.route('/shop').get(obtenerTodosLosProductos) //???????

//Carrito de compra 
router.route('/carrito/:id').get(carritoDeCompras)



//rutas por categoria

router.route('/ambientadores').get(buscarPorAmbientadores)
router.route('/higienepersonal').get(buscarPorHigiene)
router.route('/limpiezaindustrial').get(buscarPorLimpiezaIndustrial)
router.route('/limpiezadelhogar').get(buscarPorLimpiezaHogar)

module.exports=router