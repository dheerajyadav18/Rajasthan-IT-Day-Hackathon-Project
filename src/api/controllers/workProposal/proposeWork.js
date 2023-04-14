const makeProposalModel = require("../../../models/makeProposalModel.js");
const params = require("../../../helpers/params.json");

const proposeWork = async (req, res) => {
  try {
    const workerId = req.user._id;
    const { workId } = req.params;
    const { workDescription, workPay } = req.body;
    const alreadyProposed = await makeProposalModel.findOne({ workId, workerId });
    if (alreadyProposed) {
      await makeProposalModel.updateOne({ workerId, workId }, {
        $set: {
          proposalPay: workPay,
          proposalDescription: workDescription
        }
      })
    }
    else {
      await makeProposalModel.create({
        workId,
        workerId,
        proposalDescription: workDescription,
        proposalPay: workPay
      })
    }
    res.status(200).json({ success: true, result: { message: "Proposal Added SuccessFully" } });


  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error: { message: params.message.error.server } });
  }
};

module.exports = { proposeWork };
