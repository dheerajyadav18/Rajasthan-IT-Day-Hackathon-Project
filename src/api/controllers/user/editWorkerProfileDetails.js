const userInfoModel = require("../../../models/userInfoModel")
const userModel = require("../../../models/userModel");
const validate = require("../../../helpers/utils/validate.js");

const editWorkerProfileDetails = async (req, res) => {
    const userId = req.user._id;
    try {
        const { name, phone, address, state, city, location, pincode, workingDistance, workPriorities, summary } = req.body;
        const rules = [
            {
                check: "isNotEmpty",
                value: name,
                message: "Name should not be empty.",
            },
            {
                check: "isNotEmpty",
                value: address,
                message: "Address should not be empty.",
            },
            {
                check: "isNotEmpty",
                value: state,
                message: "State should not be empty.",
            },
            {
                check: "isMobileNumber",
                value: phone,
                message: "Phone number should not be empty.",
            },
            {
                check: "isNotEmpty",
                value: city,
                message: "City should not be empty.",
            },
            {
                check: "isNotEmpty",
                value: location,
                message: "Location should not be empty.",
            },
            {
                check: "isNotEmpty",
                value: pincode,
                message: "Pincode should not be empty.",
            },
            {
                check: "isNotEmpty",
                value: workingDistance,
                message: "Working Distance should not be empty.",
            },
            {
                check: "isNotEmpty",
                value: summary,
                message: "Summary should not be empty.",
            },

        ];
        try {
            validate(rules);
        } catch (err) {
            return res
                .status(403)
                .json({ success: false, error: { message: err.message } });
        }
        const userDetails = await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
        })
        const userInfoDetails = await userInfoModel.findOneAndUpdate({ userId: userId }, {
            $set: {
                summary,
                location,
                city,
                state,
                address,
                pincode,
                workPriorities: workPriorities ? workPriorities.split(",") : [],
                workingDistance,
                profileCompletedStatus: true,
            }
        })
        res.status(200).json({
            success: true,
            result: {
                message: "Your details are updated successfully"
            },
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: "false",
            error: {
                message: err?.message ? err.message : params.message.error.server,
            },
        });
    }
};
module.exports = editWorkerProfileDetails;
