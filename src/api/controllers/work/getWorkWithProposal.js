const params = require("../../../helpers/params.json");
const workModel = require("../../../models/workModel");
const makeProposalModel = require("../../../models/makeProposalModel");

const getWorkWithProposal = async (req, res) => {
    try {
        const workId = req.params.workId;
        if (workId) {
            const requiredWork = await workModel.findById(workId);

            const allRequiredProposal = await makeProposalModel.find({ workId }).populate({
                path: "workerId",
                select: ["name"]
            });

            res.status(200).json({ success: true, result: { requiredWork, allRequiredProposal } });
        }
        else {
            res.status(404).json({ success: false, error: { message: "WorkId not found" } });
        }

    } catch (err) {
        if (err.kind === "ObjectId") {
            res.status(500).json({ success: false, error: { message: "No work find with given workId check your url." } });
        }
        else {
            res.status(500).json({ success: false, error: { message: params.message.error.common } });
        }
    }
}

module.exports = getWorkWithProposal;