const routes = require("express").Router();
const userCheck = require("../../helpers/utils/userCheck.js");
const workerCheck = require("../../helpers/utils/workerCheck");
const verifyAccessToken = require("../../helpers/utils/verifyAccessToken.js");
const { workerProposal, proposalRejected, proposalApproved } = require("../controllers/worker/workerProposals.js");
const contactToWorkerSendMessage = require("../controllers/worker/contactToWorkerSendMessage");
const getAllMessageOfLogInWorker = require("../controllers/worker/getAllMessageOfLogInWorker");
const getWorkerContactDetails = require("../controllers/worker/getWorkerContactDetails")

routes.route("/proposals/:workerId").get(verifyAccessToken, workerProposal);
routes.route("/rejectproposal/:proposalId").put(verifyAccessToken, proposalRejected);
routes.route("/approveproposal/:proposalId").put(verifyAccessToken,userCheck,proposalApproved);
routes.route("/contact-worker-send-message" ).post(verifyAccessToken, userCheck, contactToWorkerSendMessage);
routes.route("/approveproposal/:proposalId").put(verifyAccessToken, userCheck, proposalApproved);
routes.route("/contact-worker-send-message").post(verifyAccessToken, userCheck, contactToWorkerSendMessage);
routes.route("/getAllMessageOfLogInWorker").get(verifyAccessToken, workerCheck, getAllMessageOfLogInWorker)
routes.route("/getworkerdetails/:workerId").get(verifyAccessToken, userCheck, getWorkerContactDetails);


module.exports = routes;