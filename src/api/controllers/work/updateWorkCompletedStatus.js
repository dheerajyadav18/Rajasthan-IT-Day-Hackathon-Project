const paymentModel = require("../../../models/paymentModel");
const workModel = require("../../../models/workModel");
const params = require("../../../helpers/params.json");
const makeProposalModel = require("../../../models/makeProposalModel");


const updateWorkCompletedStatus = async(req, res)=>{
    try{
        const workId = req.params.workId;
        const paymentLeft = await paymentModel.find({workId:workId});

        const requiredProposal = await makeProposalModel.find({workId:workId});
        if(requiredProposal.length == 0){
            return res.status(200).json({
                success:true,
                result:{
                    message:"No proposals approved for work."
                }
            })
        }
        if(paymentLeft.length > 0 ){
            return res.status(200).json({success:true, result:{
                message:"Payments are still left to complete."
            }})
        }
        else{
            await workModel.findByIdAndUpdate(workId,{
                $set:{
                    workCompletedStatus:true
                }
            });
            return res.status(200).json({success:true, result:{
                message:"Work is completed."
            }})
        }
    }catch(err){
        res.status(500).json({
            success:false,
            error:{
                message:params.message.error.common
            }
        })
    }
}

module.exports = updateWorkCompletedStatus