import { React, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstanceWithHeader } from "../../axois";
import { useDispatch } from "react-redux";
import { alert_show } from "../../store/action";
import { useNavigate } from "react-router-dom";

const WorkerContactLeft = () => {
  const [workerContact, setWorkerContact] = useState({
    message: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const requiredSubmit = async (e) => {
    e.preventDefault();
    const requestSend = async () => {
      axiosInstanceWithHeader
        .post("/api/v1/worker/contact-worker-send-message", {
          message: workerContact.message,
          workerId: params.workerId,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setWorkerContact({
              workDescription: "",
              
            });
            dispatch(
              alert_show({
                type: "success",
                message: response.data.result.message,
              })
            );
          } else {
            throw Error("Some Unknown Error Occred");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.data?.error?.message) {
            dispatch(
              alert_show({
                type: "error",
                message: err.response.data.error.message,
              })
            );
          } else {
            dispatch(
              alert_show({
                type: "error",
                message:
                  "Some Unknown Error Occured ! Please Check your network once",
              })
            );
          }
        });
    };
    await requestSend();
  };
  const handleInput = (e) => {
    setWorkerContact((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="bg-white w-full rounded-md">
        <div>
          <div>
            <form onSubmit={requiredSubmit}>
              <div className="sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <span className="font-bold text-lg text-black ml-18 ">
                    Make Your Proposal
                  </span>
                  <div className="grid grid-cols-6 gap-6 mt-2">
                    <div className="col-span-6 ">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        name="message"
                        onChange={handleInput}
                        style={{ border: "solid 1px #cfc9c9" }}
                        className="mt-1 p-2 block w-full h-40 resize-none rounded-md border-gray-300  sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerContactLeft;
