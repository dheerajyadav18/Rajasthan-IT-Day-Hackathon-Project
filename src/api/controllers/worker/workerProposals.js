const makeProposalModel = require("../../../models/makeProposalModel");
const params = require("../../../helpers/params.json");
const workModel = require("../../../models/workModel");
const verificationLinkTemplate = require("../../../helpers/templates/verificationLinkTemplate");
const send = require("../../../helpers/utils/send");
const proposalRejectionTemplate = require("../../../helpers/templates/proposalRejectionTemplate");
const paymentModel = require("../../../models/paymentModel.js");
const workerProposal = async (req, res) => {
  try {
    const workerId = req.params.workerId;
    console.log(req.params);
    const proposals = await makeProposalModel
      .find({ workerId: workerId })
      .populate({
        path: "workId",
        select: {
          workHeading: 1,
          workDescription: 1,
          workAddress: 1,
          workCity: 1,
          workState: 1,
          payRange: 1,
        },
      });
    console.log("hello");
    res.status(200).json({ success: true, result: proposals });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: params.message.error.common });
  }
};

const proposalRejected = async (req, res) => {
  console.log(req.params);
  try {
    console.log("hello");

    const rejectpropose = await makeProposalModel.findOneAndUpdate(
      { _id: req.params.proposalId },
      {
        $set: {
          proposalStatus: "pending",
        },
      }
    );
    // console.log(rejectpropose);
    const updatework = await workModel.findOneAndUpdate(
      {
        "workProposalAccepted.proposalId": req.params.proposalId,
        _id: rejectpropose.workId,
      },
        {
          $set: {
            "workProposalAccepted.$.got": false,
            "workProposalAccepted.$.proposalId": null,
          },
        }
    );
    const deleteProposal = await paymentModel.findOneAndDelete({proposalId:req.params.proposalId});
    console.log(deleteProposal);
    const user = req.user;
    const subject = `Your proposal got Rejected`;
      const body = proposalRejectionTemplate(
          user.name,
          updatework.workHeading
          
      );
      await send(
        {
          email: req.user.email,
          name: req.user.name,
        },
        subject,
        body
      );
    console.log(updatework);
    res.status(200).json({ success: true, result: "work proposal rejected" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, messsage: params.message.error.common });
  }
};

const proposalApproved = async (req, res) => {
  try {

    const proposalId = req.params.proposalId;
    const requiredProposal = await makeProposalModel
      .findById(proposalId)
      .populate({
        path: "workId",
        select: ["userId"],
      })
      .populate({
        path: "workerId",
        select: ["name", "email"],
      });
    if (String(requiredProposal.workId.userId) === String(req.user._id)) {
      await makeProposalModel.findByIdAndUpdate(proposalId, {
        proposalStatus: "approved",
      });
     const worker =  await workModel.findByIdAndUpdate(requiredProposal.workId, 
        {$push:{workProposalAccepted:{got:true, proposalId}}}
      );
      
      const addPayment = await paymentModel.create({proposalId:proposalId,workId:requiredProposal.workId,amount:requiredProposal.proposalPay});
     console.log(addPayment);
      const user = req.user;
      const workerName = requiredProposal.workerId.name;
      const subject = `Your proposal got accepted`;
      const body = verificationLinkTemplate(workerName,user.phone,worker.workHeading,worker.workLocation);
      await send(
        {
          email: requiredProposal.workerId.email,
          name: requiredProposal.workerId.name,
        },
        subject,
        body
      );
      res.status(200).json({
        success: true,
        result: { message: "Proposal approved for this work." },
      });
    } else {
      res.status(401).json({
        success: false,
        result: { message: "you are allow to approve for your work only. " },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: { messsage: params.message.error.common },
    });
  }
};

module.exports = { workerProposal, proposalRejected, proposalApproved };
