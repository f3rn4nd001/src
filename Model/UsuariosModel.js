const mongoose =require('mongoose');
const {Schema} =mongoose;
let rolV={
    values:['Admin','Usuario'],
    message:'{VALUE} no es un rol'
};
let sexoV={
    values:['Hombre','Mujer'],
    message:'{VALUE} no es un rol'
};
const usuarioShema =Schema({
    nombre:{type:String,require:true},
    apellido:{type:String,require:true},
    email:{type:String, unique:true ,require:true},
    password:{type:String,require:true},
    img:{type:String,require:false},
    role:{type:String, default:'Usuario',enum:rolV},
    sexo:{type:String,enum:sexoV,require:false},
    edad:{type:String,require:false},
    estado:{type:Boolean,default:true},
    google:{type:Boolean,default:false},
    telefono:{type:String,require:true},
});
module.exports=mongoose.model('usuarioModel',usuarioShema);