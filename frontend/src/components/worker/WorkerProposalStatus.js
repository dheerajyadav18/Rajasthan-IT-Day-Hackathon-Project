import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstanceWithHeader } from "../../axois/index";
import { alert_show } from "../../store/action";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const WorkerProposalStatus = () => {
  const params = useParams();
  const [proposals, setProposals] = useState([]);
  const dispatch = useDispatch();
  const select = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (
      select &&
      select.isLoggedIn &&
      select.userDetails.userType === "worker"
    ) {
      axiosInstanceWithHeader
        .get(`/api/v1/worker/proposals/${select.userDetails._id}`)
        .then((res) => {
          if (res.status === 200) {
            setProposals([]);
            res.data.result.forEach((element) => {
              setProposals((prev) => {
                return [...prev, element];
              });
            });
            console.log("hello", res, proposals);
          } else {
            throw Error("Some Unknown ErrorOccured");
          }
        })
        .catch((err) => {
          console.log(err.response);
          if (err) {
            dispatch(
              alert_show({
                type: "error",
                message: "some errror occured",
              })
            );
          } else {
            dispatch(
              alert_show({
                type: "error",
                message: "Some Unknown ErrorOccured",
              })
            );
          }
        });
    }
  }, []);
  const rejectProposal = (proposalId) => {
    console.log(proposalId);
    axiosInstanceWithHeader
      .put(`/api/v1/worker/rejectproposal/${proposalId}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            alert_show({
              message: "proposal rejected",
            })
          );
        } else {
          throw Error("Some Unknown ErrorOccured");
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err) {
          dispatch(
            alert_show({
              type: "error",
              message: "some errror occured",
            })
          );
        } else {
          dispatch(
            alert_show({
              type: "error",
              message: "Some Unknown ErrorOccured",
            })
          );
        }
      });
  };
  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto mt-12 bg-white rounded-xl p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-medium">Worker Proposal Status : </h2>
          <h4 className="text-xl">{select.userDetails.name}</h4>
        </div>
      </div>
      {select &&
        select.isLoggedIn &&
        select.userDetails.userType === "worker" && (
          <div>
            {proposals &&
              proposals.length > 0 &&
              proposals.map((el, index) => {
                return (
                  <div>
                    <div className="w-[80%] flex mx-auto mt-5 justify-between">
                      <div className="w-[70%]">
                        <div className="w-full rounded-xl  mb-8 shadow-md shadow-gray-300 bg-white p-8">
                          <div className="flex justify-between align-center gap-2">
                            <h1 className="text-md fontmedium font-bold">
                              {el.workId.workHeading}
                            </h1>

                            {el.proposalStatus === "approved" && (
                              <button className="bg-[#41f747] p-2 pl-6 pr-6 rounded-md">
                                Approved
                              </button>
                            )}
                          </div>
                          <div className="mt-2">
                            <div className="flex">
                              <h4 className="text-md font-semibold w-max">
                                Budget :
                              </h4>
                              <div className="flex">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span> {el.workId.payRange}</span>
                              </div>
                            </div>
                            <div className="flex">
                              <h4 className="text-md font-semibold w-max">
                                Location :{" "}
                              </h4>
                              <span>
                                {el.workId?.workCity ? el.workId.workCity : ""},
                                {el.workId?.workState
                                  ? el.workId.workState
                                  : ""}
                              </span>
                            </div>
                          </div>
                          <div className="pt-2 pb-2">
                            <p className="border p-4 rounded-xl">
                              {el.workId?.workDescription
                                ? el.workId.workDescription
                                : "-"}
                            </p>
                          </div>
                          <div className="pl-4 pr-4 pb-2 pt-2">
                            <div className="flex gap-1">
                              {/* {
                (work?.workTags && work.workTags.length > 0) && work.workTags.map((el, index) => {
                  return <span key={index} className='text-sm text-[#1976d2] font-semibold cursor-pointer hover:bg-[#1976d2] hover:text-white'>#{el}</span>
                })
              } */}
                            </div>
                          </div>
                          <div className="flex gap-4 pt-4 font-[500]">
                            {el.proposalStatus === "pending" && (
                              <button className="bg-[#ff3c3c] p-2 pl-6 pr-6 rounded-md flex gap-2">
                                <h6>Pending</h6>
                              </button>
                            )}
                            {el.proposalStatus === "approved" && (
                              <div className="flex gap-4">
                                <button
                                  className="bg-[#ff3c3c] p-2 pl-6 pr-6 rounded-md flex gap-2"
                                  onClick={() => {
                                    rejectProposal(el._id);
                                  }}
                                >
                                  <h6>Reject</h6>
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 border-t pt-2">
                            {/* <button className="text-[#1976d2] text-sm hover:underline w-max transition-all ease-in-out transition-300 font-[500]">
                              View Proposals
                            </button> */}
                          </div>
                        </div>
                      </div>
                      <div className="w-[28%] overflow-x-hidden"></div>
                    </div>
                  </div>
                );
              })}{" "}
          </div>
        )}
      {select &&
        select.isLoggedIn &&
        select.userDetails.userType === "user" && (
          <h1 className="bg-white p-[15rem]">Only Access for the worker</h1>
        )}
    </div>
  );
};

export default WorkerProposalStatus;
