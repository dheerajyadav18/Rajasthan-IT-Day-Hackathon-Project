import {React,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/NavBar/Nav'
import PostWork from '../components/Work/PostWork'
import { alert_show } from '../store/action'

const PostWorkPage = () => {
  const userReducer = useSelector((state)=>{
    return state.userReducer;
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    if(userReducer && userReducer.isLoggedIn && userReducer.userDetails && userReducer.userDetails.userType !== "user"){
      if(!userReducer.isLoggedIn){
        dispatch(alert_show({
          type: "warning", message: "First you should login your account."
        }))
      }
      else{
        dispatch(alert_show({
          type: "warning", message: "This operator is only allow for user."
        }))
      }
      navigate("/")
    }
  },[])
  return (
    <div>
        <Nav />
        <PostWork />
    </div>
  )
}

export default PostWorkPage