const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //leer token
    const token = req.header('x-auth-token');

    //revisar token
    if(!token){
        return res.status(400).json({msg:'No se encuentra un token'})
    }

    try {
        const cifrado = jwt.verify(token, process.env.secreta);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(400).json({msg:'Token no es válido'});
    }
}

