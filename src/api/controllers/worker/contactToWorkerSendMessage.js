const contactWorkerModel = require("../../../models/contactWorkerModel.js");
const params = require("../../../helpers/params.json");
const send = require("../../../helpers/utils/send.js");
const userInfoModel = require("../../../models/userInfoModel.js");
const contactWorkerSendMessageTemplate = require("../../../helpers/templates/contactWorkerSendMessageTemplate");

const contactToWorkerSendMessage = async (req, res) => {
    try {
        const { workerId, message } = req.body;
        const userId = req.user._id;


        const requiredUser = await userInfoModel.findOne({ userId: userId }).populate({
            path: "userId",
            select: ["name", "email","phone"]
        })

        const requiredWorker = await userInfoModel.findOne({ userId: workerId }).populate({
            path: "userId",
            select: ["name", "email", "phone"]
        })
        console.log(requiredWorker.userType)
        if (requiredWorker.userType !== "worker") {
            res.status(401).json({
                success: false,
                error: {
                    message: "Check Your URL once, not worker found with given Id"
                }
            })
        }

        const requiredMessage = await contactWorkerModel.create({
            userId,
            workerId,
            message
        })

        const subject = `Enquiry from ${requiredUser.userId.name}`;
        const body = contactWorkerSendMessageTemplate(requiredWorker.userId.name,
            requiredUser.userId.name,
            requiredUser.userId.phone,
            requiredUser.userId.email,
            message,
            requiredUser.address,
        );

        await send({ email: requiredWorker.userId.email, name: requiredWorker.userId.name }, subject, body);

        if (requiredMessage) {
            res.status(200).json({ success: true, result: { requiredMessage, message: "Message Sent SuccessFully" } })
        }
        else {
            throw Error(params.message.error.common);
        }


    } catch (err) {
        console.log(err);
        if (err.kind === "ObjectId") {
            res.status(500).json({ success: false, error: { message: "Check Your URL once, not worker found with given Id" } });
        }
        else {
            res.status(500).json({ success: false, error: { message: params.message.error.common } });
        }

    }
}

module.exports = contactToWorkerSendMessage;