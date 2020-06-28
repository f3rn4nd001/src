const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const productoModel = require('../Model/ProductoModel');

const productoController ={}

productoController.productoGet= async (req,res)=>{
    const producto = await productoModel.find();
     return res.json(producto);
   
}

productoController.productoCreatet= async (req,res)=>{
    const {nombre,precio,peso,cantidad ,descripcio}=(req.body);
    const usuario= await usuarioModel.findOne({_id:req.usuarioToken});
    console.log({nombre,precio,peso,cantidad ,descripcio,usuario});
    const errors = [];
    const guardado = [];
    if (!nombre) {
        errors.push({ text: 'El campo nombre no puede estar vacio' });
    }
    if (!precio) {
        errors.push({ text: 'El campo precio no puede estar vacio' });
    }
    if (!peso) {
        errors.push({ text: 'El campo peso no puede estar vacio' });
    }
    if (!cantidad) {
        errors.push({ text: 'El campo cantidad no puede estar vacio' });
    }
    if (!descripcio) {
        errors.push({ text: 'El campo descripcio no puede estar vacio' });
    }
    if (errors.length > 0) {
        console.log({
            errors,
        });
    } 
    else {
        if(idToken.role==='Admin'){ 
            guardado.push({ text: 'Datos de producto guardados'});
            const producto =new productoModel({nombre,precio,peso,cantidad,descripcio,usuario});
            await producto.save();   
            console.log(producto);
            res.json(producto);
        }
        else{
            guardado.push({ text: 'Datos de producto no guardados'});
        }
    }
}

module.exports=productoController;