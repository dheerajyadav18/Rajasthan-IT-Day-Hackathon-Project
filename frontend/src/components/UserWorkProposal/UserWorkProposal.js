import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from '../NavBar/Nav';
import UserWorkProposalLeft from './UserWorkProposalLeft';
import UserWorkProposalRight from './UserWorkProposalRight';

const UserWorkProposal = () => {
    const userReducer = useSelector((state)=>{
        return state.userReducer;
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(userReducer && userReducer.isLoggedIn && userReducer.userDetails && userReducer.userDetails.userType === "worker"){
            dispatch({
                type:"warning",
                message:"Worker is not allowed to visit this page."
            })
            navigate("/");
        }
    },[])

    return (
        <>
            <Nav/>
            <div className='w-full '>
            <div className='w-[80%] mx-auto  flex justify-between mt-10'>
                <div className='w-[28%] h-[60vh] overflow-y-auto' id='workProposalLeft'>
                    <UserWorkProposalLeft/>
                </div>
                <div className='w-[70%] h-[80vh] overflow-y-auto' id='workProposalRight'>
                    <Outlet  />
                </div>
            </div>

        </div>
        </>
       
    )
}

export default UserWorkProposal