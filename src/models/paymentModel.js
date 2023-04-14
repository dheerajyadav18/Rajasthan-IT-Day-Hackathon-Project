const mongoose = require("mongoose");
const makeProposalModel = require("./makeProposalModel");
const workModel = require("./workModel");

const paymentSchema =  new mongoose.Schema({
    workId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:workModel  
    },
    proposalId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:makeProposalModel,
    },
    amount:{
        type:Number,
        required:true,
    }
},{timestamps:true});


module.exports = mongoose.model("payment", paymentSchema);