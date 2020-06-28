const mongoose =require('mongoose');
const {Schema} =mongoose;
const categoriaShema =Schema({
    descripcion:{type:String,inique:true,require:true},
    usuario:{type:Schema.Types.ObjectId,ref:'Usuario'},

});
module.exports=mongoose.model('Categoria',categoriaShema);