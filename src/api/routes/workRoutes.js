const { postWork , updateWork } = require("../controllers/work/postWork.js");
const { proposeWork } = require("../controllers/workProposal/proposeWork.js");
const verifyAccessToken = require("../../helpers/utils/verifyAccessToken")
const workerCheck = require("../../helpers/utils/workerCheck");
const searchWorkBySearchVal = require("../controllers/work/searchWorkBySearchVal.js")
const userCheck = require("../../helpers/utils/userCheck");
const searchWorkByCityAndState = require("../controllers/work/searchWorkByCityAndState.js")
const routes= require("express").Router()
const getAllWorks = require("../controllers/work/getAllWorks.js");
const getWorkWithProposal = require("../controllers/work/getWorkWithProposal");
const getAllWorkOfLoginUser= require("../controllers/workProposal/getAllWorkOfLoginUser.js");
const getProposalsByWorkId = require("../controllers/workProposal/getProposalsByWorkId");
const getAllApprovedProposalByworkId = require("../controllers/workProposal/getAllApprovedProposalByworkId.js");
const updateWorkCompletedStatus = require("../controllers/work/updateWorkCompletedStatus")

routes.route("/post").post(verifyAccessToken, userCheck, postWork);
routes.route("/update").put(verifyAccessToken, userCheck, updateWork);
routes.route("/make-proposal/:workId").post(verifyAccessToken, workerCheck, proposeWork);
routes.route("/explore/getAll").get(getAllWorks)
routes.route("/searchwork-searchval").get(verifyAccessToken,workerCheck,searchWorkBySearchVal);
routes.route("/searchwork-city-state").get(verifyAccessToken,workerCheck,searchWorkByCityAndState);
routes.route("/get-all-work-of-loginuser").get(verifyAccessToken,userCheck,getAllWorkOfLoginUser);
routes.route("/get-proposals-by-workId/:workId").get(verifyAccessToken,userCheck,getProposalsByWorkId);
routes.route("/getWorkwithProposal/:workId").get(verifyAccessToken,  getWorkWithProposal);
routes.route("/getAllApprovedProposalByworkId/:workId").get(verifyAccessToken, userCheck, getAllApprovedProposalByworkId);

routes.route("/updateWorkCompletedStatus/:workId").get(verifyAccessToken, userCheck, updateWorkCompletedStatus);

module.exports = routes;