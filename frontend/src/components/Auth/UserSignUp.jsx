import { React, useState, useEffect } from "react";
import "../../App.css"
import GoogleIcon from '@mui/icons-material/Google';
import { axiosInstance } from "../../axois/index.js";
import { useDispatch } from "react-redux";
import { alert_show } from "../../store/action";
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import loginIcon1 from '../../images/loginIcon1.png'

import loginIcon2 from '../../images/loginIcon2.png'
import loginIconEmoji from '../../images/loginIconEmoji.png'


const UserSignUp = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    userType: ""
  });
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitRequest = async (e) => {
    setSubmit(true)
    e.preventDefault();
    const sendRequest = async () => {
      await axiosInstance
        .post("api/v1/user/signup", {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
          phone: inputs.phone,
          userType: inputs.userType,

        })
        .then((response) => {
          // console.log(response)
          setSubmit(false);
          if (response.status === 200) {
            dispatch(alert_show({ type: "success", message: response.data.result.message }))
            setInputs({
              name: "",
              email: "",
              phone: "",
              password: "",
              userType: "",
            });
          }
          else throw new Error("some error occured");
        })
        .catch((err) => {
          // console.log(err)
          setSubmit(false);
          if (err?.response?.data?.error?.message) {
            dispatch(alert_show({ type: "error", message: err.response.data.error.message }));
          }
          else {
            dispatch(alert_show({
              type: "error", message: "some error occured"
            }))
          }
        });
    }
    await sendRequest();
  };

  const handleInput = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  }
  return (
    // <div>
    //   <div className="p-[4rem] pt-8">
    //     <form className="mx-auto flex w-max max-w-lg flex-col rounded-xl border border-border bg-backgroundSecondary p-2 sm:p-10 " onSubmit={submitRequest}>
    //       <div className="flex w-full flex-col gap-2">
    //         <p className="text-xl mb-2">Sign up with</p>
    //         <div className="flex w-full flex-col gap-2">
    //           <button type="button" className="btn gap-2 bg-gray-400">
    //             <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
    //               <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    //               <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    //               <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    //               <path
    //                 fill="#1976D2"
    //                 d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
    //             c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    //               ></path>
    //             </svg>
    //             <span className="text-black">Sign up with google</span>
    //           </button>


    //         </div>
    //       </div>
    //       <div className="divider mb-4 text-xs text-content2">or continue with</div>

    //       <div className="form-group">
    //         <div className="form-field">
    //           <label className="form-label">Name</label>
    //           <input
    //             type="text"
    //             name="name"
    //             className="input max-w-full"
    //             placeholder="Name"
    //             onChange={handleInput}
    //             value={inputs.name}
    //             required
    //           />

    //         </div>
    //         <div className="form-field">
    //           <label className="form-label">
    //             <span>Email</span>
    //           </label>
    //           <div className="form-control">

    //             <input
    //               type="email"
    //               name="email"
    //               className="input max-w-full"
    //               placeholder="Email..."
    //               onChange={handleInput}
    //               value={inputs.email}
    //               required
    //             />
    //           </div>
    //         </div>
    //         <div className="form-field">
    //           <label className="form-label">Phone</label>
    //           <input
    //             type="tel"
    //             name="phone"
    //             className="input max-w-full"
    //             placeholder="Phone"
    //             onChange={handleInput}
    //             value={inputs.phone}
    //             required
    //           />

    //         </div>

    //         <div className="form-field">
    //           <label className="form-label">Password</label>
    //           <input
    //             type="password"
    //             name="password"
    //             className="input max-w-full"
    //             placeholder="Password"
    //             onChange={handleInput}
    //             value={inputs.password}
    //             required
    //           />

    //         </div>

    //         <div className="form-field ">
    //           <div className="form-control justify-end">
    //             <label className="form-label">
    //               <Link to="" className="link link-underline-hover link-primary text-sm ">Forgot your password?</Link>
    //             </label>
    //           </div>
    //         </div>
    //         <div className="flex gap-2">
    //           <label className="form-label">User Type</label>
    //           <input
    //             type="radio" value="worker" name="userType"
    //             onChange={handleInput}
    //             required
    //           />Worker
    //           <input
    //             type="radio" value="user" name="userType"
    //             onChange={handleInput}
    //             required
    //           />User

    //         </div>
    //         <div className="form-field pt-2">
    //           <div className="form-control justify-between">
    //             <input type="submit" value="Sign up" style={{ backgroundColor: "#3737ff" }} className=" bg-blue-100 h-[2rem] w-full text-white rounded-md" />
    //           </div>
    //         </div>

    //         <div className="form-field">
    //           <div className="form-control">
    //             <Link to={"/auth/signup"} className="link link-underline-hover link-primary text-sm">You have an account? Sign In</Link>
    //           </div>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>


    <div className="w-full">
      <div className="max-w-[90%] mx-auto">
        <div className="w-full pt-10 flex justify-center items-center">


          <div className="w-[27%] bg-white h-auto rounded-lg mb-10">
            <form className="mx-auto flex w-full max-w-lg flex-col rounded-xl px-4 pb-5 " onSubmit={submitRequest}>

              <h2 className="text-blue-800 bold-mg text-center m-3 text-xl font-semibold"> Sign Up</h2>
              <div className="w-24 h-24">
                <img src={loginIcon2} className=' w-36 h-24 absolute top-30 left-[46%] mt-5' />
                <img src={loginIcon1} className=' w-28 h-28 absolute top-30 left-[46%] mt-3' />
                <img src={loginIconEmoji} className=' w-20 h-20 absolute top-[30%] left-[47%] mt-3' />
              </div>

              <div className="form-group p-4  mt-4">
                <div className="form-field mx-3">
                  <label className="form-label text-sm">Name</label>
                  <br />
                  <div className="flex items-center border rounded-sm ">
                    <input
                      type="text"
                      name="name"
                      className="input w-full p-2"
                      placeholder="Name"
                      onChange={handleInput}
                      value={inputs.name}
                      required
                    />

                  </div>

                </div>
                <div className="form-field mx-3 mt-2">
                  <label className="form-label text-sm">Email</label>
                  <br />
                  <div className="flex items-center border rounded-sm  ">



                    <input
                      type="email"
                      name="email"
                      className="input w-full p-2"
                      placeholder="Email..."
                      onChange={handleInput}
                      value={inputs.email}
                      required
                    />


                  </div>

                </div>


                <div className="form-field mx-3 mt-2">
                  <label className="form-label text-sm">Phone</label>
                  <br />
                  <div className="flex items-center border rounded-sm  ">



                    <input
                      type="tel"
                      name="phone"
                      className="input w-full p-2"
                      placeholder="Phone"
                      onChange={handleInput}
                      value={inputs.phone}
                      required
                    />



                  </div>

                </div>



                <div className="form-field mx-3 mt-2">
                  <label className="form-label text-sm">Password</label>
                  <br />
                  <div className="flex items-center border rounded-sm  ">



                    <input
                      type="password"
                      name="password"
                      className="input w-full p-2"
                      placeholder="Password"
                      onChange={handleInput}
                      value={inputs.password}
                      required
                    />



                  </div>

                </div>



                <div className="flex gap-2 mt-2 pl-3">
                  <label className="form-label">User Type</label>
                  <input
                    type="radio" value="worker" name="userType"
                    onChange={handleInput}
                    required
                  />Worker
                  <input
                    type="radio" value="user" name="userType"
                    onChange={handleInput}
                    required
                  />User

                </div>

                <div className="form-field ">
                  <div className="form-control justify-between my-5 py-1 px-3 mb-3">
                    <button type="submit" style={{ backgroundColor: "#3737ff" }} disabled={submit} className=" bg-blue-100 h-[2rem] w-full text-white rounded-md" >
                      {submit ? "Signing up..." : "Sign Up"}
                    </button>
                  </div>

                  <div className="pr-7 text-right">
                    <div className="form-field">
                      <div className="form-control justify-end">
                        <label className="form-label">
                          <Link to="" className="text-black text-sm hover:underline hover:text-blue-700 transition-all ease-in-out transition-200">Forgot your password?</Link>
                        </label>
                      </div>
                    </div>
                    <div className="form-field">
                      <div className="form-control">
                        <Link to={"/auth/login"}   className=" text-sm hover:underline hover:text-blue-700 transition-all ease-in-out transition-200">You have an account? Sign In</Link>
                      </div>
                    </div>


                  </div>


                </div>

              </div>
            </form>
          </div>




        </div>


      </div>
    </div >

  );
};

export default UserSignUp;
