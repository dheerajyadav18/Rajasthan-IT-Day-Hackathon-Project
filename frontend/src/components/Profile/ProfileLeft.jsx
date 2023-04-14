import React, { useEffect, useState } from "react";
// import { Avatar } from "@mui/material";
import Switch from "@mui/material/Switch";
import { axiosInstanceWithHeader } from "../../axois/index"
import { useDispatch } from "react-redux";
import { alert_show } from "../../store/action";


const ProfileLeft = ({ profileLeft }) => {
  const dispatch = useDispatch();
  const [workingStatus, setWorkingStatus] = useState(false);
  
  useEffect(() => {
    if (profileLeft.have) {
      setWorkingStatus(profileLeft.workingStatus);
    }
  }, [profileLeft]);

  const updateWorkingStatus = (e) => {
    axiosInstanceWithHeader
      .put("/api/v1/user/update/working-status", 
     { workingStatus: !workingStatus },
      )
      .then((res) => {
        if(res.status === 200){
            dispatch(alert_show({
                type:"success",
                message:res.data.result.message
            }))
            setWorkingStatus(!workingStatus);
        }else{
            throw Error("Some Unknown Error Occred");
        }
      })
      .catch((err) => {
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
      });
      // setWorkingStatus(workingStatus)
  };

  return (
    <>
      {profileLeft.have ? (
        <div className="p-2 w-full font-inter pb-5">
          <div className="w-full flex justify-center mt-5">
            <div className="w-40 h-40 bg-bodyBackground p-4 rounded-full">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <p className="text-xl font-inter font-medium">
              {profileLeft?.name}
            </p>
            <p className="text-sm text-goOnline1">{profileLeft?.userType}</p>
          </div>
          {
            (profileLeft?.userType === "worker") && <div className="mt-4 flex flex-col items-center border-t">
            <div className=" bg-white rounded-full p-2 flex  justify-center items-center ">
              <h2 className="w-max font-medium font-inter">Working Status</h2>
              <Switch checked={workingStatus} onChange={updateWorkingStatus} />
            </div>
          </div>
          }
          <div className="flex gap-8 text-xl w-full h-full mt-3 border-t pt-2 justify-center border-b">
            <div className=" bg-white rounded-full p-2 flex flex-col justify-center items-center ">
              <h2 className="w-max font-semibold ">{profileLeft.works}</h2>
              <h4 className="w-max text-sm">works</h4>
            </div>

            <div className=" bg-white rounded-full p-2  flex flex-col justify-center items-center ">
              <h2 className="w-max font-semibold">{profileLeft?.reviews}</h2>
              <h4 className="w-max text-sm">Review</h4>
            </div>
          </div>
          <div className=" mt-5 flex justify-start w-full overflow-hidden pl-4 pr-4">
            <div className="flex gap-3 flex-col ">
              <div>
                <a
                  className="font-normal ml-2 flex gap-2 items-center"
                  href="mailto: abc@example.com"
                  target="_blank"
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 "
                  >
                    <path
                      strokeLinecap="round"
                      d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                  <span>{profileLeft?.email}</span>
                </a>
              </div>
              <div>
                <a
                  className="font-normal ml-2 flex gap-2 items-center"
                  href="mailto: abc@example.com"
                  target="_blank"
                >
                  {" "}
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
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <span>{profileLeft?.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 w-full font-inter pb-5">
          <div className="animate-pulse w-full flex justify-center mt-5">
            <div className="w-40 h-40 bg-bodyBackground p-4 rounded-full"></div>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <p className="text-xl font-inter font-medium w-32 h-5 bg-bodyBackground mb-2 rounded-md"></p>
            <p className="text-xl font-inter font-medium w-20 h-5 bg-bodyBackground mb-2 rounded-md"></p>
          </div>
          <div className="mt-4 flex flex-col items-center border-t">
            <div className=" bg-white rounded-full p-2 flex gap-2 justify-center items-center ">
              <p className="text-xl font-inter font-medium w-20 h-5 bg-bodyBackground mb-2 rounded-md"></p>
              <p className="text-xl font-inter font-medium w-20 h-5 bg-bodyBackground mb-2 rounded-md"></p>
            </div>
          </div>

          <div className="flex gap-8 text-xl w-full h-full border-t pt-2 justify-center border-b">
            <div className=" bg-white rounded-full p-2 flex flex-col justify-center items-center ">
              <h2 className="font-semibold w-16 h-16 rounded-full bg-bodyBackground mb-2"></h2>
              <p className="text-xl font-inter font-medium w-20 h-5 bg-bodyBackground mb-2 rounded-md"></p>
            </div>

            <div className=" bg-white rounded-full p-2  flex flex-col justify-center items-center ">
              <h2 className="font-semibold w-16 h-16 rounded-full bg-bodyBackground mb-2"></h2>
              <p className="text-xl font-inter font-medium w-20 h-5 bg-bodyBackground mb-2 rounded-md"></p>
            </div>
          </div>
          <div className=" mt-5 flex justify-center w-full ">
            <div className="flex gap-3 flex-col ">
              <p className="text-xl font-inter font-medium w-32 h-5 bg-bodyBackground mb-2 rounded-md"></p>
              <p className="text-xl font-inter font-medium w-32 h-5 bg-bodyBackground mb-2 rounded-md"></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileLeft;
