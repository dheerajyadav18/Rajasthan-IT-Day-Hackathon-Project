const contactWorkerModel = require("../../../models/contactWorkerModel.js");
const params = require("../../../helpers/params.json");
const getAllMessageOfLogInWorker = async (req, res) => {
    try {
        const workerId = req.user._id;

        const allMessages = await contactWorkerModel.find({ workerId }).populate({
            path:"userId",
            select:["name", "email", "phone", "address"]
        }).sort({ createdAt: -1 });

        res.status(200).json({
            successs: 200,
            result: {
                allMessages
            }
        })

    } catch (err) {
        res.status(500).json({
            success: "false",
            error: {
                message: params.message.error.common
            }
        })
    }
}

module.exports = getAllMessageOfLogInWorker;