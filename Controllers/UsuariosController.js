const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../Model/UsuariosModel');

const usuarioController ={}


usuarioController.usuariosGet= async (req,res)=>{
    const usuarios = await usuarioModel.find();
     return res.json(usuarios);
   
}

usuarioController.usuarioCreatet= async (req,res,next)=>{
    const {nombre,apellido,email,password ,password_conf,img,role,telefono,sexo,edad}=(req.body);
    console.log({nombre,apellido,email,password ,password_conf,img,role,telefono,sexo,edad});
    
    const errors = [];
    const guardado = [];
    if(password != password_conf){
        res.send({'success':false,message:' la contraseña no coinide' });
        errors.push({ text: ' la contraseña no coinide'});
    }
    if(!password_conf){
        res.send({'success':false,message: 'El campo password no puede estar vacio'});
        errors.push({ text: 'El campo password no puede estar vacio'});
    }
    if(password_conf.length<4){
        res.send({'success':false,message:'la contraseña tiene que se mayor a 4 digitos' });
        errors.push({ text: 'la contraseña tiene que se mayor a 4 digitos'});        
    }
    if(password.length<4){
        res.send({'success':false,message: 'la contraseña tiene que se mayor a 4 digitos'});
        errors.push({ text: 'la contraseña tiene que se mayor a 4 digitos'});        
    }
    if (!password ) {
        res.send({'success':false,message: 'El campo password no puede estar vacio'});
        errors.push({ text: 'El campo password no puede estar vacio'});
    } 
    if (!nombre) {
        res.send({'success':false,message: 'El campo Nombre no puede estar vacio'});
        errors.push({ text: 'El campo Nombre no puede estar vacio' });
    }
    if (!apellido) {
        res.send({'success':false,message: 'El campo apellido no puede estar vacio'});
        errors.push({ text: 'El campo apellido no puede estar vacio'});
    }
    if (!email) {
        res.send({'success':false,message: 'El campo email no puede estar vacio'});
        errors.push({ text: 'El campo email no puede estar vacio'});
    } 
    if (!telefono) {
        res.send({'success':false, message:'El campo telefono no puede estar vacio'});
        errors.push({ text: 'El campo telefono no puede estar vacio' });
    }
    if (errors.length > 0) {
        console.log({
            errors,
        });
    } else {
        const emailUsuario =await usuarioModel.findOne({email:email});
        if(emailUsuario) {res.send({message:"usuario ya registrado",'success':false});
            console.log("usuario ya registrado");}
        else{
            guardado.push({ text: 'Datos de usuario guardados' ,message:'Datos de usuario guardados','success':true});
            const usuario =new usuarioModel({nombre,apellido,email,password:bcrypt.hashSync(password,10),img,role,telefono,sexo,edad});
            await usuario.save();   
            console.log(usuario);
            res.json(usuario);
        } 
    }
}

usuarioController.usuarioGet= async (req,res)=>{
    const usuario =await usuarioModel.findById(req.params.id);
    }

    
usuarioController.usuarioPut= async (req,res)=>{
    const idToken= await usuarioModel.findOne({_id:req.usuarioToken});
    if(idToken.role==='Admin'){     
        const {_id,nombre,apellido,email,password,img,telefono,role,sexo,edad } = req.body;
        console.log({_id,nombre,apellido,email,password,img,telefono,role,sexo,edad});
        const emailUsuario =await usuarioModel.findOne({_id:_id});
        if(emailUsuario){
            if(password===emailUsuario.password){
                await usuarioModel.findByIdAndUpdate(req.body._id, { nombre,apellido,email,password,img,telefono,role,edad,sexo});
            }
            else{   
                await usuarioModel.findByIdAndUpdate(req.body._id, { nombre,apellido,email,password:bcrypt.hashSync(password,10),img,telefono,role,edad,sexo });
            }
        }        
    }
}

usuarioController.usuarioDelete= async (req,res)=>{  
    const idToken= await usuarioModel.findOne({_id:req.usuarioToken});
    if(idToken.role==='Admin'){                              
        await usuarioModel.findByIdAndDelete(req.params.id); 
       
    }
}
usuarioController.usuarioLoginPut=  async (req,res,next)=>{  
        const {email,password}=(req.body);
        const emailUsuario =await usuarioModel.findOne({email:email});
        if(emailUsuario) {
            if(bcrypt.compareSync(password,emailUsuario.password)){
                const token =jwt.sign({
                    usuario:emailUsuario._id
                },'token-de-desarrollo',{expiresIn: 60*60*24});
                console.log(token);
                return res.status(200).json({token,'success':true})
            }else{res.send({message:"no entra paswor incorecto",'success':false})
                console.log({message:"no entra paswor incorecto" ,'success':false});
            }
        
        }else{res.send({message:"no entra email incorecto",'success':false});
            console.log({message:"no entra email incorecto",'success':false});}
    }    
module.exports=usuarioController;