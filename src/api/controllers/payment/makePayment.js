const paymentModel = require("../../../models/paymentModel");
const params = require("../../../helpers/params.json"); 


const makePayment = async(req,res)=>{
    try{
        console.log(req.body)
        const userId = req.user._id;

        let {workId, proposalId, amount} = req.body;
        amount = parseInt(amount)
        const requiredPayment = await paymentModel.findOne({workId, proposalId});
        if(!requiredPayment){
            return res.status(404).json({
                success:false,
                error:{
                    message:"payment detail is not available for this user"
                }
            })
        }
        console.log(requiredPayment);
        if(requiredPayment.amount < amount){
            return res.status(401).json({
                success:false, 
                error:{
                    message:"Once check the amount, amount you paid is higher"
                }
            })
        }

        const amountLeft = requiredPayment.amount - amount;


        
       if(amountLeft > 0){
        await paymentModel.findOneAndUpdate({workId, proposalId}, {
            $set:{
                amount:amountLeft
            }
        })
       }
       else{
        await paymentModel.findOneAndDelete({workId, proposalId});
       }
        
        return res.status(200).json({
            success:true,
            result:{
                message:"Payment updated Successfully"
            }
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            error:{
                message:params.message.error.common
            }
        })

    }
}

module.exports = makePayment;
