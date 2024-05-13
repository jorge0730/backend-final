const Cliente = require('../model/cliente');

//función para actualizar cliente por id
exports.actualizarClienteId = async(req,res) => {
    try {
        const {nombres,apellidos,documento,correo,celular,direccion} = req.body;
        let cliente = await Cliente.findById(req.params.id);
        if(!cliente){
            res.status(404).json({msg:'Cliente no encontrado con el id especificado'});
            return
        }
        cliente.nombres = nombres;
        cliente.apellidos = apellidos;
        cliente.documento = documento;
        cliente.correo = correo;
        cliente.celular = celular;
        cliente.direccion = direccion;
        cliente = await Cliente.findOneAndUpdate({_id:req.params.id}, cliente,{new:true});
        res.json(cliente);
        return
    } catch (error) {
        console.log(error);
        res.status(500).send('error al actualizar cliente');    
    }
}

//función para eliminar cliente por id
exports.eliminarClienteId = async(req,res) => {
    try {
        let cliente = await Cliente.findById(req.params.id);
        if(!cliente){
            res.status(404).json({msg:'Cliente no encontrado con el id especificado'});
            return
        }
        await Cliente.findOneAndDelete({_id:req.params.id});
        res.json({msg:'Cliente eliminado correctamente'});
        return
    } catch (error) {
        console.log(error);
        res.status(500).send('error al eliminar cliente');    
    }
}

//función para buscar cleinte por id
exports.buscarClienteId = async(req,res) => {
    try {
        let cliente = await Cliente.findById(req.params.id);
        if(!cliente){
            res.status(404).json({msg:'Cliente no encontrado con el id especificado'});
            return
        }
        res.send(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('error al buscar cliente');    
    }
}

//función para buscar clientes
exports.buscarCliente = async(req,res) => {
    try {
        let cliente = await Cliente.find();
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('error al buscar clientes');    
    }
};

//función para agregar cliente
exports.agregarCliente = async(req,res) => {
    try{
        let cliente;
        cliente = new Cliente(req.body);
        await cliente.save();
        res.send(cliente);
    }catch(error){
        console.log(error);
        res.status(500).json({msg:'error al agregar cliente'});    
    }
};