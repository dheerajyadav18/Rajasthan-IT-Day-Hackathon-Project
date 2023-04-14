
const makeProposalModel = require("../../../models/makeProposalModel");
const paymentModel = require("../../../models/paymentModel");

const getAllApprovedProposalByworkId = async(req, res)=>{
    try{
        const userId = req.user._id;
        const workId = req.params.workId;
        const requiredPayments = await paymentModel.find({workId});

        res.status(200).json({
            success:true,
            result:{
                requiredPayments
            }
        })
    }catch(err){
        res.status(500).json({
            success:false,
            error:{
                message:params.message.error.common
            }
        })
    }
}

module.exports = getAllApprovedProposalByworkId;