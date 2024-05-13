const Producto = require('../model/producto');

//función para actualizar producto por id
exports.actualizarProductoId = async(req,res) => {
    try {
        const {nombreProducto,codigo,fabricante,cantidad} = req.body;
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({msg:'Produnto no encontrado'});
            return
        }
        producto.nombreProducto = nombreProducto;
        producto.codigo = codigo;
        producto.fabricante = fabricante;
        producto.cantidad = cantidad;
        producto = await Producto.findOneAndUpdate({_id:req.params.id}, producto,{new:true});
        res.json(producto);
        return
    } catch (error) {
        console.log(error);
        res.status(500).send('error al actualizar producto');    
    }
}

//función para eliminar producto por id
exports.eliminarProductoId = async(req,res) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({msg:'Producto no encontrado'});
            return
        }
        await Producto.findOneAndDelete({_id:req.params.id});
        res.json({msg:'Producto eliminado correctamente'});
        return
    } catch (error) {
        console.log(error);
        res.status(500).send('error al eliminar cliente');    
    }
}

//función para buscar producto por id
exports.buscarProductoId = async(req,res) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({msg:'Producto no encontrado'});
            return
        }
        res.send(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('error al buscar producto');    
    }
}

//función para buscar productos
exports.buscarProducto = async(req,res) => {
    try {
        let producto = await Producto.find();
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('error al buscar productos');    
    }
};

//función para agregar producto
exports.agregarProducto = async(req,res) => {
    try{
        let producto;
        producto = new Producto(req.body);
        await producto.save();
        res.send(producto);
    }catch(error){
        console.log(error);
        res.status(500).send('error al agregar producto');    
    }
};