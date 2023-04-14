import React from "react";
import {Link} from "react-router-dom"


function Footer() {
  return (
    <>
      {/* footersection */}
      <footer className="footer mt-10 bg-goOnline text-white w-full p-8">
        <div className="w-[80%] mx-auto ">
          <div className="container flex justify-around">
            <div className="f-teamname">
              <h3 className="text-lg font-semibold mb-2">Team members</h3>
              <ul>
                <li className="text-md font-medium mb-1">Puneet Dwivedi</li>
                <li className="text-md font-medium mb-1">Piyush Mishra</li>
                <li className="text-md font-medium mb-1">Prashant Singh Solanki</li>
                <li className="text-md font-medium mb-1">Monika Patidar</li>
              </ul>
            </div>

            <div className="f-links">
            <h3 className="text-lg font-semibold mb-2">Links</h3>
              <ul>
                <li className="text-md font-medium mb-1">
                  <Link to={"/"} href="#">Home</Link>
                </li>
                <li className="text-md font-medium mb-1">
                  <Link to={"/auth/login"} >Log In</Link>
                </li>
                <li className="text-md font-medium mb-1">
                  <Link to={"/explore"}>Explore</Link>
                </li>
                <li className="text-md font-medium mb-1">
                  <Link to={"/about"} >About us</Link>
                </li>
              </ul>
            </div>

            <div className="f-services">
            <h3 className="text-lg font-semibold mb-2">Services</h3>
              <ul>
                <li className="text-md font-medium mb-1">
                  <Link to={"/search/work"}>Search Work</Link>
                </li >
                <li className="text-md font-medium mb-1">
                  <Link to={"/search/worker"}>Search Worker</Link>
                </li>
                <li className="text-md font-medium mb-1">
                  <Link to={"/user/profile"}>Profile</Link>
                </li>
               
              </ul>
            </div>
            <div className="f-address">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <address>
                <div>
                  <p> Go Online</p>
                </div>
              </address>
              <div className="mobileno">
                <a href="tel:+9112344444444" target={"_blank"}>+91 95123 57846</a>
              </div>
              <div className="mail">
                <a href="mailto: dummy@123gmail.com" target={"_blank"}>goonline.admin@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
