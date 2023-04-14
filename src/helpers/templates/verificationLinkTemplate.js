const API_URL = require("../env.js");

const verificationLinkTemplate = (link) => {
  return `<p>
    Thankyou for the registering on Shram Saathi, An Empowering Labour Solutions pvt ltd !!!.<br />
    Link to activate your account 
    <a href='${link}'>Activate</a>
    </p>`;
};

module.exports = verificationLinkTemplate;
