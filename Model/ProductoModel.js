const mongoose =require('mongoose');
const {Schema} =mongoose;
const productoShema =Schema({
    nombre:{type:String,require:true},
    precio:{type:Number,require:true},
    peso:{type:Number,require:true},
    cantidad:{type:Number,require:true},
    descripcio:{type:String,require:true},
    usuario:{type:Schema.Types.ObjectId,ref:'Usuario'},
    img:{type:String,require:false},
    
});
module.exports=mongoose.model('productoModel',productoShema);