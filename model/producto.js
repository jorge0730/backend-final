const mongoose = require('mongoose');

// el modelo que se cree en este archivo debe ser igual al de la base de datos

const productoSchema = mongoose.Schema({
    nombreProducto:{
        type: String,
        required: true
    },
    codigo:{
        type: String,
        required: true
    },
    fabricante:{
        type: String,
        required: true
    },
    cantidad:{
        type: String,
        required: true
    },
},{versionkey:false});

module.exports = mongoose.model('producto',productoSchema);