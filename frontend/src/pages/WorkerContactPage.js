import React, {useEffect} from 'react'
import WorkerContactComponent from '../components/worker/WorkerContactComponent'
import Nav from '../components/NavBar/Nav';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { alert_show } from '../store/action';



const WorkerContactPage = () => {
  const userReducer = useSelector((state) => {
    return state.userReducer;
})
const navigate = useNavigate();
const dispatch = useDispatch();

useEffect(() => {
    if (userReducer && userReducer.isLoggedIn && userReducer.userDetails && userReducer.userDetails.userType !== "user") {
        dispatch(alert_show({
            type: "warning",
            message: "Worker is not allowed to visit this page."

        }));
        navigate("/")
    }
}, [])
  return (
    <div>
        <Nav />
        <WorkerContactComponent />
    </div>
  )
}

export default WorkerContactPage