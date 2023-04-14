const makeProposalModel = require("../../../models/makeProposalModel");
const params = require("../../../helpers/params.json");
const workModel = require("../../../models/workModel");

const getProposalsByWorkId = async (req, res) => {
  const workId = req.params.workId;
  try {
    const requiredProposalDetails = await makeProposalModel
      .find({ workId })
      .populate({
        path: "workerId",
        select: ["name", "phone", "email"],
      });
    const requiredWork = await workModel
      .findById(workId)
      .select(["workProposalAccepted", "workCompletedStatus"]);
      console.log("user",requiredWork)
    res
      .status(200)
      .json({
        success: true,
        result: {
          allProposal: requiredProposalDetails,
          approvedProposoalCount: requiredWork.workProposalAccepted.length,
          workCompletedStatus: requiredWork.workCompletedStatus,
        },
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        message: {
          message: params.message.error.common,
        },
      },
    });
  }
};
module.exports = getProposalsByWorkId;
