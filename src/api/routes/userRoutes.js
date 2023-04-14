const routes= require("express").Router()
const verifyAccessToken = require("../../helpers/utils/verifyAccessToken.js");
const userLogin = require("../controllers/user/userLogin.js");
const userSignUp = require("../controllers/user/userSignUp.js");
const userVerify = require("../controllers/user/userVerify.js");
const getProfileDetails = require("../controllers/user/getProfileDetails.js");
const editProfileDetails = require("../controllers/user/editProfileDetails.js");
const workerCheck = require("../../helpers/utils/workerCheck.js");
const updateWorkingStatusOfWorker = require("../controllers/user/updateWorkingStatusOfWorker");

routes.route("/test").get(async(req, res)=>{
    res.send("working");
})

routes.route("/verify/:userId/:verificationToken").get(userVerify);
routes.route("/signup").post(userSignUp);
routes.route("/getprofile").get(verifyAccessToken,getProfileDetails)
routes.route("/updateprofile").put(verifyAccessToken,editProfileDetails);
routes.route("/login").post(userLogin);
routes.route("/update/working-status").put(verifyAccessToken, workerCheck, updateWorkingStatusOfWorker);


module.exports = routes;