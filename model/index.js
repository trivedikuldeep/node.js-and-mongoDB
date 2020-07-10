const mongoose=require('mongoose');

const Storeschema=mongoose.Schema({

    name:String,
    img:String,
    summary:String
});
module.exports=mongoose.model('Book',Storeschema);