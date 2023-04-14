import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstanceWithHeader } from "../../axois/index";
import moment from "moment";
import { useDispatch } from "react-redux";
import { alert_show } from "../../store/action";
import {Link} from "react-router-dom"
import Drawer from '@mui/material/Drawer';
import PaymentDrawer from "./PaymentDrawer";

const UserWorkProposalRight = () => {
  const [workProposals, setWorkProposals] = useState([]);
  const [loader,setLoader] = useState(true);
  const[proposaForPayment, setProposaForPayment] = useState([])
  const [approvedProposoalCount, setApprovedProposoalCount] = useState(0);
  const [workCompletedStatus, SetWorkCompletedStatus] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const [paymentDrawer, setPaymentDrawer] = useState(false);

  useEffect(() => {
    setLoader(true)
    axiosInstanceWithHeader
      .get("/api/v1/work/get-proposals-by-workId/" + params.workId)
      .then((res) => {
        console.log(res)
        if (res?.status === 200) {
          setWorkProposals(() => {
            return res.data.result.allProposal;
          });
          setApprovedProposoalCount(res.data.result.approvedProposoalCount);
          SetWorkCompletedStatus(res.data.result.workCompletedStatus);
          setLoader(false);
          setProposaForPayment(()=>{
            return res.data.result.allProposal.filter((el)=>{
              return (el.proposalStatus === "approved");
            })
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  // useEffect(() => {
  //   console.log(workProposals);
  // }, [workProposals]);

  const approvedProposal = (proposalId) => {
    axiosInstanceWithHeader
      .put(`/api/v1/worker/approveproposal/${proposalId}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            alert_show({
              type: "success",
              message: response.data.result.message,
            })
          );
        } else {
          throw Error("Some Unknown Error Occred");
        }
      })
      .catch((err) => {
        console.log(err);
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
              message:
                "Some Unknown Error Occured ! Please Check your network once",
            })
          );
        }
      });
  };

  return (
    <div className="w-full">
      {
        loader?(<div className="">
          <div className="pb-2 bg-white mb-2 rounded-md ">
            <div className="w-full  p-4 rounded-md flex justify-between ">
              <div>
                <h2 className="text-lg animate-pulse h-6 w-28 bg-bodyBackground mb-2  font-medium"></h2>
                <h2 className="text-lg animate-pulse h-6 w-28 bg-bodyBackground  font-medium"></h2>
              </div>
              <div>
                <button className=" bg-bodyBackground animate-pulse h-10 w-28 font-medium px-4 py-2 rounded-md"></button>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full shadow-md mb-2 shadow-gray-300 bg-white p-4 rounded-md">
              <div className=" border-b flex justify-between items-center">
              <div className="pb-2 rounded-t-md flex gap-2 ">
                    <div className="animate-pulse w-12 h-12 bg-bodyBackground rounded-full"></div>
                    <div>
                      <h4 className="text-md font-medium h-4 w-28 animate-pulse bg-bodyBackground ">
                        
                      </h4>
                      <h4 className="text-[12px] mt-1  h-4 w-28 animate-pulse bg-bodyBackground font-medium ">
                       
                      </h4>
                    </div>
                  </div>
                <div>
                  <div className="flex items-center gap-2">
                    <button className=" p-2 transition-all ease-in-out transition-300 animate-pulse bg-bodyBackground h-5 w-12"></button>
                  </div>
                </div>
              </div>
              <div className="flex py-4 w-28 mt-2 mb-2 bg-bodyBackground animate-pulse" >
                {/* <h4 className="text-md font-semibold bg-bodyBackground w-max"> </h4>
                <div className="flex bg-bodyBackground">
                  <span className="bg-bodyBackground"> </span>
                </div> */}
              </div>
              <div>
                <div className="border p-4 rounded-md animate-pulse bg-bodyBackground h-10 ">
                  <p className=""></p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="py-4">
                  <button className=" p-2 pl-6 pr-6 rounded-md animate-pulse bg-bodyBackground h-10 w-28 flex gap-2"></button>
                </div>
                <div className="py-4">
                  <button className=" p-2 pl-6 pr-6 rounded-md animate-pulse bg-bodyBackground flex gap-2 w-28 h-10"></button>
                </div>
              </div>
            </div>
          </div>
        </div>):(<>
          <div
        className="sticky top-0 left-0 pb-2 bg-bodyBackground"
        style={{ zIndex: 100 }}
      >
        <div className="w-full bg-white p-4  rounded-md flex justify-between ">
          <div>
            <h2 className="text-lg font-medium">
              Total Proposals:{" "}
              <span>{workProposals && workProposals.length}</span>
            </h2>
            <h2 className="text-lg font-medium">
              Approved : <span> {approvedProposoalCount}</span>
            </h2>
            <Link to={`/work/${params.workId}`} className="hover:underline inline-block transition-all ease-in-out transition-200 mt-2 text-sm text-[#1976d2]">View Work</Link>
          </div>
          <div className="flex flex-col gap-1">
            {workCompletedStatus === true ? (
              <button className="bg-green-800 text-white font-medium px-4 py-2 rounded-md">
                Completed
              </button>
            ) : (<>
              <button className="bg-red-800 text-white font-medium px-4 py-2 rounded-md">
                Incompleted
              </button>
              <button onClick={()=>{
                setPaymentDrawer(true)
              }} className="w-full py-2 rounded-md bg-bodyBackground">Make Payment</button></>
            )}
            
          </div>
        </div>
      </div>
      {workProposals && workProposals.length > 0 ? (
        workProposals.map((el, index) => {
          return (
            <div key={index}>
              <div className="w-full shadow-md mb-2 shadow-gray-300 bg-white p-4 rounded-md">
                <div className=" border-b flex justify-between items-center">
                  <div className="pb-2 rounded-t-md flex gap-2 ">
                    <Avatar style={{ zIndex: 0 }} />
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
                      <div className={`capitalize px-4 py-2 text-white rounded-md ${el.proposalStatus === "approved" ? "bg-green-800":"bg-red-800"}`}>{el.proposalStatus}</div>
                    </div>
                  </div>
                </div>
                <div className="flex py-4">
                  <h4 className="text-md font-semibold w-max">Budget :</h4>
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
                <div className="flex gap-4">
                  <div className="py-4">
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
                  {
                    el.proposalStatus === "pending" && <div className="py-4">
                    <button
                      className="bg-[#eeeeee] p-2 pl-6 pr-6 rounded-md flex gap-2"
                      onClick={() => {
                        approvedProposal(el._id);
                      }}
                    >
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
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <h6>Approve</h6>
                    </button>
                  </div>
                  }

                </div>
              </div>
            </div>
          );
        })
      ) : (
        <>
          <div className="w-full bg-white h-[40vh] rounded-md p-4 flex justify-center items-center ">
            <div className="flex w-full justify-center flex-col items-center ">
              <div className="w-[200px] h-[200px] text-bodyBackground ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="text-gray-500 text-xl font-medium">
                <h2>No Proposals Found. </h2>
              </div>
            </div>
          </div>
        </>
      )}
        </>)
      }
  <Drawer
            anchor={"right"}
            open={paymentDrawer}
            onClose={
              ()=>{
                setPaymentDrawer(!paymentDrawer)
              }
            }
          >
            <PaymentDrawer proposaForPayment={proposaForPayment}/>
          </Drawer>

      
    </div>
  );
};

export default UserWorkProposalRight;
