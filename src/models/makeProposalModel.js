const mongoose = require("mongoose");
const workModel = require("../models/workModel");
const userModel = require("./userModel");

const makeProposalSchema = new mongoose.Schema(
  {
    workId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: workModel,
    },
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: userModel,
    },
    proposalDescription: {
      type: String,
      required: true,
    },
    proposalPay: {
      type: Number,
      required: true,
    },
    proposalStatus: {
      type:String,
      default: "pending",
    },
  
  },
  { timestamps: true }
);
module.exports = mongoose.model("makeProposalModel", makeProposalSchema);
