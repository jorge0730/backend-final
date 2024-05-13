const Usuarios = require('../model/modelUsuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { email, password } = req.body;
    try {
        // válidamos el usuario 
        let usuario = await Usuarios.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'el usuario no existe' });
        }
        // válidamos el password
        let passOk = await bcryptjs.compare(password, usuario.password);
        if (!passOk) {
            return res.status(400).json({ msg: 'contraseña no válida' });
        }
        // si es correto, se crea y se firma el token 
        const payload = {
            usuario: { id: usuario.id },
        };
        jwt.sign(
            payload,
            process.env.secreta,
            {
                expiresIn: 43200,
            },
            (error, token) => {
                if (error) throw error;
                //mensaje de confirmación
                res.json({ token });
            }
        );

    } catch (error) {
        console.log('hay un error');
        console.log(error);
        res.status(400).send('hubo un error');
    }

};

exports.usuarioAutenticado = async (req, res) => {
    try {
        let usuario = await Usuarios.findById(req.usuario.id);
        res.json({usuario});

    } catch (error) {
        res.status(500).json({msg:'Error al cargar información'})
    }
}