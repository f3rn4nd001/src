const mongoose =require('mongoose');
const {Schema} =mongoose;
const chatShema =Schema({
    usuario:{type:String,require:true},   
    chat:{type:String,require:true},
    usuario:{type:Schema.Types.ObjectId,ref:'Usuario'},

})
module.exports=mongoose.model('chatModel',chatShema);