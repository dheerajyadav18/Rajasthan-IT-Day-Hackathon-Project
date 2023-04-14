import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/NavBar/Nav'
import MessageForWorkerComponent from '../components/Profile/MessageForWorkerComponent'
import { alert_show } from '../store/action'

const MessageForWorkerPage = () => {
    const userReducer = useSelector((state) => {
        return state.userReducer;
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userReducer && userReducer.isLoggedIn && userReducer.userDetails && userReducer.userDetails.userType !== "worker") {
            dispatch(alert_show({

                type: "warning",
                message: "User is not allowed to visit this page."

            }))
            navigate("/")
        }
    }, [])

    return (
        <div>
            <Nav />
            <MessageForWorkerComponent />
        </div>
    )
}

export default MessageForWorkerPage