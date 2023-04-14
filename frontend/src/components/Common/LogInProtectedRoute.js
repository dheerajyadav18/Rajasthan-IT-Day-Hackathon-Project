import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

const LogInProtectedRoute = () => {
    const userReducer = useSelector((state)=>{
        return state.userReducer;
    })
    const location = useLocation();
   
    return (
        <>
        {
            (userReducer && userReducer.isLoggedIn) ? <Outlet /> : <Navigate to={`/auth/login?back=${location.pathname}`} />
        }
        </>
  )
}

export default LogInProtectedRoute