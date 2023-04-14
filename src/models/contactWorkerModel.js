const mongoose = require("mongoose");
const userModel = require("./userModel");

const contactWorkerModelSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userModel
    },
    workerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userModel
    },
    message:{
        type:String,
    }
},{timestamps:true})


module.exports = mongoose.model("contactWorker",contactWorkerModelSchema);