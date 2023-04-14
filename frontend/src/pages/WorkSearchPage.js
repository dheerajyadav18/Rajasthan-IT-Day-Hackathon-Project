import React, { useEffect } from 'react'
import WorkSearchComponents from '../components/Search/work/WorkSearchComponents'
import { alert_show } from '../store/action'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Nav from '../components/NavBar/Nav'

const WorkSearchPage = () => {
  const userReducer = useSelector((state) => {
    return state.userReducer;
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userReducer.userDetails && userReducer.userDetails.userType === "user") {
      dispatch(alert_show({
        type: "warning", message: "You are not allow to visit this page."
      }))
      navigate("/")
    }
  }, [])
  return (
    <div>
      <Nav />
      <div style={{ border: "6px white solid", borderRadius: "30px" }} className=' w-[90%] mx-auto overflow-hidden mt-10' >
        <WorkSearchComponents />
      </div>
    </div>
  )
}

export default WorkSearchPage