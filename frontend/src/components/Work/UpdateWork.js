import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useSelector } from "react-redux";
const UpdateWork = () => {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [status, setStatus] = useState("");
  const user = useSelector((state) => state.userReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post(`https://rajasthan-it-day-hackathon.vercel.app/api/v1/work/update`, data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="bg-slate-600 w-full h-[49vmax] ">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6 ml-80">
            <div className="mt-8 md:col-span-2 p-[4rem]  md:mt-0">
              <form action="#" onSubmit={handleSubmit(onSubmit)}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <span className="font-bold text-lg text-black ml-18">
                      Update Work
                    </span>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3 mt-2">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Heading
                        </label>
                        <input
                          type="text"
                          name="workHeading"
                          id="first-name"
                          autoComplete="given-name"
                          style={{ border: "solid 1px #cfc9c9" }}
                          className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          {...register("workHeading", { required: true })}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <input
                          type="text"
                          name="workDescription"
                          id="email-address"
                          autoComplete="email"
                          style={{ border: "solid 1px #cfc9c9" }}
                          className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          {...register("workDescription", { required: true })}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State
                        </label>
                        <select
                          id="country"
                          name="workState"
                          autoComplete="country-name"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          {...register("workState", { required: true })}
                        >
                          <option value="Madhya pradesh">Madhya Pradesh</option>
                          <option value="uttar pradesh">Uttar Pradesh</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="chattisgarh">Chattisgarh</option>
                          <option value="uttarakhand">Uttarakhand</option>
                          <option value="gujrat">Gujrat</option>
                        </select>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          name="workAddress"
                          id="street-address"
                          autoComplete="street-address"
                          style={{ border: "solid 1px #cfc9c9" }}
                          className="mt-1 block h-9 w-full h-9rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          {...register("workAddress", { required: true })}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="workCity"
                          id="city"
                          autoComplete="address-level2"
                          style={{ border: "solid 1px #cfc9c9" }}
                          className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          {...register("workCity", { required: true })}
                        />
                      </div>
                      <div className="w-[10rem]">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              label="Work Time"
                              inputFormat="MM/DD/YYYY"
                              value={value}
                              onChange={handleChange}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              {...register("workTime", { required: true })}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </div>
                      <div className="col-span-6 sm:col-span-3 px-20">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Range
                        </label>
                        <select
                          id="country"
                          name="workRange"
                          autoComplete="country-name"
                          className="mt-1 block w-half rounded-md border border-gray-300 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          {...register("workRange", { required: true })}
                        >
                          <option value="200-500">Between 200-500</option>
                          <option value="500-800">Between 500-800</option>
                          <option value="800-1000">Between 800-1000</option>
                          <option value="above 1000">Above 1000</option>
                        </select>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateWork;
