const mongoose = require("mongoose");
const userModel = require("./userModel");

const userInfoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    summary: {
      type: String,
    },
    location: {
      type: Object,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
    workPriorities: {
      type: Array,
    },

    workingDistance: {
      type: Number,
    },
    workingStatus: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      default: false,
    },
    profileCompletedStatus:{
      type:Boolean,
      default:false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("userInfo", userInfoSchema);
