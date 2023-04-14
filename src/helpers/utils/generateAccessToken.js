const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../env.js");

const generateAccessToken = async (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
  };
  return jwt.sign(payload, SECRET_KEY);
};

module.exports = generateAccessToken;
