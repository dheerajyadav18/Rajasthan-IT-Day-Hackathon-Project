import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { alert_show } from '../../store/action';
import { axiosInstanceWithHeader } from '../../axois';

const ProfileEdit = ({ profileEdit, serProfileEdit }) => {
    // state variable here
    const [allStates, setAllStates] = useState([]);
    const [updateLoader, setUpdateLoader] = useState(false);
    const [cityByState, setCityByState] = useState([]);
    const [inputVal, setInputVal] = useState({
        name: "",
        state: "",
        city: "",
        location: {},
        phone: "",
        workPriorities: "",
        summary: "",
        workingDistance: "",
        pincode: "",
        address: ""
    })

    // hooks
    const dispatch = useDispatch();


    useEffect(() => {
        if (profileEdit.have) {
            setInputVal({
                name: profileEdit.name,
                state: profileEdit.state,
                city: profileEdit.city,
                location: profileEdit.location,
                phone: profileEdit.phone,
                workPriorities: profileEdit.workPriorities,
                summary: profileEdit.summary,
                workingDistance: profileEdit.workingDistance ? profileEdit.workingDistance : "",
                pincode: profileEdit.pincode ? profileEdit.pincode : "",
                address: profileEdit.address ? profileEdit.address : "",
            })
        }
    }, [profileEdit])

    const handleOnChange = (e) => {
        setInputVal((prv) => {
            return {
                ...prv,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSelectState = async (e) => {
        setInputVal((prv) => {
            return {
                ...prv,
                [e.target.name]: e.target.value,
                city: ""
            }
        })


        const makeRequestForCity = async () => {
            await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", { country: "India", state: e.target.value })
                .then((res) => {
                    // console.log(res);
                    setCityByState(() => {
                        return res.data.data
                    })
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(alert_show({
                        type: "warning",
                        message: "Unable to Load City at the movement"
                    }))
                })
        }
        if (e.target.value) {
            makeRequestForCity();
        }
    }


    useEffect(() => {
        const makeRequestStateForState = async () => {
            await axios.post("https://countriesnow.space/api/v0.1/countries/states", { country: "India" })
                .then((res) => {
                    // console.log(res);
                    setAllStates(() => {
                        return res.data.data.states;
                    })
                }).catch((err) => {
                    dispatch(alert_show({
                        type: "warning",
                        message: "Unable to Load states"
                    }))
                })
        }
        makeRequestStateForState();
    }, [])


    const updateProfileDetails = () => {
        setUpdateLoader(true);
        axiosInstanceWithHeader.put("/api/v1/user/updateprofile", {
            name: inputVal.name,
            state: inputVal.state,
            city: inputVal.city,
            location: inputVal.location,
            phone: inputVal.phone,
            workPriorities: inputVal.workPriorities,
            summary: inputVal.summary,
            workingDistance: inputVal.workingDistance,
            pincode: inputVal.pincode,
            address: inputVal.address,
        })
            .then((res) => {
                if (res.status === 200) {
                    dispatch(alert_show({
                        type: "success",
                        message: res.data.result.message
                    }))
                    setUpdateLoader(false)
                } else {
                    throw Error("Some Unknown Error Occred");
                }
            })
            .catch((err) => {
                if (err?.response?.data?.error?.message) {
                    dispatch(alert_show({
                        type: "error",
                        message: err.response.data.error.message
                    }))
                }
                else {
                    dispatch(alert_show({
                        type: "error",
                        message: "Some Unknown Error Occured ! Please Check your network once"
                    }))
                }
                setUpdateLoader(false);
            })
    }

    const getMyCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                setInputVal((prv) => {
                    return {
                        ...prv,
                        location: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    }
                })
            });
        }
        else {
            dispatch(alert_show({
                type: "warning",
                message: "Geolocation is not supported for this browser."
            }))
        }
    }

    return (
        <>
            {
                (!profileEdit.have) ? <div className='w-full p-4 rounded-xl'>Loading...</div> : (<div className='w-full p-4 rounded-xl'>
                    <div>
                        <h2 className='font-inter text-2xl font-semibold'>Edit Profile</h2>
                        <div className='w-full mt-5 font-inter'>
                            <div className='w-full flex gap-4 mb-5'>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <label className='text-sm' htmlFor='name'>Name</label>
                                    <input className='border p-2 w-full rounded-md' type="text" onChange={handleOnChange} placeholder='Name' value={inputVal.name} required={true} name="name" />
                                </div>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <label className='text-sm' htmlFor='name'>Mobile Number</label>
                                    <input readOnly={true} className='border p-2 w-full rounded-md' type="text" name="phone" value={inputVal.phone} onChange={handleOnChange} required={true} placeholder='Phone' />
                                </div>
                            </div>
                            <div className='w-full flex gap-4 mb-5'>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <label className='text-sm' htmlFor='state'>State</label>
                                    <select className='w-full p-2 rounded-md border' name='state' value={inputVal.state} onChange={onSelectState}>
                                        <option>
                                            Select State
                                        </option>
                                        {
                                            (allStates && allStates.length > 0) ? <>
                                                {
                                                    allStates.map((el, index) => {
                                                        return <option key={index} value={el.name}>{el.name}</option>
                                                    })
                                                }
                                            </> : <></>
                                        }
                                    </select>
                                </div>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <label className='text-sm' htmlFor='city'>City</label>
                                    <select className='w-full p-2 rounded-md border' name='city' value={inputVal.city} onChange={handleOnChange}>
                                        <option>
                                            {
                                                (!inputVal.state) ? "Select State First" : "Select City"
                                            }
                                        </option>
                                        {
                                            (cityByState && cityByState.length > 0) ? <>
                                                {
                                                    cityByState.map((el, index) => {
                                                        return <option key={index} value={el}>{el}</option>
                                                    })
                                                }
                                            </> : <>Select State First</>
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='w-full flex gap-4 mb-5'>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <label className='text-sm' htmlFor='pincode' >Pincode</label>
                                    <input className='border p-2 w-full rounded-md' value={inputVal.pincode} required={true} type="text" onChange={handleOnChange} placeholder='Number' name="pincode" />
                                </div>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <label className='text-sm' htmlFor='location'>Location</label>
                                    <div className='w-full flex border items-center rounded'>
                                        <input className=' p-2 w-full ' type="text" name="location" value={`${(inputVal.location.latitude && inputVal.location.longitude) ? inputVal.location.latitude + "-" + inputVal.location.longitude : ""}`} onChange={handleOnChange} required={true} placeholder='Location' />
                                        <div>
                                            <button onClick={getMyCurrentLocation} className='w-max border-l p-2 hover:bg-bodyBackground'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                (profileEdit?.userType === "worker") && <div className='w-full flex gap-4 mb-5'>
                                    <div className='flex flex-1 flex-col gap-2'>
                                        <label className='text-sm' htmlFor='workingDistance'>Working Distance</label>
                                        <input className='border p-2 w-full rounded-md' type="text" onChange={handleOnChange} placeholder='Working Distance' value={inputVal.workingDistance} required={true} name="workingDistance" />
                                    </div>
                                    <div className='flex flex-1 flex-col gap-2'>
                                        <label className='text-sm' htmlFor='workPriorities'>Work Priorities</label>
                                        <input className='border p-2 w-full rounded-md' type="text" onChange={handleOnChange} required={true} name="workPriorities" value={inputVal.workPriorities} placeholder='Priorities' />
                                    </div>
                                </div>
                            }
                            <div className='w-full flex gap-4 mb-5'>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <label className='text-sm' htmlFor='address'>Address</label>
                                    <input className='border p-2 w-full rounded-md' type="text" onChange={handleOnChange} value={inputVal.address} required={true} placeholder='Address' name="address" />
                                </div>
                            </div>
                            {
                                (profileEdit?.userType === "worker") && <div className='w-full flex gap-4 mb-5'>
                                    <div className='flex flex-1 flex-col gap-2'>
                                        <label className='text-sm' htmlFor='summary'>Summary</label>
                                        <textarea required={true} className='border p-2 w-full h-[150px] resize-none rounded-md' onChange={handleOnChange} placeholder='Enter min 20 words summary' value={inputVal.summary} name="summary">
                                        </textarea>
                                    </div>
                                </div>
                            }

                            <div className='w-full flex  justify-end'>
                                <button disabled={updateLoader} onClick={updateProfileDetails} className='bg-goOnline p-2 pl-4 pr-4 rounded-md text-white hover:bg-goOnline1'>
                                    {
                                        updateLoader ? `Updating...` : `Update`
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}

export default ProfileEdit