import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WorkerSearchComponents from '../components/Search/worker/WorkerSearchComponents'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { alert_show } from '../store/action'
import Nav from '../components/NavBar/Nav'

const WorkerSearchPage = () => {
  const userReducer = useSelector((state)=>{
    return state.userReducer
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    // console.log(userReducer)
    if(userReducer.userDetails&&userReducer.userDetails.userType === "worker"){
      dispatch(alert_show({
        type: "warning", message: "You are not allow to visit this page."
      }))
      navigate("/")
    }
  },[])
  return (
    <div className='w-full'>
        <Nav />
        <div style={{border:"6px white solid", borderRadius:"30px"}} className=' w-[90%] mx-auto overflow-hidden mt-10' >
        <WorkerSearchComponents />
        </div>
        
    </div>
  )
}

export default WorkerSearchPage