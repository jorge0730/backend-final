const mongoose = require('mongoose');

// el modelo que se cree en este archivo debe ser igual al de la base de datos

const clienteSchema = mongoose.Schema({
    nombres:{
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    documento:{
        type: Number,
        required: true
    },
    correo:{
        type: String,
        required: true
    },
    celular:{
        type: Number,
        required: true
    },
    direccion:{
        type: String,
        required: true
    }
},{versionkey:false});

module.exports = mongoose.model('cliente',clienteSchema);