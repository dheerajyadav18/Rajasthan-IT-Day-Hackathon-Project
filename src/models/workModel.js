const mongoose = require("mongoose");
const userModel = require("./userModel");

const workSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
    },
    workHeading: {
      type: String,
      required: true,
    },
    workDescription: {
      type: String,
      required: true,
    },
    workLocation: {
      type: Object,
      required: true,
    },
    workAddress: {
      type: String,
      required: true,
    },
    workCity: {
      type: String,
      required: true,
    },
    workState: {
      type: String,
      required: true,
    },
    payRange: {
      type: String,
    },
    workTime: {
      type: Date,
      required: true,
    },
    workTags:{
      type:Array,
    },
    workProposalAccepted:{
      type:Array,
    },
    workCompletedStatus:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("workModel", workSchema);
