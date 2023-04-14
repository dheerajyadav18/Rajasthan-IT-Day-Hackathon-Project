const paymentModel = require("../../../models/paymentModel.js");

const getPaymentDetailByProposalId = async(req, res)=>{
    try{

        const proposaId = req.params.proposaId;

        const requiredPaymentDetail = await paymentModel.findOne({proposalId:proposaId});

        return res.status(200).json({
            success:true,
            result:{
                requiredPaymentDetail
            }
        })



    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            error:{
                message:params.message.error.common
            }
        })
    }
}

module.exports = getPaymentDetailByProposalId