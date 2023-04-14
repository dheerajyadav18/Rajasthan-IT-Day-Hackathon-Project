const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        unique:true,
    },
    password:{
       type:String,
    },
    userType:{
        type:String,
        default:"user", // worker
    },
    verified:{
        type:Boolean,
        default:false,
    },
},{ timestamps: true })

module.exports = mongoose.model("user", userSchema);