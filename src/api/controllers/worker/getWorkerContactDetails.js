const userInfoModel = require("../../../models/userInfoModel");
const params = require("../../../helpers/params.json");

const getWorkerContactDetails = async(req,res) =>{
    try{
        const userId = req.params.workerId;
        console.log(userId)
        const requiredDetails = await userInfoModel.findOne({userId:userId}).populate({
            path: "userId",
            select: ["name", "email","phone"]
        });
        console.log(requiredDetails)
        if(requiredDetails.workingStatus === true){
            console.log(requiredDetails)
            res.status(200).json({success:true,result:{workerDetails:requiredDetails}})
        }
        else{
            res.status(401).json({success:true,result:{message:"This worker is not available at that moment."}})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,error:{message:params.message.error.common}})
    }
}
module.exports = getWorkerContactDetails;