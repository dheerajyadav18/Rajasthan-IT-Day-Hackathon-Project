import React from "react";
import $ from "jquery";
import sidebar_top_image from "../../../images/sidebar_top.jpg";
import {Link } from "react-router-dom";

const WorkerSearchResultComponent = ({ showWorker, searchVal }) => {
  const leftSwipeSearchResultComponent = () => {
    console.log("hello");
    let elem = $("#search_result_component");
    if (elem.hasClass("left-0")) {
      elem.removeClass("left-0");
      elem.addClass("-left-[370px]");
      $("#leftSwipeIconSearchResultComponent").addClass("rotate-180");
    } else if (elem.hasClass("-left-[370px]")) {
      elem.removeClass("-left-[370px]");
      elem.addClass("left-0");
      $("#leftSwipeIconSearchResultComponent").removeClass("rotate-180");
    }
  };
  return (
    <>
      <div
        id="searchResultSidebarContainer"
        className="w-full relative h-full overflow-y-auto overflow-x-hidden"
      >
        <div className="w-full">
          <img className="w-full" src={sidebar_top_image} />
        </div>

        <div className="pl-6 pr-4 pt-4 text-gray-800 text-sm">
          <h3>Showing Result for - {searchVal}</h3>
        </div>
        <ul className="w-full p-2">
          {showWorker &&
            showWorker.length > 0 ?
            showWorker.map((el, index) => {
              return (
                <li key={index} className="w-full border-b border-gray-300 p-2" id={`${el._id}`}>
                  <Link to={`/worker/contact/${el.userId._id}`} className="w-full h-full flex gap-2 ">
                  <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                  <div>
                    <h2 className="text-lg font-medium"> {el?.userId?.name} </h2>
                    <h4 className="text-gray-900 text-sm">{el.city} {el.state} </h4>
                  </div></Link>
                </li>
              );
            }):<>No Worker found</>}
        </ul>
      </div>
      <div
        onClick={leftSwipeSearchResultComponent}
        className="absolute -right-6 top-[47vh]  rounded-r-md flex items-center justify-center hover:bg-gray-100 bg-white h-[6vh] cursor-pointer"
      >
        <svg
          id="leftSwipeIconSearchResultComponent"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6  transition-all ease-in-out transition-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
      </div>
    </>
  );
};

export default WorkerSearchResultComponent;
