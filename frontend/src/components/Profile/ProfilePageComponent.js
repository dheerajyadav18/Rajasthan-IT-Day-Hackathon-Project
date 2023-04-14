import React, { useEffect, useState } from "react";
import ProfileEdit from "./ProfileEdit";
import ProfileInfoPage from "./ProfileInfoPage";
import ProfileLeft from "./ProfileLeft";
import ProfileProposals from "./ProfileProposals";
import ProfileReview from "./ProfileReview";
import { axiosInstanceWithHeader } from "../../axois";

const ProfilePageComponent = () => {
  const [profile, setProfile] = useState({
    profileLeft: { have: false },
    profileProposals: { have: false },
    profileEdit: { have: false },
    profileReview: { have: false },
  });
  useEffect(() => {
    axiosInstanceWithHeader
      .get("/api/v1/user/getprofile")
      .then((response) => {
        console.log(response);
        setProfile({
          profileLeft: {
            have: true,
            name: response.data.result.profile.userId.name,
            email: response.data.result.profile.userId.email,
            phone: response.data.result.profile.userId.phone,
            userType: response.data.result.profile.userId.userType,
            workingStatus: response.data.result.profile.workingStatus,
            works: 0,
            reviews: 0,
          },
          profileEdit: {
            have: true,
            name: response.data.result.profile.userId.name,
            phone: response.data.result.profile.userId.phone,
            address: response.data.result.profile.address,
            city: response.data.result.profile.city,
            state: response.data.result.profile.state,
            summary: response.data.result.profile.summary,
            workingDistance: response.data.result.profile.workingDistance,
            workPriorities: response.data.result.profile.workPriorities,
            location:response.data.result.profile.location,
            pincode:response.data.result.profile.pincode,
            userType: response.data.result.profile.userId.userType
          },
          profileReview: {
            have:false
          },
          profileProposals :{
            have:false
          }

        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full pb-10">
      <div className="w-[80%] flex mx-auto mt-10 justify-between">
        <div className="w-[27%] mt-16 bg-white rounded-xl h-max">
          <ProfileLeft profileLeft={profile.profileLeft} />
        </div>
        <div className="w-[70%] rounded-xl">
          <ul
            className="w-full flex list-none flex-col flex-wrap border-b pl-0 md:flex-row text-white"
            role="tablist"
            data-te-nav-ref
          >
            <li role="presentation">
              <a
                href="#tabs-home"
                className="my-2 font-semibold block border-x-0 border-t-0 border-b-2 border-transparent px-7 pt-4 pb-3.5 text-xs  uppercase leading-tight  hover:isolate hover:border-transparent focus:isolate focus:border-transparent data-[te-nav-active]:text-[#ff3]"
                data-te-toggle="pill"
                data-te-target="#tabs-home"
                data-te-nav-active
                role="tab"
                aria-controls="tabs-home"
                aria-selected="true"
              >
                Profile
              </a>
            </li>
            <li role="presentation">
              <a
                href="#tabs-profile"
                className="focus:border-transparen my-2 block border-x-0 border-t-0 border-b-2 border-transparent px-7 pt-4 pb-3.5 text-xs font-semibold uppercase leading-tight data-[te-nav-active]:text-[#ff3]"
                data-te-toggle="pill"
                data-te-target="#tabs-profile"
                role="tab"
                aria-controls="tabs-profile"
                aria-selected="false"
              >
                Proposals
              </a>
            </li>
            <li role="presentation">
              <a
                href="#tabs-messages"
                className="my-2 block border-x-0 border-t-0 border-b-2 border-transparent px-7 pt-4 pb-3.5 text-xs font-semibold uppercase leading-tight text-white data-[te-nav-active]:text-[#ff3]"
                data-te-toggle="pill"
                data-te-target="#tabs-messages"
                role="tab"
                aria-controls="tabs-messages"
                aria-selected="false"
              >
                Reviews
              </a>
            </li>
            <li role="presentation">
              <a
                href="#tabs-contact"
                className="my-2 block border-x-0 border-t-0 border-b-2 border-transparent px-7 pt-4 pb-3.5 text-xs font-semibold uppercase leading-tight text-white :text-primary  data-[te-nav-active]:text-[#ff3] "
                data-te-toggle="pill"
                data-te-target="#tabs-contact"
                role="tab"
                aria-controls="tabs-contact"
                aria-selected="false"
              >
                Edit
              </a>
            </li>
          </ul>
          <div className=" w-full bg-white rounded-xl">
            <div
              className="rounded-md hidden opacity-0  transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="tabs-home"
              role="tabpanel"
              aria-labelledby="tabs-home-tab"
              data-te-tab-active
            >
              <ProfileInfoPage />
            </div>
            <div
              className="rounded-md hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="tabs-profile"
              role="tabpanel"
              aria-labelledby="tabs-profile-tab"
            >
              <ProfileProposals />
            </div>
            <div
              className="rounded-md hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="tabs-messages"
              role="tabpanel"
              aria-labelledby="tabs-profile-tab"
            >
              <ProfileReview />
            </div>
            <div
              className="rounded-md hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="tabs-contact"
              role="tabpanel"
              aria-labelledby="tabs-contact-tab"
            >
              <ProfileEdit profileEdit={profile.profileEdit}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComponent;
