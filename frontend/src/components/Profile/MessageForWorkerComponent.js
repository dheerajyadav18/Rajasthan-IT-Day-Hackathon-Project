import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstanceWithHeader } from '../../axois';
import { alert_show } from '../../store/action';
import moment from 'moment';

const MessageForWorkerComponent = () => {
    const [loader, setLoader] = useState(true);
    const [allMessages, setAllMessages] = useState([]);
    const userReducer = useSelector((state) => {
        return state.userReducer;
    })

    const dispatch = useDispatch();
    useEffect(() => {
        setLoader(true);

        axiosInstanceWithHeader.get("/api/v1/worker/getAllMessageOfLogInWorker")
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setAllMessages(() => {
                        return res.data.result.allMessages
                    })
                    dispatch(alert_show({
                        type: "success",
                        message: "Page Loaded ..."
                    }))
                    setLoader(false)
                }
                else {
                    throw Error("Some Unknown error occured");
                }
            }).catch((err) => {
                if (err?.response?.data?.error?.message) {
                    dispatch(alert_show({
                        type: "error",
                        message: err.response.data.error.message
                    }))
                }
                else {
                    dispatch(alert_show({
                        type: "error",
                        message: err.response.data.error.message
                    }))
                }

                setLoader(false);
            })
    }, [])
    return (
        <div className='w-full'>
            <div className='w-[80%] mx-auto mt-12 py-2 bg-bodyBackground sticky top-0 '>
                <div className='bg-white rounded-xl p-4 shadow-sm'>
                    <div className='w-full '>
                        <div className='flex items-center gap-2'>
                            <h2 className='text-2xl font-medium '>Messages for :  </h2>
                            {loader ? <h4 className='text-xl h-6 rounded-md w-28 bg-bodyBackground animate-pulse' ></h4> : <h4 className='text-md' >{userReducer && userReducer && userReducer.userDetails.name}</h4>}
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-[80%] mx-auto mt-2 rounded-xl p-4'>

                {
                    (loader) ? <div className='w-[90%] mx-auto bg-white p-4 rounded-md mb-2'>
                        <h6 className='text-sm text-gray-800 w-28 h-2 bg-bodyBackground animate-pulse mb-2'>    </h6>
                        <h2 className='text-md font-medium mb-4 w-60 h-4 bg-bodyBackground animate-pulse'></h2>
                        <ul>
                            <li className='text-md font-medium w-36 h-4 bg-bodyBackground animate-pulse mb-2'></li>
                            <li className='text-md font-medium  w-36 h-4 bg-bodyBackground animate-pulse mb-2'></li>
                            <li className='text-md font-medium  w-36 h-4 bg-bodyBackground animate-pulse mb-2'></li>
                            <li className='text-md font-medium w-36 h-4 bg-bodyBackground animate-pulse mb-2'></li>
                        </ul>
                        <p className='border p-4 bg-bodyBackground animate-pulse w-full h-10 rounded-xl'>

                        </p>
                    </div> :
                        (allMessages && allMessages.length > 0) ? allMessages.map((el, index) => {
                            return <div className='w-[90%] mx-auto bg-white p-4 rounded-md mb-2'>
                                <h6 className='text-sm text-gray-800 mb-2'>{moment(el.createdAt).calendar()}     </h6>
                                <h2 className='text-md font-medium mb-2'>You have an Enquiry from :- <span className='font-normal'>{el?.userId?.name}</span></h2>
                                <ul>
                                    <li className='text-md font-medium mb-2'>Name : <span className='font-normal'>{el?.userId?.name}</span></li>
                                    <li className='text-md font-medium mb-2'>Email : <span className='font-normal'>{el?.userId?.email}</span></li>
                                    <li className='text-md font-medium mb-2'>Phone : <span className='font-normal'>+91 {el?.userId?.phone}</span></li>
                                </ul>
                                <p className='border p-4 rounded-xl'>
                                    {el?.message}
                                </p>
                            </div>
                        }) : <div>No Messages to show</div>
                }
            </div>
        </div>
    )
}

export default MessageForWorkerComponent