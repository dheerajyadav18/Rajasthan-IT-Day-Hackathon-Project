const workModel = require("../../../models/workModel");

const searchWorkByCityAndState = async(req,res) => {
    try{
        const {workCity , workState} = req.query;
        const requiredWork = await workModel.find({
            workCity,workState,workCompletedStatus:false,
        }).select(["payRange","workHeading","workTime","userId","workCity" , "workState","workLocation"]).populate({
            path:"userId",
            select:["phone"]
        }) 
        res.status(200).json({success:true,result:{requiredWork}})

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          error: {
            message: err?.message ? err.message : params.message.error.server,
          },
        });
      }

}
module.exports = searchWorkByCityAndState;