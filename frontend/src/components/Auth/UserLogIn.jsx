import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login, alert_show } from "../../store/action";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom"
import loginIcon1 from '../../images/loginIcon1.png'

import loginIcon2 from '../../images/loginIcon2.png'
import loginIconEmoji from '../../images/loginIconEmoji.png'



const UserLogIn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [submit, setSubmit] = useState(false);
  const [notValid, setNotValid] = useState(false);
  const [showPass, setshowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();

  const navigate = useNavigate();



  const onSubmit = async (e) => {

    setSubmit(true);
    console.log(e.email, e.password);

    try {
      await axios
        .post("https://rajasthan-it-day-hackathon.vercel.app/api/v1/user/login", {
          email: e.email,
          password: e.password,
        })
        .then((res) => {
          console.log(res);
          setSubmit(true);
          if (res.status === 200) {
            const token = JSON.stringify(res.data.result.token);
            const user = JSON.stringify(res.data.result.user);
            window.localStorage.setItem("accessToken", token);
            window.localStorage.setItem("userDetails", user);
            // storing in redux
            dispatch(login({
              accessToken: res.data.result.token,
              userDetails: res.data.result.user
            }));
            // alerting success  msg
            dispatch(alert_show({ type: "success", message: "LoggedIn Successfully...." }))
            navigate(`${searchParams.get("back") ? searchParams.get("back") : "/"}`);
            setSubmit(false);
          }
          else if (res.status === 201) {
            dispatch(alert_show({ type: "success", message: res.data.message }))
            setSubmit(false);
          }
          else {
            throw new Error("Some Unknown Error Occured");
          }
        })
        .catch((err) => {
          console.log(err)
          if (err?.response?.data?.message) {
            dispatch(alert_show({ type: "error", message: err.response.data.message }))
          }
          else {
            dispatch(alert_show({ type: "error", message: "Some Unknown Error Occured" }));
          }
          setSubmit(false);
        });
    } catch (error) {
      setSubmit(false);
      console.log(error);
      setNotValid(false);
    }
  };
  return (
    <div className="w-full">
      <div className="max-w-[90%] mx-auto">
        <div className="w-full pt-10 flex justify-center items-center">


          <div className="w-[27%] bg-white h-auto rounded-lg ">
            <form className="mx-auto flex w-full max-w-lg flex-col rounded-xl px-4 pb-5 " onSubmit={handleSubmit(onSubmit)}>

              <h2 className="text-blue-800 bold-mg text-center m-3 text-xl font-semibold"> Login</h2>
              <div className="w-24 h-24">
                <img src={loginIcon2} className=' w-36 h-24 absolute top-30 left-[46%] mt-5' />
                <img src={loginIcon1} className=' w-28 h-28 absolute top-30 left-[46%] mt-3' />
                <img src={loginIconEmoji} className=' w-20 h-20 absolute top-[30%] left-[47%] mt-3' />
              </div>

              <div className="form-group p-4  mt-4">
                <div className="form-field mx-3">
                  <label className="form-label text-sm">Email</label>
                  <br />
                  <div className="flex items-center border rounded-sm pr-2">
                    <input placeholder="Enter Email" type="email" name="email" className="input w-full p-2"
                      {...register("email", { required: true })}

                    />
                    <div className="pl-2 " >
                      <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.564331 7.73999C0.564331 11.3008 0.564331 16.8581 0.564331 16.8581C0.564331 16.8581 0.564331 16.8581 0.564331 16.8581C0.564331 18.2432 1.68711 19.3659 3.07213 19.3659H18.1189C19.504 19.3659 20.6267 18.2432 20.6267 16.8581V7.1514M0.564331 7.73999C0.564331 7.30765 0.787048 6.90582 1.15367 6.67668L10.5955 0.775513L19.9876 6.05853C20.3824 6.28062 20.6267 6.6984 20.6267 7.1514M0.564331 7.73999C1.06589 7.73999 10.5955 13.9415 10.5955 13.9415L20.6267 7.1514" stroke="#7B7B7B" stroke-width="1.04492" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </div>

                  </div>


                </div>
              </div>
              <div className="form-group py-1 px-4 ">
                <div className="form-field mx-3">
                  <label className="form-label text-sm ">Password</label>
                  <br />
                  <div className=" w-full flex items-center border rounded-sm pr-2">
                    <input placeholder="Enter Password" type={showPass ? "text" : "password"} name="password" className="input w-full p-2"
                      {...register("password", { required: true })} />
                    <div className="pl-2 hover:cursor-pointer">
                      {showPass ? <><svg width="22" onClick={() => setshowPass(false)} height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.05186 8.8224C0.982778 8.61513 0.982712 8.39073 1.05167 8.18343C2.44004 4.00972 6.3771 1 11.0171 1C15.655 1 19.5905 4.00692 20.9806 8.1776C21.0497 8.38487 21.0498 8.60927 20.9808 8.81658C19.5925 12.9903 15.6554 16 11.0154 16C6.37751 16 2.44195 12.9931 1.05186 8.8224Z" stroke="#7B7B7B" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.0163 8.5C14.0163 10.1569 12.6732 11.5 11.0163 11.5C9.35945 11.5 8.01631 10.1569 8.01631 8.5C8.01631 6.84315 9.35945 5.5 11.0163 5.5C12.6732 5.5 14.0163 6.84315 14.0163 8.5Z" stroke="#7B7B7B" stroke-linecap="round" stroke-linejoin="round" />
                      </svg></> : <><svg width="22" onClick={() => setshowPass(true)} height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.3728 16.4561L3.69908 0.782349M8.71468 6.9908C8.32449 7.42097 8.08773 7.98604 8.08773 8.60492C8.08773 9.95263 9.21051 11.0452 10.5955 11.0452C11.2341 11.0452 11.817 10.8129 12.2597 10.4305M19.4134 11.0452C20.2767 9.75277 20.6267 8.69877 20.6267 8.69877C20.6267 8.69877 18.344 1.4093 10.5955 1.4093C10.1605 1.4093 9.74275 1.43227 9.34163 1.47564M16.2381 14.209C14.7988 15.1271 12.9459 15.7764 10.5955 15.738C2.94353 15.6128 0.564331 8.69877 0.564331 8.69877C0.564331 8.69877 1.6697 5.16899 4.95298 3.02194" stroke="#7B7B7B" stroke-width="1.04492" stroke-linecap="round" />
                      </svg></>}






                    </div>
                  </div>

                </div>
              </div>
              <div className="form-field ">
                <div className="form-control justify-between my-5 py-1 px-7 mb-3">
                  <button type="submit" style={{ backgroundColor: "#3737ff" }} disabled={submit} className=" bg-blue-100 h-[2rem] w-full text-white rounded-md" >
                    {submit ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </div>
              <div className="pl-7">
                <div className="form-field">
                  <div className="form-control justify-end">
                    <label className="form-label">
                      <Link to="" className="link link-underline-hover link-primary text-sm hover:underline hover:text-blue-700 transition-all ease-in-out transition-200">Forgot your password?</Link>
                    </label>
                  </div>
                </div>
                <div className="form-field">
                  <div className="form-control">
                    <Link to={"/auth/signup"} className="link link-underline-hover link-primary text-sm hover:underline hover:text-blue-700 transition-all ease-in-out transition-200">Don't have an account? Sign Up</Link>
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

export default UserLogIn;


{/* 
<div className="p-[8rem] pt-20">
    <form className="mx-auto flex w-max max-w-lg flex-col rounded-xl border border-border bg-backgroundSecondary p-4 sm:p-10" onSubmit={handleSubmit(onSubmit)}>
    <div className="flex w-full flex-col gap-2">
      <p className="text-xl mb-2">Sign in with</p>
      <div className="flex w-full flex-col gap-2">
        <button type="button" className="btn gap-2 bg-gray-400">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <span className="text-black">Sign up with google</span>
        </button>
        
       
      </div>
    </div> 
    <div className="divider mb-6 text-xs text-content2">or continue with</div>
  
 <div className="form-group">
     <div className="form-field">
     <label className="form-label">Email address</label>
  
  <input placeholder="Type here" type="email" name="email" className="input max-w-full"
         {...register("email", { required: true })} />

      </div>
      <div className="form-field">
        <label className="form-label">
          <span>Password</span>
        </label>
        <div className="form-control">
          <input placeholder="Type here" type="password" name="password" className="input max-w-full"
           {...register("password", { required: true })} />
        </div>
      </div>
      <div className="form-field">
        <div className="form-control justify-end">
          <label className="form-label">
            <Link to="" className="link link-underline-hover link-primary text-sm">Forgot your password?</Link>
          </label>
        </div>
      </div>
      <div className="form-field pt-5">
        <div className="form-control justify-between">
          <input type="submit" value="Sign in" style={{backgroundColor:"#3737ff"}} className=" bg-blue-100 h-[2rem] w-full text-white rounded-md"/>
        </div>
      </div>
  
      <div className="form-field">
        <div className="form-control">
          <Link to={"/auth/signup"} className="link link-underline-hover link-primary text-sm">Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  </form>
  </div>
  */}
