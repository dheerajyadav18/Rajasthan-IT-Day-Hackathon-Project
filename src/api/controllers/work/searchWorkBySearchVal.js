const workModel = require("../../../models/workModel");
const validate = require("../../../helpers/utils/validate.js");

const searchWorkBySearchVal = async (req, res) => {
  try {
    const searchVal = req.query.searchVal;
    console.log(searchVal);
    const requiredWork = await workModel.find({
      $or: [
        { workCity: { $regex: searchVal, $options: "i" } },
        { workState: { $regex: searchVal, $options: "i" } },
      ],
    }).select(["workCity","workState"]);

    // console.log(requiredWork);
    let uniqueData = new Map();
    requiredWork.forEach((el)=>{
        uniqueData.set(el.workCity,el)
    })
    let convertMap = [];
    for (const [key, value] of uniqueData.entries()) {
        convertMap.push(value);
    }
    console.log(convertMap);
    res.status(200).json({
      success: true,
      result: {
        requiredWork:convertMap
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: {
        message: err?.message ? err.message : params.message.error.server,
      },
    });
  }
};
module.exports = searchWorkBySearchVal;
