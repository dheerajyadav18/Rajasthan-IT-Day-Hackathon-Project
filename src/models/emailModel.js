const mongoose = require("mongoose");

const emailSchema = mongoose.Schema({
  toEmail: {
    type: String,
    required: true,
  },
  fromEmail: {
    type: String,
    required: true,
  },
  toName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{ timestamps: true });

module.exports = mongoose.model("email", emailSchema);
