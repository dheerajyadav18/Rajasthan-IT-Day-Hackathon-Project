const userInfoModel = require("../../../models/userInfoModel.js");
const params = require("../../../helpers/params.json")


const searchCityState = async (req, res) => {
  try {
    const worker = await userInfoModel.find({
      $or: [
        { state: { $regex: req.query.state, $options: "i" } },
        { city: { $regex: req.query.city, $options: "i" } },
      ]
      
    }).select({ state: 1, city: 1, workingStatus:1 });

    const mapOfRequiredWorker = new Map();
    
    console.log(worker)
    worker.forEach((el, index) => {
      
      if(el.workingStatus)
        mapOfRequiredWorker.set(el.city, el);
    })
    let requiredWorker = [];
    for (const [key, value] of mapOfRequiredWorker.entries()) {
      requiredWorker.push(value);
    }

    res.status(200).json({ success: true, result: requiredWorker });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: params.message.error.common } });
  }
};

const searchWorker = async (req, res) => {
  try {
    const worker = await userInfoModel.find({
      $and: [
        { state: req.query.state },
        { city: req.query.city },

        {
          workingStatus: true,
        },
        {
          userType: "worker"
        }
      ],
    }).populate({
      path: 'userId',
      select: ["name"]
    });

    res.status(200).json({ success: true, result: worker });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: params.message.error.common } });
  }
};
module.exports = { searchWorker, searchCityState };
