import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { alert_show, logout } from "../../store/action";
import i18next from "i18next";

const Nav = () => {
  const userReducer = useSelector((state) => {
    return state.userReducer;
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogOutClick = () => {
    dispatch(logout());
    localStorage.clear();
    dispatch(
      alert_show({
        type: "success",
        message: "You logged Out",
      })
    );
  };

  return (
    <header>
      <div className="w-full font-inter">
        <div className="w-[90%] mx-auto pt-4 pb-4 text-goOnline flex justify-between items-center">
          <div className="flex items-center justify-center">
            <div>
              <svg
                width="90"
                height="79"
                viewBox="0 0 90 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
              >
                <rect width="90" height="79" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      href="#image0_15_727"
                      transform="matrix(0.0005 0 0 0.00056962 0 -0.0696203)"
                    />
                  </pattern>
                  <image
                    id="image0_15_727"
                    width="2000"
                    height="2000"
                  />
                </defs>
              </svg>
            </div>
            <h2 style={{
              fontFamily: "Roboto-serif"
            }} className="w-max text-3xl">{t("Shram Saathi")}</h2>
          </div>
          <div className="flex gap-4">
            {userReducer.isLoggedIn ? (
              <>
                <div className="flex justify-center items-center gap-8">
                  <ul className="flex gap-4">
                    <li className="font-medium text-md li:before">
                      <Link to={"/"} className="w-full">
                        {t("home")}
                      </Link>
                    </li>
                    <li className="font-medium text-md">
                      <Link to={"/explore"} className="w-full">
                        {t("explore")}
                      </Link>
                    </li>
                    {userReducer &&
                      userReducer.isLoggedIn &&
                      userReducer.userDetails &&
                      userReducer.userDetails.userType === "user" && (
                        <li className="font-medium text-md">
                          <Link to={"/work/post"} className="w-full">
                            {t("post work")}
                          </Link>
                        </li>
                      )}
                    <li className="font-medium text-md">
                      <Link to={"/about"} className="w-full">
                        {t("about")}
                      </Link>
                    </li>
                    {userReducer.userDetails &&
                      userReducer.userDetails.userType === "worker" && (
                        <li className="font-medium text-md">
                          <Link to={"/user/messages"} className="w-full">
                            {t("message")}
                          </Link>
                        </li>
                      )}
                  </ul>
                  <div className="flex gap-6 items-center">
                    <div>
                      <Link
                        to={`${userReducer.userDetails &&
                          userReducer.userDetails.userType === "worker"
                          ? "/search/work"
                          : "/search/worker"
                          }`}
                      >
                        <button className="text-white bg-goOnline px-4 py-2 rounded-full flex gap-2 items-center">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.582 16.3522H17.4077L16.9914 15.9508C18.4483 14.2561 19.3253 12.056 19.3253 9.66266C19.3253 4.3259 14.9994 0 9.66266 0C4.3259 0 0 4.3259 0 9.66266C0 14.9994 4.3259 19.3253 9.66266 19.3253C12.056 19.3253 14.2561 18.4483 15.9508 16.9914L16.3522 17.4077V18.582L23.785 26L26 23.785L18.582 16.3522ZM9.66266 16.3522C5.96112 16.3522 2.97313 13.3642 2.97313 9.66266C2.97313 5.96112 5.96112 2.97313 9.66266 2.97313C13.3642 2.97313 16.3522 5.96112 16.3522 9.66266C16.3522 13.3642 13.3642 16.3522 9.66266 16.3522Z"
                              fill="white"
                            />
                          </svg>

                          {t("search")}
                        </button>
                      </Link>
                    </div>
                    <div className="relative" data-te-dropdown-ref>
                      <button
                        className="flex items-center whitespace-nowrap rounded   text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out  motion-reduce:transition-none"
                        type="button"
                        id="dropdownMenuButton1"
                        data-te-dropdown-toggle-ref
                        aria-expanded="false"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        <Avatar sx={{ bgcolor: "black" }} />
                      </button>
                      <ul
                        className="absolute z-[1000] float-left m-0 py-2 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white  [&[data-te-dropdown-show]]:block"
                        aria-labelledby="dropdownMenuButton1"
                        data-te-dropdown-menu-ref
                      >
                        <li>
                          <Link
                            to="/user/profile"
                            className="text-goOnline w-full inline-block text-center px-4"
                            href="#"
                            data-te-dropdown-item-ref
                          >
                            {t("profile")}
                          </Link>
                        </li>
                        {userReducer.userDetails &&
                          userReducer.userDetails.userType === "user" ? (
                          <>
                            <li>
                              <Link
                                to="/work/proposals"
                                className="text-goOnline w-full inline-block text-center px-4"
                                href="#"
                                data-te-dropdown-item-ref
                              >
                                {t("work history")}
                              </Link>
                            </li>
                          </>
                        ) : (
                          <li>
                            <Link
                              to="/worker/proposalstatus"
                              className="text-goOnline w-full inline-block text-center px-4"
                              href="#"
                              data-te-dropdown-item-ref
                            >
                              {t("proposal history")}
                            </Link>
                          </li>
                        )}
                        {userReducer.userDetails &&
                          userReducer.userDetails.userType === "worker" && (
                            <li>
                              <Link
                                to="/user/messages"
                                className="text-goOnline w-full inline-block text-center px-4"
                                href="#"
                                data-te-dropdown-item-ref
                              >
                                {t("message")}
                              </Link>
                            </li>
                          )}
                        <li>
                          <button
                            onClick={handleLogOutClick}
                            className="text-goOnline w-full inline-block text-center px-4"
                            href="#"
                            data-te-dropdown-item-ref
                          >
                            {t("logout")}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button>
                  <Link to={"/auth/login"}>{t("login")}</Link>
                </button>
                <button className="bg-white text-goOnline1 p-2 pl-4 pr-4 rounded-md">
                  <Link to={"/auth/signup"}>{t("signup")}</Link>
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </header >
  );
};

export default Nav;