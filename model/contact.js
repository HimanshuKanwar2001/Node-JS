//it will use the same instance as in the config folder that's one of the advantage of using nodejs
const mongoose=require('mongoose');


const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }

});

const Contact = mongoose.model('Contact',contactSchema);

module.exports=Contact;