const params = require("../../../helpers/params.json")
const userInfoModel = require("../../../models/userInfoModel");

const getProfileDetails = async(req,res) => {
    try{
        console.log("hello");
        const userId = req.user._id;
        const requiredDetails = await userInfoModel.findOne({userId}).populate({
            path:"userId",
            select:["name","email","phone","userType"]
        });
        res.status(200).json({success:true,result:{profile:requiredDetails}})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,error:{message:params.message.error.common}})
    }
}
module.exports = getProfileDetails;