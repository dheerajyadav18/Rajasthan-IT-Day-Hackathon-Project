import { React, useEffect, useState } from "react";
import { axiosInstanceWithHeader } from "../../axois";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { alert_show } from "../../store/action";

const UserWorkProposalLeft = () => {
  const [porposalWork, setporposalWork] = useState([]);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  // const [loader,setLoader] = useState({have:"false",proposalLeft:[]});
  const userReducer = useSelector((state) => {
    return state.userReducer;
  });
  const params = useParams();

  useEffect(() => {
    setLoader(true);
    axiosInstanceWithHeader.get("/api/v1/work/get-all-work-of-loginuser")

      .then((response) => {
        console.log(response);
        if (response?.status === 200) {
          setporposalWork(() => {
            return response.data.result.works
          })
          dispatch(alert_show({
            type: "success",
            message: "Page Loaded"
          }))
          setLoader(false);

        }
        else {
          throw Error("Some Unknown Error Occred");
        }
      })
      .catch((err) => {
        console.log("error ", err);
        if (err?.response?.data?.error?.message) {
          dispatch(alert_show({
            type: "error",
            message: err.response.data.error.message
          }))
        }
        else {
          dispatch(alert_show({
            type: "error",
            message: "Some Unknown Error Occured ! Please Check your network once"
          }))
        }
        setLoader(false);

      })
  }, []);
  return (
    <div className="w-full">
      {loader ? (
        <div className="w-[100%] mx-auto bg-white p-4 rounded-md">
          <div className="w-full px-4 py-2 border-b font-bold ">
            <h2 className="bg-bodyBackground h-8 w-40 animate-pulse rounded-md"></h2>
          </div>
          <ul className="w-full">
            <li className="w-full transition-all transition-300 ease-in-out px-4 py-2 border-b ">
              <Link className="flex flex-col w-full h-full">
                <span className="font-semibold bg-bodyBackground h-6 w-40 animate-pulse rounded-md"></span>
                <span className="text-[11px] bg-bodyBackground h-4 w-28 animate-pulse mt-2 rounded-md"></span>
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <div className="w-[100%] mx-auto bg-white p-4 rounded-md">
            <div className="w-full px-4 py-2 border-b font-bold ">
              <h2>Work Added By {userReducer?.userDetails?.name}</h2>
            </div>
            <ul className="w-full">
              {porposalWork.map((el, index) => {
                return (
                  <li
                    key={index}
                    className={`w-full transition-all transition-300 ease-in-out px-4 py-2 border-b ${el._id === params.workId ? "bg-bodyBackground" : ""
                      } `}
                  >
                    <Link
                      to={`${el._id}`}
                      className="flex flex-col w-full h-full"
                    >
                      <span className="font-semibold">{el.workHeading}</span>
                      <span className="text-[11px]">
                        {moment(el.workTime).calendar()}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default UserWorkProposalLeft;
