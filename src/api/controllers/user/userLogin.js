const userModel = require("../../../models/userModel.js");
const params = require("../../../helpers/params.json");
const bcrypt = require("bcrypt");
const userVerificationModel = require("../../../models/userVerificationModel.js");
const send = require("../../../helpers/utils/send.js");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, API_URL } = require("../../../helpers/env.js");
const verificationLinkTemplate = require("../../../helpers/templates/verificationLinkTemplate.js");


const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    if (!email || !password)
      return res
        .status(404)
        .json({ success: false, message: params.message.error.common });
    else {
      const userFound = await userModel.findOne({ email });
      if (!userFound) {
        return res
          .status(404)
          .json({ success: true, message: params.message.error.userNOtFound });
      } else {
        const authenticate = await bcrypt.compare(password, userFound.password);
        if (!authenticate)
          return res.status(400).json({
            success: false,
            message: params.message.error.passwordDoNotMatch,
          });
        else {
          if (!userFound.verified) {
            const user = await userVerificationModel.findOne({
              userId: userFound._id,
            });

            const subject = `Verify Your ${params.project.name} account`;
            const body = verificationLinkTemplate(
              `${API_URL}/api/v1/user/verify/${userFound._id}/${user.verificationToken}`
            );

            await send(
              { email: userFound.email, name: userFound.name },
              subject,
              body
            );
            res.status(201).json({
              success: false,
              message: params.message.error.firstVerifyYourAccount,
            });
          } else {
            const payload = {
              id: userFound._id,
              email: userFound.email,
              name: userFound.name,
            };
            const token = await jwt.sign({ ...payload }, SECRET_KEY);
            res.status(200).json({
              success: true,
              result: { user: userFound, token: token },
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: params.message.error.common });
  }
};
module.exports = userLogin;
