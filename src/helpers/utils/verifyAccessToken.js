const jwt = require("jsonwebtoken");
const params = require("../params.json");
const { SECRET_KEY } = require("../env.js");
const userModel = require("../../models/userModel");

const verifyAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, SECRET_KEY, async function (err, user) {
        if (err) {
          return res.status(401).json({
            sucess: false,
            error: { message: params.message.error.tokenNotValid },
          });
        }
        const loggedInUser = await userModel.findById(user.id);
        req.user = loggedInUser;
        next();
      });
    } else {
      return res.status(401).json({
        sucess: false,
        error: { message: params.message.error.accessTokenNotFound },
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        success: false,
        error: { message: params.message.error.common },
      });
  }
};

module.exports = verifyAccessToken;
