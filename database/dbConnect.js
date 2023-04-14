const mongoose = require("mongoose");
const {DB_URL} = require("../src/helpers/env.js");

mongoose.set("strictQuery", false);
const dbConnect = () => {
    mongoose
        .connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Mongo Connection Successful");
        })
        .catch((err) => {
            console.log("Db not connected", err);
        });
}

module.exports = dbConnect;