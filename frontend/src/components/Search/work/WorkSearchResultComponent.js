import React from 'react';
import $ from "jquery";
import sidebar_top_image from "../../../images/sidebar_top.jpg"
import { Link } from 'react-router-dom';

const WorkSearchResultComponent = ({ searchResult, searchVal }) => {

    const leftSwipeSearchResultComponent = () => {
        console.log("hello");
        let elem = $('#search_result_component');
        if (elem.hasClass("left-0")) {
            elem.removeClass("left-0");
            elem.addClass("-left-[370px]");
            $("#leftSwipeIconSearchResultComponent").addClass("rotate-180")
        }
        else if (elem.hasClass("-left-[370px]")) {
            elem.removeClass("-left-[370px]");
            elem.addClass("left-0");
            $("#leftSwipeIconSearchResultComponent").removeClass("rotate-180")
        }
    }
    return (
        <>
            {
                (searchResult.have) ? <><div id='searchResultSidebarContainer' className='w-full relative h-full overflow-y-auto overflow-x-hidden' >
                    <div className='w-full'>
                        <img className='w-full' src={sidebar_top_image} />
                    </div>

                    <div className='pl-6 pr-4 pt-4 text-gray-800 text-sm'>
                        <h3>Showing Result for - {searchVal}</h3>
                    </div>

                    <ul className='w-full '>

                        {
                            (searchResult.works && searchResult.works.length > 0) ? <>
                                {
                                    searchResult.works.map((el, index) => {
                                        return <li key={index} className='w-full flex justify-around gap-2 px-4 border-b border-gray-300 p-2 cursor-pointer hover:bg-[#ececec] transition-all transition-300 ease-in-out'>
                                            {/* <div className='w-12 h-12 bg-gray-600 rounded-full'></div> */}
                                            <Link to={"/work/" + el?._id} className="w-full h-full  flex justify-around">
                                                <div>
                                                    <h2 className='text-md font-medium'>{el?.workHeading} </h2>
                                                    <h4 className='text-sm text-gray-800'>{`${el?.workCity},${el?.workState}`}</h4>
                                                    <h4 className='text-sm text-gray-800'>{el?.workTime}</h4>
                                                    <h4 className='text-sm text-gray-800 flex gap-3'>
                                                        <span className='flex gap-1 items-center justify-center'>
                                                            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            </span>{el?.payRange}</span><span>+91 {el?.userId?.phone}</span></h4>
                                                </div>
                                                <div className='flex flex-col item-center justify-center text-[#1976d2]'>
                                                    <div className='p-2 text-[#1976d2]  flex flex-col items-center justify-center w-10 h-10 border rounded-full' style={{ borderColor: "#1976d2" }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                                    </svg>

                                                    </div>
                                                    <h4 className='text-sm w-max mx-auto mt-1'>Visit</h4>
                                                </div></Link>
                                        </li>
                                    })
                                }
                            </> : <>
                                No work Found
                            </>
                        }

                        {/* payRange,workTime,workHeading,workCity ,userPhone */}

                    </ul>
                </div>
                    <div onClick={leftSwipeSearchResultComponent} className='absolute -right-6 top-[47vh]  rounded-r-md flex items-center justify-center hover:bg-gray-100 bg-white h-[6vh] cursor-pointer'>
                        <svg id='leftSwipeIconSearchResultComponent' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  transition-all ease-in-out transition-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </div></> : (<>Loading..</>)
            }
        </>
    )
}

export default WorkSearchResultComponent;