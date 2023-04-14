import React, { FC, Suspense } from "react"

import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./i18n"
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogI/LogInPage.js";
import LogInProtectedRoute from "./components/Common/LogInProtectedRoute";
import LogOutProtectedRoute from "./components/Common/LogOutProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { alert_hide } from "../src/store/action/index.js";
import { Snackbar, Alert } from "@mui/material";
import Explore from "./pages/Explore";
import PostWorkPage from "./pages/PostWorkPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import UpdateWorkPage from "./pages/UpdateWorkPage";
import WorkSearchPage from "./pages/WorkSearchPage";
import WorkerSearchPage from "./pages/WorkerSearchPage";
import WorkerContactPage from "./pages/WorkerContactPage";
import ViewWorkPage from "./pages/ViewWorkPage";
import UserWorkProposal from "./components/UserWorkProposal/UserWorkProposal";
import UserWorkProposalRight from "./components/UserWorkProposal/UserWorkProposalRight";
import WorkerProposalStatusPage from "./pages/WorkerProposalStatusPage";
import NoWorkId from "./components/Common/NoWorkId";
import MessageForWorkerPage from "./pages/MessageForWorkerPage";
import AboutPage from "./pages/AboutPage";


// App start from here
const App = () => {

  const alertReducer = useSelector((state) => {
    return state.alertReducer;
  });
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(alert_hide());
  };

  return (
    <div className="App">
      <div style={{
        background: "linear-gradient(180deg, #DAE2FF 0%, rgba(243, 255, 239, 0) 100%)"
      }}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/work" element={<LogInProtectedRoute />}>
              <Route path="post" element={<PostWorkPage />} />
              <Route path="edit" element={<UpdateWorkPage />} />
              <Route path=":workId" element={<ViewWorkPage />} />
              <Route path="proposals" element={<UserWorkProposal />} >
                <Route path="" element={<NoWorkId />} />
                <Route path=":workId" element={<UserWorkProposalRight />} />
              </Route>
            </Route>
            <Route path="/worker" element={<LogInProtectedRoute />}>
              <Route path="proposalstatus" element={<WorkerProposalStatusPage />} />
              <Route path="contact/:workerId" element={<WorkerContactPage />} />
            </Route>
            <Route path="/auth" element={<LogOutProtectedRoute />}>
              <Route path="signup" element={<SignUpPage />} />
              <Route path="login" element={<LogInPage />} />
            </Route>
            <Route path="/user" element={<LogInProtectedRoute />}>
              <Route path={"profile"} element={<ProfilePage />} />
              <Route path={"messages"} element={<MessageForWorkerPage />} />
            </Route>
            <Route path="/search" element={<LogInProtectedRoute />}>
              <Route path="work" element={<WorkSearchPage />} />
              <Route path="worker" element={<WorkerSearchPage />} />
            </Route>
          </Routes>

          {/* notification handle */}
          <Snackbar
            open={alertReducer.status}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={alertReducer.type}
              sx={{ width: "100%" }}
            >
              {alertReducer.message}
            </Alert>
          </Snackbar>
        </Suspense>
      </div>
    </div >
  );
}

export default App;
