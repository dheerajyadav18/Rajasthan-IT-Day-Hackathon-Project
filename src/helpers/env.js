// env configuration
const dotenv = require("dotenv");
dotenv.config();


// env variable
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const SALT_ROUND = process.env.SALT_ROUND;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const API_URL = process.env.API_URL;
const EMAIL_ON = process.env.EMAIL_ON;
const SECRET_KEY = process.env.SECRET_KEY;


// export
module.exports = {
    PORT,
    DB_URL,
    SALT_ROUND,
    MAIL_USER,
    MAIL_PASSWORD,
    API_URL,
    EMAIL_ON,
    SECRET_KEY,
  };