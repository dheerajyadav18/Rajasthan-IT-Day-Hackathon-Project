const workModel = require("../../../models/workModel.js");
const params = require("../../../helpers/params.json");
const validate = require("../../../helpers/utils/validate");
const userInfoModel = require("../../../models/userInfoModel.js");

const postWork = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user._id;
    const { workHeading, workDescription, workState, workCity, workAddress, workTime, payRange, workLocation, workTags } = req.body;
    if (!workLocation || !workLocation.latitude || !workLocation.longitude) {
      return res.json(403).json({ success: false, error: { message: "Loation is required." } });
    }
    const rules = [
      {
        check: "isNotEmpty",
        value: workHeading,
        message: "WorkHeading should Not be empty.",
      },
      {
        check: "isNotEmpty",
        value: workDescription,
        message: "Work description should Not be empty.",
      },

      {
        check: "isNotEmpty",
        value: payRange,
        message: "payRange should Not be empty.",
      },
      {
        check: "isNotEmpty",
        value: workTime,
        message: "workTime should Not be empty.",
      },
      {
        check: "isNotEmpty",
        value: workAddress,
        message: "workAddress should Not be empty.",
      },
      {
        check: "isNotEmpty",
        value: workState,
        message: "workState should Not be empty.",
      },
      {
        check: "isNotEmpty",
        value: workCity,
        message: "workCity should Not be empty.",
      },
    ]

    try {
      validate(rules);
    } catch (err) {
      return res
        .status(403)
        .json({ success: false, error: { message: err.message } });
    }

    const requiredAccount = await userInfoModel.findOne({userId:userId});
    if(!requiredAccount.profileCompletedStatus){
      return res.status(401).json({
        success:false,
        error:{
          message:"In order to post work you need to complete your profile"
        }
      })
    }

    const workTagsArray = workTags ? workTags.split(",") : [];
    const userWork = await workModel.create({
      userId,
      workHeading,
      workAddress,
      workDescription, 
      workCity,
      workState,
      workTags:workTagsArray,
      payRange,
      workTime,
      workLocation,
    });
    console.log(userWork);
    res.status(200).json({
      success: true,
      result: { message: params.message.success.workPosted, work: userWork },
    });

  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, error:{message: params.message.error.server} });
  }
};



const updateWork = async (req, res) => {
  console.log("hello");
  try {
    console.log(req.body);
    const userWork = await workModel.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: true,
      }
    );
    res.status(200).json({
      success: true,
      result: { message: params.message.success.workUpdated, work: userWork },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: true, error:{message: params.message.error.server} });
  }
};
module.exports = { postWork, updateWork };
