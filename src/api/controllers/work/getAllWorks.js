const params = require("../../../helpers/params.json");
const workModel = require("../../../models/workModel");
const getAllWorks = async(req, res)=>{
    try{
        const allWorks = await workModel.find();
        res.status(200).json({success:true, result:{works:allWorks}});

    }catch(err){
        res.status(500).json({
            success:false,
            error:{
                message:params.message.error.common
            }
        })
    }
}   

module.exports = getAllWorks;