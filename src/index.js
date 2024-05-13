const express = require('express');
const cors = require('cors');
const conexionBd = require('../config/db');


const app = express();
app.use(cors());
app.use(express.json());


 
const port = process.env.PORT || 4000; 
app.listen(port, ()=>{
    console.log(`Servidor iniciado en el puerto ${port}`);
})

//rutas
app.use('/api/usuarios',require('../routes/usuarios'));
app.use('/api/auth',require('../routes/auth'));
app.use('/', require('../routes/clienteRoutes'));
app.use('/', require('../routes/productoRoutes'));

// enlazar servidor con bd
conexionBd();

