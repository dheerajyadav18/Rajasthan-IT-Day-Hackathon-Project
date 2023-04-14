const userCheck = require("../../helpers/utils/userCheck");
const verifyAccessToken = require("../../helpers/utils/verifyAccessToken");
const getPaymentDetailByProposalId = require("../controllers/workProposal/getPaymentDetailByProposalId");
const makePayment = require("../controllers/payment/makePayment")
const routes = require("express").Router()

routes.route("/pay").post(verifyAccessToken, userCheck, makePayment)

routes.route("/getPaymentDetailByProposalId/:proposalId").get(verifyAccessToken, userCheck, getPaymentDetailByProposalId)

module.exports = routes;