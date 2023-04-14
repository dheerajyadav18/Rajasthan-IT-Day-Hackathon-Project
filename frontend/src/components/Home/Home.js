// import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
const Home = () => {
  const userReducer = useSelector((state) => {
    return state.userReducer;
  })
  console.log(userReducer)
  const { t } = useTranslation()


  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true)
  function DestinationInput() {
    const [destination, setDestination] = useState('');
    const handleChange = (event) => {
      setDestination(event.target.value);
      function PickupInput() {
        const [pickup, setPickup] = useState('');
        const handleChange = (event) => {
          setPickup(event.target.value);
        }
      }
    }
  }
  return (<>

    <div className='w-full font-inter'>
      <div className='w-[90%] mx-auto '>
        <div className='w-full  flex pt-2 gap-20'>
          <div className='w-[40%] flex justify-end'>

            <div className='w-max h-full flex flex-col gap-2 items-start justify-center'>
              <div className={`rounded-md overflow-hidden flex items-center bg-white mb-4 text-black ${userReducer && userReducer.isLoggedIn ? "block" : "hidden"}`}>
                <input className={`py-2 px-4 `} placeholder='Search worker' onClick={()=>{
                  if(userReducer && userReducer.isLoggedIn && userReducer.userDetails && userReducer.userDetails.userType === "user"){
                    navigate("/search/worker")
                  }else{
                    navigate("/search/work")
                  }
                }}/>
                <div className='text-[#333] px-4 border-l'>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.582 16.3522H17.4077L16.9914 15.9508C18.4483 14.2561 19.3253 12.056 19.3253 9.66266C19.3253 4.3259 14.9994 0 9.66266 0C4.3259 0 0 4.3259 0 9.66266C0 14.9994 4.3259 19.3253 9.66266 19.3253C12.056 19.3253 14.2561 18.4483 15.9508 16.9914L16.3522 17.4077V18.582L23.785 26L26 23.785L18.582 16.3522ZM9.66266 16.3522C5.96112 16.3522 2.97313 13.3642 2.97313 9.66266C2.97313 5.96112 5.96112 2.97313 9.66266 2.97313C13.3642 2.97313 16.3522 5.96112 16.3522 9.66266C16.3522 13.3642 13.3642 16.3522 9.66266 16.3522Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
              <h2 className='font-semibold text-5xl text-white'>Empowering Labour Solutions!!</h2>
              <h2 className='font-semibold text-3xl mb-2 text-[#ff3] pb-2'>Smart Cities and Infrastructure
              </h2>
              <p className='mb-2 pr-8 text-md font-medium text-white pb-4'> Empowering Rural Workers with an online platform for finding work opportunities in their own area & Establish the platform as a trusted and reliable resource for rural workers in thier targeted area. Online platform connects rural workers to local jobs.
                Building a reliable platform through verified work postings.</p>
              <Link
                to="/explore">
                <button id='heroButton' className='px-12 py-4 rounded-xl bg-blue-600 text-white mb-2 text-lg'><span className='inline-block mr-2 text-[#fd1] '><b>-&gt;</b></span>Explore</button>
              </Link>
            </div>

          </div>
          <div className='w-[50%]'>
            <div className='w-full relative min-h-[625px]' >
              <div className='Cards1'>
              </div>
              <div className='Cards2'></div>
              <div className='Cards3'></div>
              <div className='Cards4'></div>
              <div className='Cards5'></div>
              <div className='Cards6'></div>
              <div className='Cards7'></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>
  )
}

export default Home

