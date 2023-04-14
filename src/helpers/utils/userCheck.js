const params = require("../params.json");

const userCheck = async(req,res,next)=>{
    try{
        if(req.user.userType === "user"){
            next();
        }
        else{
            res.status(400).json({success:false,error:{message:"This operation is only allowed for users."}})
        }
    }   
    catch(err){
        res.status(500).json({success:false,error:{message:params.message.error.common}})
    }
}
module.exports=userCheck;