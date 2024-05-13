const express = require('express');
const router = express.Router();

const productoController = require('../controller/productoController');

router.post('/agregarProducto',productoController.agregarProducto);
router.get('/buscarProducto',productoController.buscarProducto);
router.get('/buscarProductoId/:id',productoController.buscarProductoId);
router.delete('/eliminarProducto/:id',productoController.eliminarProductoId);
router.put('/actualizarProducto/:id',productoController.actualizarProductoId);

module.exports = router;