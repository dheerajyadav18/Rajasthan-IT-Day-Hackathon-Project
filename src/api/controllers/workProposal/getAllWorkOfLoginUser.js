const params = require("../../../helpers/params.json")
const workModel = require("../../../models/workModel");

const getAllWorkOfLoginUser = async(req,res) => {
    try{
        console.log(req.user)
        const userId = req.user._id;
        
        const requiredDetails = await workModel.find({userId:userId}).select(["workHeading" ,"workTime" ])
        res.status(200).json({success:true,result:{works:requiredDetails}})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,error:{message:params.message.error.common}})
    }
}
module.exports = getAllWorkOfLoginUser;