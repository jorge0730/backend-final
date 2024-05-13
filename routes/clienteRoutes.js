const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteController');

router.post('/agregarCliente',clienteController.agregarCliente);
router.get('/buscarCliente',clienteController.buscarCliente);
router.get('/buscarClienteId/:id',clienteController.buscarClienteId);
router.delete('/eliminarCliente/:id',clienteController.eliminarClienteId);
router.put('/actualizarCliente/:id',clienteController.actualizarClienteId);

module.exports = router;