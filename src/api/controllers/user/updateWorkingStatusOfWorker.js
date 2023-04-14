const userInfoModel = require("../../../models/userInfoModel.js");
const params = require("../../../helpers/params.json");

const updateWorkingStatusOfWorker = async(req, res) =>{
    try{
        const userId = req.user._id;
        const wrkngStatus = req.body.workingStatus;

        const requiredAccount = await userInfoModel.findOne({userId});

        if(!requiredAccount.profileCompletedStatus){
            return res.status(401).json({
                success:false, 
                error:{
                    message:"Complete your profile in order to be visible."
                }
            })
        }


        const updatedWorkingStatus = await userInfoModel.findOneAndUpdate({userId}, {$set:{
            workingStatus:wrkngStatus
        }});

        if(updatedWorkingStatus){
            res.status(200).json({success:true, result: {message:"Updated SuccessFully"}});
        }
        else{
            res.status(500).json({success:false, error:{
                message:err.message ? err.message : params.message.error.common
            }})
        }
    }catch(err){
        res.status(500).json({success:false, error:{
            message:err.message ? err.message : params.message.error.common
        }})
    }
}

module.exports = updateWorkingStatusOfWorker;