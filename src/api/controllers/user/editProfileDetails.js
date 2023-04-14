const editUserProfileDetails = require("./editUserProfileDetails");
const editWorkerProfileDetails = require("./editWorkerProfileDetails");


const editProfileDetails = async(req,res) => {
    if(req.user.userType === "user"){
        editUserProfileDetails(req,res);
    }
    else{
        editWorkerProfileDetails(req,res);
    }
}
module.exports = editProfileDetails;