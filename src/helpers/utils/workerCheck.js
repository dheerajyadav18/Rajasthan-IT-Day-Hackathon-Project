const params = require("../params.json");

const workerCheck = async(req,res,next)=>{
    try{
        if(req.user.userType === "worker"){
            next();
        }
        else{
            res.status(400).json({success:false,error:{message:"This operation is only allowed for workers."}})
        }
    }   
    catch(err){
        res.status(500).json({success:false,error:{message:params.message.error.common}})
    }
}
module.exports=workerCheck;