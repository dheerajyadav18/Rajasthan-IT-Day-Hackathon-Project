import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

const LogOutProtectedRoute = () => {
    const userReducer = useSelector((state)=>{
        return state.userReducer;
    })
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <>
        {
            (userReducer && userReducer.isLoggedIn) ? <Navigate to={`${searchParams.get("back") ? searchParams.get("back") : "/"}`} /> : <Outlet /> 
        }
        </>
  )
}

export default LogOutProtectedRoute