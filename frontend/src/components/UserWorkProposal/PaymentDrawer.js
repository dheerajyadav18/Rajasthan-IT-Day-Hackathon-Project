import { Avatar } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom"
import { axiosInstanceWithHeader } from '../../axois';
import { alert_show } from '../../store/action';
import $ from "jquery"

const PaymentDrawer = ({ proposaForPayment }) => {

  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const [approvedProposal, setApprovedProposal] = useState([])

  useEffect(() => {
    // console.log(proposaForPayment)

    // axiosInstanceWithHeader.get("/api/v1/payment/getPaymentDetailByProposalId/" + el._id)
    // .then((res) => {
    //  return  {
    //   ...el,
    //   amountleft: el.proposalPay - ((res?.data?.result?.requiredPaymentDetail) ? res.data.result.requiredPaymentDetail.amount : 0),
    //   amountPaid: ((res?.data?.result?.requiredPaymentDetail) ? res.data.result.requiredPaymentDetail.amount : 0)
    // }
    // }).catch((err) => {
    //   return {}
    //   console.log(err)
    // })

    setApprovedProposal(proposaForPayment)

    setLoader(false)
  }, [proposaForPayment])

  // useEffect(() => {
  //   console.log(approvedProposal)
  // }, [approvedProposal])


  const payMoneyToProposal = (e, proposalId) => {
    console.log(proposalId)
    const value = $(`#${proposalId}`).val();
    console.log(value);
    axiosInstanceWithHeader.post("/api/v1/payment/pay", {
      workId: params.workId,
      proposalId: proposalId,
      amount: value
    }).then((res) => {
      // console.log(res);
      console.log( res.data.result.message);
      if (res.status === 200) {
        dispatch(alert_show({
          type: "success",
          message: res.data.result.message
        }))
      }
      else throw Error("Some unknown error occured")
    }).catch((err) => {
      console.log(err.response)
      if (err?.response?.data?.error?.message) {
        dispatch(alert_show({
          type: "error",
          message: err.response.data.error.message
        }))
      }
      else {
        dispatch(alert_show({
          type: "error",
          message: "Some Unknown errror occured."
        }))
      }
    })
  }

  const updateWorkCompletedStatus = (req, res) =>{
    axiosInstanceWithHeader.get("/api/v1/work/updateWorkCompletedStatus/"+params.workId)
    .then((res)=>{
      dispatch(dispatch(alert_show({
        type:"success",
        message:res.data.result.message
      })))
    }).catch((err)=>{
      console.log(err)
      if (err?.response?.data?.error?.message) {
        dispatch(alert_show({
          type: "error",
          message: err.response.data.error.message
        }))
      }
      else {
        dispatch(alert_show({
          type: "error",
          message: "Some Unknown errror occured."
        }))
      }
    })
  }

  return (
    <div>
      <div className='w-[400px] p-4'>
        <div className='border-b w-full flex justify-between p-2'>
        <h2 className="text-lg font-medium w-full ">
          Payment Reamining
        </h2>
        <button onClick={()=>{
          updateWorkCompletedStatus()
        }} className='px-4 py-2 bg-goOnline text-white rounded-md'>Refresh</button>
        </div>
        <div className='mt-5 w-full'>
          {
            (loader) ? <>Loading ... </> :
              <>
                {
                  (approvedProposal && approvedProposal.length > 0) ?
                    approvedProposal.map((el, index) => {
                      return <div key={index} className='w-full border-b p-2'>
                        <div className='flex gap-2 w-full  '>
                          <Avatar />
                          <div className='flex items-center w-full'>
                            <div className='w-1/2'>
                              <h2 className='text-lg font-semibold'>{(el?.workerId?.name) ? el.workerId.name : "-"}</h2>
                              <h2 className='text-[12px] font-medium text-gray-800'>{moment(el.createdAt).calendar()}</h2>
                            </div>
                            <div className='w-1/2'>
                              <h2 className='text-[12px] font-medium text-gray-800'>Payment : {el.proposalPay}</h2>
                              {/* <h2 className='text-[12px] font-medium text-gray-800'>Paid : 300</h2> */}
                            </div>

                          </div>

                        </div>
                        <div className='flex mt-2 gap-1'>
                          <input id={`${el._id}`} className='border p-2 rounded-md' />
                          <button onClick={(e) => {
                            payMoneyToProposal(e, el._id)
                          }} className='px-5 py-1 bg-goOnline text-white rounded-md'>Pay</button>
                        </div>
                      </div>
                    }) : <>No Approved proposal there</>
                }
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default PaymentDrawer