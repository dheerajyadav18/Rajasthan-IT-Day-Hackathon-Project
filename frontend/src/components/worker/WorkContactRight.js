import React, { useEffect,useState } from "react";
import WorkerContactLeft from "./WorkerContactLeft";
import { Avatar } from "@mui/material";
import { axiosInstanceWithHeader } from "../../axois";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { alert_show } from "../../store/action";

const WorkContactRight = () => {

    const [workerDetails,setWorkerDetails] = useState();
     const params = useParams();
     const dispatch = useDispatch();
    useEffect(()=>{
        console.log(`${params.workerId}`)
        axiosInstanceWithHeader.get(`/api/v1/worker/getworkerdetails/${params.workerId}`)
        .then((res) => {
            console.log(res)
            if(res.status === 200){
                setWorkerDetails(() => {
                    return res.data.result.workerDetails
                  })
                dispatch(alert_show({
                    type:"success",
                    message:"successfully load this page"
                }))
            }else{
                throw Error("Some Unknown Error Occred");
            }
          })
        .catch((err)=>{
            console.log(err)
            if(err?.response?.data?.error?.message){
                dispatch(alert_show({
                    type:"error",
                    message:err.response.data.error.message
                }))
            }
            else{
                dispatch(alert_show({
                    type:"error",
                    message:"Some Unknown Error Occured ! Please Check your network once"
                }))
            }
        })
    },[])

    return (
        
            <div className="w-full mt-20 ">
                <div className="w-[80%]  flex mx-auto mt-5 justify-between items-stretch">
                    <div className="w-[60%] ">
                        <WorkerContactLeft />
                    </div>

                    {/* Right Section */}

                    <div className="w-[38%] ">
                        <div className="w-full rounded-xl mb-4 bg-white p-8">
                            <div className="flex justify-between border-b">
                                <div className="pb-2 rounded-t-md flex gap-2">
                                    <div className="w-10 h-10 rounded-full ">
                                        <Avatar />
                                    </div>
                                    <div>
                                        <h4 className="text-md font-medium">{workerDetails?.userId?.name}</h4>
                                        <h6 className="text-[12px] text-gray-800 font-medium">
                                            {workerDetails?.userType}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <form>
                                <div className="w-full mt-5 font-inter ">
                                    <div className="w-full  gap-2 ">
                                        <div className="flex flex-1 gap-2 p-1">
                                            <span>Worker Name :</span><span>{workerDetails?.userId?.name}</span>
                                        </div>
                                        <div className="flex flex-1 gap-2 p-1">
                                           <span>Mobile Number :</span>
                                           <span>{workerDetails?.userId?.phone}</span>
                                        </div>
                                    </div>

                                    <div className="w-full  gap-2 ">
                                        <div className="flex flex-1 gap-2 p-1">
                                            <span>Email :</span>
                                            <span>{workerDetails?.userId?.email}</span>
                                        </div>
                                        <div className="flex flex-1 gap-2 p-1">
                                        <span>Location :</span>
                                            <span>{workerDetails?.address}</span>
                                        </div>
                                    </div>

                                    <div className="w-full  gap-2 mb-5">
                                        <div className="flex flex-1 gap-2 p-1">
                                        <span>Address :</span>
                                            <span>{workerDetails?.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default WorkContactRight;
