import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { alert_show } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosInstanceWithHeader } from "../../axois";
const ProposeWork = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userReducer = useSelector((state) => {
    return state.userReducer
  })
  const [loader,setLoader] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const checkAlreadyProposed = async () => {
  //   const data = { workId: "6789hnjh", workerId: "845hdf" };
  //   await axios
  //     .post("https://rajasthan-it-day-hackathon.vercel.app/api/v1/work/propose", data)
  //     .then((result) => {
  //       if (result.status === 200) {
  //         if (result.data.already)

  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


  const onSubmit = async (data) => {
    const workId = params.workId;
    await axiosInstanceWithHeader
      .post("/api/v1/work/make-proposal/" + workId, data)
      .then((result) => {
        if (result.status === 200) {
          dispatch(alert_show({
            type: "success",
            message: "You proposal is posted."
          }))
          setLoader(false);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.error?.message) {
          dispatch(alert_show({
            type: "error",
            message: err.response.data.error.message
          }))
        }
        else {
          dispatch(alert_show({
            type: "error",
            message: "Some Unknown Error Occured"
          }))
        }
      });
  };
  return (
    <div className="bg-white w-full rounded-md">
      {
        (userReducer && !userReducer.isLoggedIn) ? <>
          <div>
            <span className="font-bold text-lg text-black ml-18">
              In order to make proposal login
            </span>
          </div>
        </> : <>
          {
            (userReducer && userReducer.userDetails && userReducer.userDetails.userType === "user")?<>
              <div className="bg-white px-4 py-5 sm:p-6 rounded-md"><span className="font-bold text-lg text-black ml-18">
              As you a user you are not allowed to make a proposal.
            </span></div>
            </>:(<div className="">
            <div className="">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <span className="font-bold text-lg text-black ml-18">
                      Make Your Proposal
                    </span>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6  mt-2 ">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Pay Range
                        </label>
                        <input
                          type="number"
                          name="workPay"
                          id="first-name"
                          autoComplete="given-name"
                          style={{ border: "solid 1px #cfc9c9" }}
                          className="mt-1 p-2 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          {...register("workPay", { required: true })}
                        />
                      </div>
                      <div className="col-span-6 ">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          name="workDescription"
                          id="email-address"
                          autoComplete="email"
                          style={{ border: "solid 1px #cfc9c9" }}
                          className="mt-1 p-2 block w-full h-60 resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          {...register("workDescription", { required: true })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>)
          }
        </>
      }

    </div>
  );
};

export default ProposeWork;
