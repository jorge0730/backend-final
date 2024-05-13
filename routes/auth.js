const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')
const { check } = require('express-validator');
const auth = require('../middlewares/authMiddleware');


router.post('/',[
    check('email','ingrese un email válido').isEmail(),
    check('password','el password debe ser minimo de 10 caracteres').isLength({min:10}),
],
    authController.autenticarUsuario
);

router.get('/', auth, authController.usuarioAutenticado);

module.exports = router;