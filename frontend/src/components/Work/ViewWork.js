import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstanceWithHeader } from "../../axois";
import { useDispatch } from "react-redux";
import { alert_show } from "../../store/action";
import ProposeWork from "./ProposeWork";
import { useTranslation } from "react-i18next";
import i18next from "i18next";


const ViewWork = () => {
  // state variable
  const {t} = useTranslation()
  const [work, setWork] = useState();
  const [allProposal, setAllProposals] = useState([]);
  //
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    console.log(params);
    axiosInstanceWithHeader
      .get(`/api/v1/work/getWorkwithProposal/${params.workId}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setWork(() => {
            return res.data.result.requiredWork;
          });
          setAllProposals(() => {
            return res.data.result.allRequiredProposal;
          });
          setLoader(false);
        } else {
          throw Error("Some Unknown ErrorOccured");
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err?.response?.data?.error?.message) {
          dispatch(
            alert_show({
              type: "error",
              message: err.response.data.error.message,
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
        setLoader(false);
        navigate("/");
      });
  }, []);

  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto mt-12 bg-white rounded-xl p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-medium">Work by : </h2>
          {loader ? (
            <h4 className="text-xl h-5 w-20 bg-bodyBackground animate-pulse"></h4>
          ) : (
            <h4 className="text-xl">Puneet</h4>
          )}
        </div>
      </div>
      <div className="w-[80%] flex mx-auto mt-5 justify-between items-stretch">
        <div className="w-[70%]">
          {
            (loader) ? <div
              className="w-full rounded-xl  mb-4 shadow-md bg-white p-8"
            >
              <div className="flex justify-between border-b">
                <div className="pb-2 rounded-t-md flex gap-2">
                  <div className="w-10 h-10 rounded-full ">
                    <div className="w-10 h-10 rounded-full bg-bodyBackground animate-pulse"></div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium w-28 h-6 bg-bodyBackground animate-pulse">

                    </h4>
                    <h6 className="text-[12px] w-16 h-4 bg-bodyBackground animate-pulse mt-2 text-gray-800 font-medium">

                    </h6>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-md font-medium w-10 h-4 animate-pulse bg-bodyBackground rounded-md">

                  </h2>
                  <button className="hover:bg-[#eeeeee] w-6 h-6 bg-bodyBackground animate-pulse rounded-full p-2 transition-all ease-in-out transition-300">
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex">
                  <h4 className="text-md font-semibold w-60 h-6 bg-bodyBackground animate-pulse mb-2"></h4>

                </div>
                <div className="flex">
                  <h4 className="text-md font-semibold w-60 h-6 bg-bodyBackground animate-pulse mb-2"></h4>
                </div>
              </div>
              <div className="pt-2 pb-2">
                <p className="border w-full h-20 bg-bodyBackground animate-pulse p-4 rounded-xl">

                </p>
              </div>
              <div className="pl-4 pr-4 pb-2 pt-2">
                <div className="flex gap-1 w-28 h-5 bg-bodyBackground animate-pulse">


                </div>
              </div>
              <div className="flex gap-4 pt-4 font-[500]">
                <button className="bg-bodyBackground animate-pulse p-2 pl-6 pr-6 rounded-md flex gap-2 w-24 h-8">

                </button>

                <button className="bg-bodyBackground animate-pulse p-2 pl-6 pr-6 rounded-md flex gap-2 w-24 h-8">

                </button>
              </div>
            </div> : <div
              className="w-full rounded-xl  mb-4 shadow-md  bg-white p-8"
            >
              <div className="flex justify-between border-b">
                <div className="pb-2 rounded-t-md flex gap-2">
                  <div className="w-10 h-10 rounded-full ">
                    <Avatar style={{ zIndex: 0 }} />
                  </div>
                  <div>
                    <h4 className="text-md font-medium">
                      {work?.workHeading ? work.workHeading : "-"}
                    </h4>
                    <h6 className="text-[12px] text-gray-800 font-medium">
                      {work?.createdAt
                        ? moment(work.createdAt).startOf("hour").fromNow()
                        : "-"}
                    </h6>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-md font-medium">
                    {allProposal.length} - Proposals
                  </h2>
                  <button className="hover:bg-[#eeeeee] rounded-full p-2 transition-all ease-in-out transition-300">
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
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex">
                  <h4 className="text-md font-semibold w-max">{t("budget")} :</h4>
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
                    <span> {work?.payRange ? work.payRange : "-"}</span>
                  </div>
                </div>
                <div className="flex">
                  <h4 className="text-md font-semibold w-max">{t("location")} : </h4>
                  <span>
                    {work?.workCity ? work.workCity : ""},
                    {work?.workState ? work.workState : ""}
                  </span>
                </div>
              </div>
              <div className="pt-2 pb-2">
                <p className="border p-4 rounded-xl">
                  {work?.workDescription ? work.workDescription : "-"}
                </p>
              </div>
              <div className="pl-4 pr-4 pb-2 pt-2">
                <div className="flex gap-1">
                  {work?.workTags &&
                    work.workTags.length > 0 &&
                    work.workTags.map((el, index) => {
                      return (
                        <span
                          key={index}
                          className="text-sm text-[#1976d2] font-semibold cursor-pointer hover:bg-[#1976d2] hover:text-white"
                        >
                          #{el}
                        </span>
                      );
                    })}
                </div>
              </div>
              <div className="flex gap-4 pt-4 font-[500]">
                <button className="bg-[#eeeeee] p-2 pl-6 pr-6 rounded-md flex gap-2">
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
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>
                  <h6>Upvote</h6>
                </button>

                <button className="bg-[#eeeeee] p-2 pl-6 pr-6 rounded-md flex gap-2">
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
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h6>Contact</h6>
                </button>
              </div>
            </div>
          }

          <div className="w-full mb-10 p-4 rounded-md ">
            <div className="">
              <div
                className="sticky -top-1 py-2 bg-bodyBackground px-4 rounded-md mb-4"
                style={{ zIndex: 100 }}
              >
                <button className="mb-5 text-[#1976d2] text-sm hover:underline w-max transition-all ease-in-out transition-300 font-[500]">
                  Proposal Made : ({allProposal.length})
                </button>
              </div>

              <div>
                {
                  (loader) ? <div className="w-full  bg-white p-4 rounded-md mb-2">
                    <div className=" border-b flex justify-between items-center">
                      <div className="pb-2 rounded-t-md flex gap-2 ">
                        <div className="w-10 h-10 rounded-full bg-bodyBackground animate-pulse"></div>
                        <div>
                          <h4 className="text-md font-medium w-28 h-6 bg-bodyBackground animate-pulse mb-2">

                          </h4>
                          <span className="text-[12px] font-medium  inline-block w-16 h-4 bg-bodyBackground animate-pulse">

                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <button className="bg-bodyBackground animate-pulse w-6 h-6 rounded-full p-2 transition-all ease-in-out transition-300">

                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex py-4">
                      <h4 className="text-md w-28  h-6 font-semibold bg-bodyBackground animate-pulse">

                      </h4>

                    </div>
                    <div>
                      <div className="border p-4 rounded-md ">
                        <p className="w-full h-16 bg-bodyBackground animate-pulse" ></p>
                      </div>
                    </div>
                  </div> :
                    allProposal && allProposal.length > 0 ? (
                      <>
                        {allProposal.map((el, index) => {
                          return (
                            <div key={index} className="w-full   bg-white p-4 rounded-md mb-2">
                              <div className=" border-b flex justify-between items-center">
                                <div className="pb-2 rounded-t-md flex gap-2 ">
                                  <Avatar />
                                  <div>
                                    <h4 className="text-md font-medium  ">
                                      {el.workerId.name}
                                    </h4>
                                    <span className="text-[12px] font-medium ">
                                      {moment(el.createdAt).calendar()}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <button className="hover:bg-[#eeeeee] rounded-full p-2 transition-all ease-in-out transition-300">
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
                                          d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex py-4">
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
                                  <span> {el.proposalPay}</span>
                                </div>
                              </div>
                              <div>
                                <div className="border p-4 rounded-md ">
                                  <p>{el.proposalDescription}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>no proposals</>
                    )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[28%] overflow-x-hidden">
          <ProposeWork />
        </div>
      </div>
    </div>
  );
};

export default ViewWork;
