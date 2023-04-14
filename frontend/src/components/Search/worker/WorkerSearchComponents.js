import React, { useEffect, useState } from "react";
import MapContainerComponent from "../MapContainerComponent";
import SearchComponentHeader from "../SearchComponentHeader";
import no_result_found_image from "../../../images/no_result_image_found.webp";
import search_image_with_type from "../../../images/search_image_with_type1.png";
import { useDispatch } from "react-redux";
import { alert_show } from "../../../store/action";
import WorkerSearchResultComponent from "./WorkerSearchResultComponent"
import $ from "jquery";
import axios from "axios";
const WorkerSearchComponents = () => {
  // state variable

  const [searchVal, setSearchVal] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [markersData, setMarkersData] = useState([]);
  // hooks

  const dispatch = useDispatch();


  // onChange
  const [locationArray, setLocationArray] = useState([]);

  const handleOnChange = async (e) => {
    setSearchVal(e.target.value);
    if((e.target.value).length === 0) return ;

    await axios
      .get(
        `https://rajasthan-it-day-hackathon.vercel.app/api/v1/search/cityandstate?state=${e.target.value}&&city=${e.target.value}`
      )
      .then((res) => {
        setSearchResult(() => {
          return res.data.result;
        })
      })
      .catch((err) => {
        if (err?.response?.data?.error?.message) {
          dispatch({
            type: "error",
            message: err.response.data.error.message
          })
        }
        else {
          dispatch({
            type: "error",
            message: "Unable to load at the moment please check your internet connection once"
          })
        }
      });
  };

  const filterState = [...new Set(searchResult.map((item) => item))];

  console.log(filterState);
  const handleSearchClick = () => {
    if (!searchVal) {
      dispatch(
        alert_show({
          type: "warning",
          message: "Can not search Empty.",
        })
      );
      return;
    } else {
    }
  };
  const [showWorker, setShowWorker] = useState([]);
  const showSelectedSearchResult = async (state, city) => {
    setSearchVal(`${city},${state}`)
    await axios
      .get(
        `https://rajasthan-it-day-hackathon.vercel.app/api/v1/search/worker?state=${state}&&city=${city}`
      )
      .then((res) => {
        console.log(res);
        setShowWorker([]);
        setMarkersData([]);
        setShowWorker((prv) => {
          return res.data.result;
        })
        setMarkersData(() => {
          return res.data.result.map((el, index) => {
            return {
              location: [el.location.latitude, el.location.longitude],
              tooltip: {
                text: `<a href=${"/worker/contact/"+el.userId._id} className="">${el.userId.name}</a>` // yha pr link dena h isko krenge phir
              },
            };
          });
        });
      })
      .catch((err) => {
        if (err?.response?.data?.error?.message) {
          dispatch({
            type: "error",
            message: err.response.data.error.message
          })
        }
        else {
          dispatch({
            type: "error",
            message: "Unable to load at the moment please check your internet connection once"
          })
        }
      });
    let elem = $("#search_result_component");
    if (elem.hasClass("hidden")) {
      elem.removeClass("hidden");
      elem.addClass("block");
    }
  };

  const handleCancelButtonClickOnSearchBox = () => {
    setSearchVal("");
    let elem = $("#search_result_component");
    if (elem.hasClass("block")) {
      elem.removeClass("block");
      elem.addClass("hidden");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        overflow: "hidden",
        position: "relative",
      }}
      className="mx-auto"
    >
      <MapContainerComponent markersDataprops={markersData} />
      <div
        className="rounded-md absolute top-[25vh]  left-[250px] right-[250px]"
        style={{ zIndex: 100 }}
      >
        <div
          className={`${showSuggestion
              ? "border-b border-gray-200 rounded-t-md"
              : "rounded-md"
            } w-full ease-in-out transition-all transition-300 shadow-xl flex items-center content-center pl-4 bg-white`}
        >
          <div className="flex-1">
            <input
              onFocus={() => {
                setShowSuggestion(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setShowSuggestion(false);
                }, 200);
              }}
              className="rounded-md w-full focus:outline-none text-black"
              value={searchVal}
              onChange={handleOnChange}
              type="search"
              placeholder="Search worker in your city"
              style={{ fontSize: "20px", padding: "15px", fontWeight:"bold" }}
            />
          </div>
          {searchVal.length > 0 && (
            <div className="hover:bg-gray-100 rounded-full p-1 flex items-center content-center">
              {/* <button
                className="text-gray-500 "
                onClick={handleCancelButtonClickOnSearchBox}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button> */}
            </div>
          )}
          <div>
            <button
              onClick={handleSearchClick}
              className="pointer p-2 pr-4 pl-4 text-gray-800 flex items-center content-center border-l border-l-gray-200 hover:text-blue-500 rounded-r-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 font-bold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`${showSuggestion ? "block" : "hidden"
            } rounded-b-md ease-in-out transition-all transition-300 w-full shadow-md  bg-white`}
        >
          {searchResult && searchResult.length > 0 ? (
            <>
              <div className="pt-2 pb-2">
                {searchResult.map((el, index) => {
                  return (
                    <div
                      onClick={() => {
                        showSelectedSearchResult(el.state, el.city);
                      }}
                      key={index}
                      className="p-2 text-gray-800 flex gap-1 hover:bg-gray-100 cursor-pointer ease-in-out transition-all transition-300"
                    >
                      <div className="text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        {el.city} {el.state}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <></>
            // <div className="w-full rounded-b overflow-hidden px-4">
            //   {/* <img
            //     className="w-full  rounded-b"
            //     src={searchVal ? no_result_found_image : search_image_with_type}
            //     alt="no_result_found"
            //   /> */}
            //   <h2 className="font-semibold text-xl">{!searchVal ? "Type Atleast one character...":"No result found..."}</h2>
            // </div>
          )}
        </div>
      </div>
      <div
        id="search_result_component"
        className="hidden transition-all ease-in-out transition-300 absolute top-0 left-0 h-[100vh] w-[370px] bg-white "
        style={{ zIndex: 10 }}
      >
        <WorkerSearchResultComponent showWorker={showWorker} searchVal={searchVal}/>
      </div>
      <div
        className="absolute left-[500px] top-[10px] rounded-md"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 100 }}
      >
        
      </div>
    </div>
  );
};

export default WorkerSearchComponents;
