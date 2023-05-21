import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PharmContext } from "../context/PharmContext";

const SideBarNav = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(PharmContext);

  return (
    <div className="w-1/6 bg-[#0077be] flex flex-col items-center">
      <p className="pt-5 text-2xl text-white mb-3">Hi {loggedInUser}</p>

      <div className="flex flex-col items-center my-5 text-xl">
        {/* Pharmacist View */}
        <p
          className="text-white py-2 hover:text-gray-200 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
          onClick={() => navigate("/")}
        >
          Patient Record
        </p>

        {/* Physician View */}
        <p
          className="text-white py-2 hover:text-gray-200 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
          onClick={() => navigate("/status")}
        >
          Prescription Status
        </p>

        <p
          className="text-white py-2 hover:text-gray-200 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
          onClick={() => navigate("/pending")}
        >
          Order Tracker
        </p>
      </div>
    </div>
  );
};

export default SideBarNav;
