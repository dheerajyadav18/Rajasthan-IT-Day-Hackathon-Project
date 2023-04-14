const userModel = require("../../../models/userModel.js");
const params = require("../../../helpers/params.json");
const send = require("../../../helpers/utils/send.js");
const { API_URL ,SALT_ROUND} = require("../../../helpers/env.js");
const validate = require("../../../helpers/utils/validate.js");
const crypto = require("crypto");
const userVerificationModel = require("../../../models/userVerificationModel.js");
const verificationLinkTemplate = require("../../../helpers/templates/verificationLinkTemplate");
const bcrypt = require("bcrypt");
const  userInfomodel  = require("../../../models/userInfoModel.js");

const userSignUp = async (req, res) => {
  try {
    const { name, email, phone, password, userType } = req.body;
    // validate data
    const rules = [
      {
        check: "isNotEmpty",
        value: name,
        message: "Name should Not be empty.",
      },
      {
        check: "isEmail",
        value: email,
        message: "Email is not valid.",
      },
      {
        check: "isMobileNumber",
        value: phone,
        message: "Moblie Number should be of 10 numeric digits.",
      },
      {
        check: "passWordCheck",
        value: password,
        message: "Passwork should contain one numeric, one capital, one small letter.",
      },
    ];

    // validating upcoming data
    try {
      validate(rules);
    } catch (err) {
      return res
        .status(403)
        .json({ success: false, error: { message: err.message } });
    }

    // unique email check
    const haveUserwithEmail = await userModel.findOne({ email });
    if (haveUserwithEmail) {
      return res.status(409).json({
        success: false,
        error: {
          message: params.message.error.emailAlreadyExist,
        },
      });
    }

    // mobile number unique check
    const haveUserwithMobileNumber = await userModel.findOne({ phone });
    if (haveUserwithMobileNumber) {
      return res.status(409).json({
        success: false,
        error: { message: params.message.error.mobileNumberAlreadyExist },
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(parseInt(SALT_ROUND));
    const hashPassword = await bcrypt.hash(password, salt);

    // saving user in database
    const registeredUser = await userModel.create({
      name,
      email,
      phone,
      password: hashPassword,
      userType,
      verified:true
    });


    // creating userInfo model 
    await userInfomodel.create({
      userId:registeredUser._id,
      location:"",
      address:"",
      city:"",
      state:"",
      summary:"",
      pincode:"",
      workPriorities:"",
      workingDistance:0,
      userType,
      profileCompletedStatus:false,
    })

    // generate verification token and save
    const verificationToken = await crypto.randomBytes(32).toString("hex");
    const requiredToken = await userVerificationModel.create({
      userId: registeredUser._id,
      verificationToken,
    });

    // send mail
    const subject = `Verify Your ${params.project.name} account`;
    const body = verificationLinkTemplate(
      `${API_URL}/api/v1/user/verify/${registeredUser._id}/${verificationToken}`
    );
    await send({ email: email, name: name }, subject, body);

    // success response
    res.status(200).json({
      success: true,
      result: {
        message: params.message.success.signup,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        message: `${err?.message ? err.message : params.message.error.server}`,
      },
    });
  }
};

module.exports = userSignUp;
