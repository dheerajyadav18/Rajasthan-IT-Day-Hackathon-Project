const mongoose = require("mongoose");
const userModel = require("./userModel");

const accountVerificationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: userModel
    },
    verificationToken:{
        type:String,
        required:true,
    }
},{ timestamps: true });


module.exports = mongoose.model("accountVerification", accountVerificationSchema);