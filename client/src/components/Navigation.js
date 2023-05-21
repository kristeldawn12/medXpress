import React, { useContext } from "react";
import MedXpressedited from "../assets/MedXpressedited.jpg";
import { PharmContext } from "../context/PharmContext";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const { handleLogout } = useContext(PharmContext);
  const navigate = useNavigate();
  return (
    <>
      <header className="flex w-full items-center justify-between py-2 fixed">
        <div className="flex items-center">
          <img
            className="logo cursor-pointer"
            src={MedXpressedited}
            alt="MedXpress logo"
            onClick={() => navigate("/")}
          />
          <h1 className="brand">MedXpress</h1>
        </div>
        <p className="px-5 text-xl cursor-pointer" onClick={handleLogout}>
          Logout
        </p>
      </header>
    </>
  );
};

export default Navigation;
