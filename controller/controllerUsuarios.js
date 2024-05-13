const Usuarios = require('../model/modelUsuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.CrearUsuario = async (req, res) => {
    // válidamos para ver si encontramos errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }

    const {email, password} = req.body;

    try {
        //verificamos que el usuario registrado sea único
        let usuario = await Usuarios.findOne({email})
        if(usuario){
            return res.status(400).json({msg:'el usuario ya existe'});
        }

        // vamos a crear el usuario
        usuario = new Usuarios(req.body);
        usuario.password = await bcryptjs.hash(password, 12);
        // guardamos el usuario
        await usuario.save();
        //firmamos el jwt
        const payload = {
            usuario: { id: usuario.id},
        };
        jwt.sign(
            payload,
            process.env.secreta,
            {
                expiresIn: 3600,
            },
            (error,token) => {
                if(error) throw error;
        
                //mensaje de confirmación
                res.json({token});
            }
        )

    } catch (error) {
        console.log('hay un error');
        console.log(error);
        res.status(400).send('hubo un error');
    }
}