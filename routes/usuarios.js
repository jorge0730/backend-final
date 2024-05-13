const express = require('express');
const router = express.Router();
const controllerUsuarios = require('../controller/controllerUsuarios');
const { check } = require('express-validator');


router.post('/',[
    check('nombres','los nombres son obligatorios').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),
    check('password','el password debe contener 10 caracteres').isLength({min:10}),
],
controllerUsuarios.CrearUsuario
);


module.exports = router;
