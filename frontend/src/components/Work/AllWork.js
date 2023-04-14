import React, { useEffect, useState } from 'react'
import SliderComponent from './SliderComponent'
import WorkPost from './WorkPost';
import Slider from '@mui/material/Slider';
import { axiosInstance } from '../../axois';
import { useDispatch } from 'react-redux';
import { alert_show } from '../../store/action';
import { useTranslation } from "react-i18next";


const AllWork = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const [allWorks, setAllWorks] = useState({ have: false, works: [] });
  const [showWorks, setShowWorks] = useState([]);
  const [searchFilter, setSearchFilter] = useState({
    payRange: "0-100000",
    categories: [false, false, false, false, false],
    distance: 100,
  })

  useEffect(() => {
    axiosInstance.get("/api/v1/work/explore/getAll")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setAllWorks(() => {
            return {
              have: true,
              works: res.data.result.works
            }
          })
        }
        else {
          throw Error("Some Unknown error occured");
        }
      }).catch((err) => {
        console.log(err);
        if (err?.response?.data?.error?.message) {
          dispatch(alert_show({
            type: "error",
            message: err.response.data.error.message
          }))
        }
        else {
          dispatch(alert_show({
            type: "error",
            message: "Some Unknow Error Occured"
          }))
        }
      })
  }, [])


  useEffect(() => {
    if (allWorks.have) {
      setShowWorks(() => {
        return allWorks.works;
      });
    }
  }, [allWorks])

  const onCheckBoxChange = (e, index) => {
    console.log(index)
    setSearchFilter((prv) => {
      const newCategoriesState = prv.categories.map((el, i) => {
        return (i === index) ? !el : el;
      })
      return {
        ...prv,
        categories: newCategoriesState
      }
    })
  }

  useEffect(() => {
    console.log(showWorks)
  }, [showWorks])
  useEffect(() => {
    console.log(searchFilter)
  }, [searchFilter])


  const applySearchFilter = () => {
    const filterPayRange = searchFilter.payRange.split("-");
    
    setShowWorks(()=>{
      return allWorks.works.filter((el, index)=>{
        return (parseInt(filterPayRange[0] )<= el.payRange && el.payRange <= parseInt(filterPayRange[1]))
      })
    })
  
  }
  return (
    <div className='w-full font-inter'>
      {/* <SliderComponent /> */}
      <div className='w-full mt-12  ' style={{ zIndex: 100 }}>
        <div className='w-[80%] flex justify-between items-center mx-auto'>
          <h2 className='pt-5 pb-5 text-4xl font-semibold text-[#ff3]'>{t("findwork")}</h2>
          <div className='w-[28%] flex rounded-md overflow-hidden border'>
            <input className='p-2 focus:outline-0 w-full' type={"search"} name="searchVal" />
            <button className='px-4 bg-goOnline text-white rounded-r-md'>{t("search")}</button>
          </div>
        </div>
      </div>
      <div className='w-[80%] mx-auto flex justify-between'>
        <div className='w-[70%]'>
          {
            (allWorks && allWorks.have) ? <>
              {
                (showWorks && showWorks.length > 0) ? showWorks.map((el, index) => {
                  return <WorkPost key={index} work={el} />
                }) : <>Now work found</>
              }
            </> : <>
              {/* loading */}
              <div className='w-full animate-pulse rounded-xl  mb-8 shadow-md shadow-gray-300 bg-white p-8'>
                <div className='flex justify-between border-b '>
                  <div className='pb-2 rounded-t-md flex gap-2'>
                    <div className='w-10 h-10 rounded-full bg-bodyBackground'>

                    </div>
                    <div>
                      <h4 className='text-md font-medium w-24 h-8 bg-bodyBackground'></h4>
                      <h6 className='text-[12px] text-gray-800 font-medium w-16 bg-bodyBackground mt-1 h-5'></h6>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 h-8 bg-bodyBackground w-20'>


                  </div>
                </div>
                <div className='mt-2'>
                  <div className='flex mt-4 '>
                    <h4 className='text-md  bg-bodyBackground font-semibold w-[250px] rounded-md h-6'></h4>
                    <div className='flex'>
                      <span ></span>
                    </div>
                  </div>
                  <div className='flex mt-2'>
                    <h4 className='text-md bg-bodyBackground font-semibold  w-[250px] rounded-md h-6 '></h4>
                    <span></span>
                  </div>
                </div>
                <div className='pt-2 mt-4 pb-2'>
                  <p className='border p-4 rounded-xl bg-bodyBackground h-20'>

                  </p>
                </div>
                <div className='pl-4 pr-4 pb-2 pt-2'>
                  <div className='flex gap-1'>
                    <span className='inline-block h-3 w-16 py-2  bg-bodyBackground '></span>
                    <span className='inline-block h-3 w-16 py-2 bg-bodyBackground'></span>
                  </div>
                </div>
                <div className='flex gap-4 pt-4 font-[500]'>
                  <button className='bg-[#eeeeee] p-2 pl-6 pr-6 w-32 h-10 rounded-md flex gap-2'>

                    <h6></h6>
                  </button>
                  <button className='bg-[#eeeeee] p-2 pl-6 pr-6 w-32 rounded-md flex gap-2'>


                    <h6></h6>
                  </button>
                  <button className="bg-[#eeeeee] p-2 pl-6 pr-6 w-32 rounded-md">

                  </button>
                  <button className="bg-[#eeeeee] p-2 pl-6 pr-6 w-32 rounded-md flex gap-2">

                    <h6></h6>
                  </button>
                </div>

                <div className="mt-4 border-t pt-2">
                  <button className="w-20 bg-bodyBackground h-5 rounded-md">

                  </button>
                </div>
              </div>
              <div className='w-full animate-pulse rounded-xl  mb-8 shadow-md shadow-gray-300 bg-white p-8'>
                <div className='flex justify-between border-b '>
                  <div className='pb-2 rounded-t-md flex gap-2'>
                    <div className='w-10 h-10 rounded-full bg-bodyBackground'>

                    </div>
                    <div>
                      <h4 className='text-md font-medium w-24 h-8 bg-bodyBackground'></h4>
                      <h6 className='text-[12px] text-gray-800 font-medium w-16 bg-bodyBackground mt-1 h-5'></h6>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 h-8 bg-bodyBackground w-20'>


                  </div>
                </div>
                <div className='mt-2'>
                  <div className='flex mt-4 '>
                    <h4 className='text-md  bg-bodyBackground font-semibold w-[250px] rounded-md h-6'></h4>
                    <div className='flex'>
                      <span ></span>
                    </div>
                  </div>
                  <div className='flex mt-2'>
                    <h4 className='text-md bg-bodyBackground font-semibold  w-[250px] rounded-md h-6 '></h4>
                    <span></span>
                  </div>
                </div>
                <div className='pt-2 mt-4 pb-2'>
                  <p className='border p-4 rounded-xl bg-bodyBackground h-20'>

                  </p>
                </div>
                <div className='pl-4 pr-4 pb-2 pt-2'>
                  <div className='flex gap-1'>
                    <span className='inline-block h-3 w-16 py-2  bg-bodyBackground '></span>
                    <span className='inline-block h-3 w-16 py-2 bg-bodyBackground'></span>
                  </div>
                </div>
                <div className='flex gap-4 pt-4 font-[500]'>
                  <button className='bg-[#eeeeee] p-2 pl-6 pr-6 w-32 h-10 rounded-md flex gap-2'>

                    <h6></h6>
                  </button>
                  <button className='bg-[#eeeeee] p-2 pl-6 pr-6 w-32 rounded-md flex gap-2'>


                    <h6></h6>
                  </button>
                  <button className="bg-[#eeeeee] p-2 pl-6 pr-6 w-32 rounded-md">

                  </button>
                  <button className="bg-[#eeeeee] p-2 pl-6 pr-6 w-32 rounded-md flex gap-2">

                    <h6></h6>
                  </button>
                </div>

                <div className="mt-4 border-t pt-2">
                  <button className="w-20 bg-bodyBackground h-5 rounded-md">

                  </button>
                </div>
              </div>
            </>
          }
        </div>
        <div id='rightPartInAllWork' className='w-[28%] h-[85vh] sticky top-20 rounded-md'>
          <div className='w-full rounded-md p-4 mb-8  shadow-md bg-white' >
            <h4 className='text-md font-semibold mb-2'>{t("pay range")} :</h4>
            <div className='w-full flex items-center gap-2'>
              <input name="pay_range" value={"0-100000"} onChange={(e) => {
                setSearchFilter((prv) => {
                  return {
                    ...prv,
                    payRange: e.target.value
                  }
                })
              }} checked={searchFilter.payRange === "0-100000"} className='w-4 h-4 cursor-pointer' type={"radio"} />
              <label htmlFor='pay_range'>{t("all")}</label>
            </div>
            <div className='w-full flex items-center gap-2'>
              <input name="pay_range" value={"200-500"} onChange={(e) => {
                setSearchFilter((prv) => {
                  return {
                    ...prv,
                    payRange: e.target.value
                  }
                })
              }} checked={searchFilter.payRange === "200-500"} className='w-4 h-4 cursor-pointer' type={"radio"} />
              <label htmlFor='pay_range'>{t("between")} 200-500</label>
            </div>
            <div className='w-full flex items-center gap-2'>
              <input name="pay_range" value={"500-800"} onChange={(e) => {
                setSearchFilter((prv) => {
                  return {
                    ...prv,
                    payRange: e.target.value
                  }
                })
              }} checked={searchFilter.payRange === "500-800"} className='w-4 h-4 cursor-pointer' type={"radio"} />
              <label htmlFor='pay_range'>{t("between")} 500-800</label>
            </div>
            <div className='w-full flex items-center gap-2'>
              <input name="pay_range" value={"800-1000"} onChange={(e) => {
                setSearchFilter((prv) => {
                  return {
                    ...prv,
                    payRange: e.target.value
                  }
                })
              }} checked={searchFilter.payRange === "800-1000"} className='w-4 h-4 cursor-pointer' type={"radio"} />
              <label htmlFor='pay_range'>{t("between")} 800-1000</label>
            </div>
            <div className='w-full flex items-center gap-2'>
              <input name="pay_range" value={"1000-100000"} onChange={(e) => {
                setSearchFilter((prv) => {
                  return {
                    ...prv,
                    payRange: e.target.value
                  }
                })
              }} checked={searchFilter.payRange === "1000-100000"} className='w-4 h-4 cursor-pointer' type={"radio"} />
              <label htmlFor='pay_range'>{t("above")} 1000</label>
            </div>
          </div>

          {/* Categories wise */}
          <div className='w-full rounded-md p-4 mb-8 bg-white'>
            <h4 className='text-md font-semibold mb-2'>{t("categories")} :</h4>
            <div className='w-full flex items-center gap-2'>
              <input onChange={(e) => { onCheckBoxChange(e, 0) }} checked={searchFilter.categories[0]} name="categories" value={"daily"} className='w-4 h-4 cursor-pointer' type={"checkbox"} />
              <label htmlFor='pay_range'>{t("daily based")}</label>
            </div>
            <div className='w-full flex items-center gap-2'>
              <input onChange={(e) => { onCheckBoxChange(e, 1) }} checked={searchFilter.categories[1]} name="categories" value={"contract"} className='w-4 h-4 cursor-pointer' type={"checkbox"} />
              <label htmlFor='pay_range'>{t("contract based")}</label>
            </div>
            <div className='w-full flex items-center gap-2'>
              <input onChange={(e) => { onCheckBoxChange(e, 2) }} checked={searchFilter.categories[2]} name="categories" value={"salary"} className='w-4 h-4 cursor-pointer' type={"checkbox"} />
              <label htmlFor='pay_range'>{t("salary based")}</label>
            </div>
            <div className='w-full flex items-center gap-2'>
              <input onChange={(e) => { onCheckBoxChange(e, 3) }} checked={searchFilter.categories[3]} name="categories" value={"monthly"} className='w-4 h-4 cursor-pointer' type={"checkbox"} />
              <label htmlFor='pay_range'>{t("monthly")}</label>
            </div>
            <div className='w-full flex items-center gap-2'>
              <input onChange={(e) => { onCheckBoxChange(e, 4) }} checked={searchFilter.categories[4]} name="categories" value={"daily"} className='w-4 h-4 cursor-pointer' type={"checkbox"} />
              <label htmlFor='pay_range'>{t("daily work")}</label>
            </div>
          </div>

          <div className='w-full rounded-md p-4 mb-4 bg-white'>
            <h4 className='text-md font-semibold mb-2'>{t("distance")} : <span className='text-sm font-normal text-gray-'>(in km)</span></h4>
            <div>
              <Slider
                value={searchFilter.distance}
                aria-label="Small"
                onChange={(e) => {
                  setSearchFilter((prv) => {
                    return {
                      ...prv,
                      distance: e.target.value
                    }
                  })
                }}
                valueLabelDisplay="auto" />
            </div>
          </div>
          <div className='w-full rounded-md p-4 pr-0 mb-8 flex justify-end'>
            <button onClick={applySearchFilter} className='p-2 pl-5 pr-5 rounded-md bg-goOnline1 hover:bg-neutral-700 transition-all ease-in-out transition-300 text-white '>Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllWork