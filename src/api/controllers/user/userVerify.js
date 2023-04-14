const userModel = require("../../../models/userModel.js");
const userVerificationModel = require("../../../models/userVerificationModel.js");

const userVerify = async(req,res) => {
    try{
        const userId = req.params.userId;
        const verificationToken = req.params.verificationToken;
        if(userId && verificationToken){
            const requiredUserToken = await userVerificationModel.findOne({userId , verificationToken});
            if(requiredUserToken){
                await userModel.findByIdAndUpdate(userId,{verified:true});
                await userVerificationModel.deleteOne({userId});
                res.send("your account is verified ,  <a href='http://localhost:3000'>LogIn</a> ")
            }
            else{
                res.send("verification link is inCorrenct")
            }
        }
        else{
            res.send("Verification token not found")
        }
    }
    catch(err){
        res.send("some error occures Please check again")
    }
}

module.exports = userVerify;