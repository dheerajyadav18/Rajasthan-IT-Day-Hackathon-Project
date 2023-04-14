import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {alert_show} from "../../store/action/index";
import { axiosInstanceWithHeader } from "../../axois";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PostWork = () => {

  const {t} = useTranslation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));
  const [workingLocation, setWorkingLocation] = useState({})
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [status, setStatus] = useState("");

  const user = useSelector((state) => state.userReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const getCountry = async () => {
    await axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => {
        res.data.forEach((element) => {
          if (element.country === "India") {
            setState((prev) => {
              return [...prev, element.subcountry];
            });
          }
        });
        setCity(res.data);
        console.log("hello");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCountry();
  }, []);

  const filterState = [...new Set(state.map((item) => item))];

  const [finalCity, setFinalCity] = useState([]);

  const handleCity = (e) => {
    setFinalCity([]);
    city.forEach((element) => {
      if (
        element.country === "India" &&
        element.subcountry === e.target.value
      ) {
        setFinalCity((prev) => {
          return [...prev, element.name];
        });
      }
    });
  };
  const onSubmit = async (data) => {
    console.log(errors);
    data.workLocation = workingLocation
    await axiosInstanceWithHeader
      .post("https://rajasthan-it-day-hackathon.vercel.app/api/v1/work/post", data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(alert_show({
            type:"success",
            message:"Work Added SuccessFully"
          }))
          navigate("/explore");
        }
        else throw Error("Some Unknown Error Occured")
      })
      .catch((err) => {
        console.log(err?.response)
        if(err?.response?.data?.error?.message){
          dispatch(alert_show({
            type:"success",
            message:err?.response?.data?.error?.message
          }))
        }
        else{
          dispatch(alert_show({
            type:"success",
            message:"Some Unknown Error occured"
          }))
        }
      });
  };



  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
      setOpen(false);
      console.log(status);
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setStatus(null);
          setWorkingLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
          setOpen(false);
        },
        () => {
          setStatus("Unable to retrieve your location");
          setOpen(false);
          window.alert(status);
          console.log(status);
        }
      );
    }
  };
  return (
    <div className="bg-slate-600 w-full h-cover ">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6 ml-80">
          <div className="mt-8 md:col-span-2 p-[4rem]  md:mt-0">
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <span className="font-bold text-lg text-black ml-18">
                    {t("register work")}
                  </span>
                  <div className="w-full flex flex-col gap-4">
                    <div className="col-span-6  mt-2 ">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-800"
                      >
                        {t("heading")}
                      </label>
                      <input
                        type="text"
                        name="workHeading"
                        id="first-name"
                        autoComplete="given-name"
                        style={{ border: "solid 1px #cfc9c9" }}
                        className="mt-1 p-2 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...register("workHeading", { required: true })}
                      />
                    </div>

                    <div className="col-span-6 ">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-800"
                      >
                        {t("description")}
                      </label>
                      <textarea
                        name="workDescription"
                        id="email-address"
                        autoComplete="email"
                        style={{ border: "solid 1px #cfc9c9" }}
                        className="mt-1 block w-full h-32 resize-none p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...register("workDescription", { required: true })}
                      />
                    </div>

                    <div className="flex w-full gap-4">
                      <div className="w-1/2">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-800"
                        >
                          {t("state")}
                        </label>
                        <select
                          id="country"
                          name="workState"
                          autoComplete="country-name"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          {...register("workState", { required: true })}
                          onChange={(e) => {
                            handleCity(e);
                          }}
                        >
                          <option>{t("select state")}</option>
                          {filterState &&
                            filterState.map((e, index) => {
                              return <option key={index} value={e}>{e}</option>;
                            })}
                        </select>
                      </div>
                      <div className="w-1/2">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-800"
                        >
                          {t("city")}
                        </label>
                        <select
                          id="country"
                          name="workState"
                          autoComplete="country-name"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          {...register("workCity", { required: true })}
                        >
                          {finalCity &&
                            finalCity.map((e, index) => {
                              return <option key={index} value={e}>{e}</option>;
                            })}
                        </select>
                      </div>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-800"
                      >
                        {t("address")}
                      </label>
                      <input
                        type="text"
                        name="workAddress"
                        id="street-address"
                        autoComplete="street-address"
                        style={{ border: "solid 1px #cfc9c9" }}
                        className="mt-1 block p-2 w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...register("workAddress", { required: true })}
                      />
                    </div>
                    <div className="w-full flex gap-4 items-center">
                      <div className="w-1/2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              label={t("work time")}
                              inputFormat="MM/DD/YYYY"
                              value={value}
                              onChange={handleChange}
                              renderInput={(params) => <TextField {...params} />}
                              {...register("workTime", { required: true })}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </div>
                      <div className="w-1/2">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-800"
                        >
                          {t("pay range")}
                        </label>
                        <input
                          type="text"
                          name="workHeading"
                          autoComplete="given-name"
                          style={{ border: "solid 1px #cfc9c9" }}
                          className="mt-1 block w-full h-9 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          {...register("payRange", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-800"
                      >
                        {t("loacation")}
                      </label>
                      <div className="flex items-center border rounded-md">
                        <input
                          type="text"
                          name="workLocation1"
                          value={`${workingLocation.latitude ? workingLocation.latitude + "-" + workingLocation.longitude : ""}`}
                          className="mt-1 block w-full p-2 h-9 rounded-md shadow-sm focus:outline-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          {...register("workLocation1", { required: true })}
                        />
                        <div>
                          <button onClick={handleToggle} className="flex items-center justify-center p-2 border-l">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="workTags"
                        className="block text-sm font-medium text-gray-800"
                      >
                        {t("work tags")} - <span className="text-[10px]">(Put tags to rank your work)</span>
                      </label>
                      <input
                        type="text"
                        name="workTags"
                        style={{ border: "solid 1px #cfc9c9" }}
                        className="mt-1 block p-2 w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...register("workTags", { required: true })}
                      />
                    </div>
                  </div>


                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {t("save")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostWork;
