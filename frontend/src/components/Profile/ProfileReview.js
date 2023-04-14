import React from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const ProfileReview = () => {
    return (
        <div
            className="w-full p-4 rounded-xl max-h-[70vh] h-[70vh] overflow-y-auto"
            id="profileReview"
        >
            <div>
                <h2 className="font-inter text-2xl font-semibold"> Reviews</h2>

                <div className="w-full rounded-xl  mb-8 shadow-md shadow-gray-300 bg-white p-6 mt-4">
                    <div className="mt-2">
                        <div className="flex">
                            <h4 className="text-md font-semibold w-max"> Monika Patidar</h4>
                        </div>
                        <div className="flex">
                            <h4 className="text-md font-semibold w-max">Location :</h4>
                            <span>Rau, Indore, MP</span>
                        </div>
                        <div className="flex">
                            <h4 className="text-md font-semibold w-max">Rating :</h4>
                            <Rating name="ratings" value={3} readOnly={true} />
                        </div>
                    </div>
                    <div className="pt-2 pb-1">
                        <p className=" rounded-xl">
                            17 I was trying to use colors such as amber and lime, which are
                            mentioned in the documentation. These colors didn't work. Only
                            colors with names such as the primary color name (eg. red, pink)
                            worked. Colors which are not working: amber, emerald, lime, rose,
                            fuchsia, slate, zinc, and even orange
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileReview;
