const routes= require("express").Router();
const userCheck = require("../../helpers/utils/userCheck.js");
const verifyAccessToken = require("../../helpers/utils/verifyAccessToken.js");
const {searchWorker, searchCityState} =  require("../controllers/searchWorker/searchWorker.js");

routes.route("/worker").get( searchWorker);

routes.route("/cityandstate").get( searchCityState);

module.exports = routes;