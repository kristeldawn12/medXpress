/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import "../App.css";
import { Fade } from "react-awesome-reveal";

import axios from "axios";
import { PharmContext } from "../context/PharmContext";
import PharmRoutes from "../Routes";
import { useNavigate } from "react-router-dom";
// import jwt from 'jsonwebtoken';

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  role: "",
};

function PharmacyLogApp() {
  const navigate = useNavigate();
  const [apiURL, setApiURL] = useState("https://medxpress.onrender.com");

  const { loggedIn, setLoggedIn, userData, setloggedInUser } =
    useContext(PharmContext);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [showPasswordMatchErrorModal, setShowPasswordMatchErrorModal] =
    useState(false);

  const [isPhysician, setIsPhysician] = useState(false);
  const [isPharmacist, setIsPharmacist] = useState(false);

  const handlePhysicianClick = () => {
    setIsPhysician(!isPhysician);
    setIsPharmacist(false);
  };

  const handlePharmacistClick = () => {
    setIsPharmacist(!isPharmacist);
    setIsPhysician(false);
  };

  const [data, setData] = useState(initialFormData);

  const handleCombinedSubmit = (event) => {
    event.preventDefault();
    handleSubmitUserData(event);
    handleCreateAccount(event);
  };

  // USERDATA TO DATABASE FETCH  =======================================
  const handleOnChangeUserData = (event) => {
    const { name, value } = event.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmitUserData = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, username, password, confirmPassword } =
      data;

    const role = isPhysician ? "Physician" : isPharmacist ? "Pharmacist" : "";
    data.role = role;

    if (firstName && lastName && email && username && password) {
      if (password === confirmPassword) {
        if (isPhysician || isPharmacist) {
          try {
            const response = await axios.post(
              `${apiURL}/userData/register`,
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const dataRes = response.data;
            alert(dataRes.message);
            // Reset form fields
            setData(initialFormData);
          } catch (error) {
            if (
              error.response &&
              error.response.status === 400 &&
              error.response.data.error === "Email already exists"
            ) {
              alert("Email already exists. Please choose a different email.");
            } else {
              alert("An error occurred. Please try again.");
            }
          }
        } else {
          alert("Please select at least one profession.");
        }
      }
    }
  };

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    const usernameInput = event.target.username.value;
    const passwordInput = event.target.password.value;

    // Find user with matching username and password in userData array
    const user = userData.find((userData) => {
      return (
        userData.username === usernameInput &&
        userData.password === passwordInput
      );
    });

    if (!user) {
      setShowErrorModal(true);
      setShowCreateAccountModal(false); // Close create account form
      return;
    }

    // Set logged in userFirstName
    setloggedInUser(`${user.firstName} ${user.lastName}`);

    // login logic here
    setLoggedIn(true);

    // navigate to appropriate page based on user role
    if (user.role === "Physician") {
      navigate("/");
    } else if (user.role === "Pharmacist") {
      navigate("/status");
    }
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();
    const passwordInput = event.target.password.value;
    const confirmPasswordInput = event.target.confirmPassword.value;
    if (
      !/\d/.test(passwordInput) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput)
    ) {
      setShowErrorModal(true);
      setShowCreateAccountModal(false); // Close create account form
      return;
    }
    if (passwordInput !== confirmPasswordInput) {
      setShowPasswordMatchErrorModal(true);
      // setShowCreateAccountModal(false); //
      // Close create account form:
      return;
    }
    // create account logic here
    setShowCreateAccountModal(false);
  };

  return (
    <>
      <div>
        {/* LOGIN =============================================== */}
        {loggedIn ? (
          <PharmRoutes />
        ) : (
          <main>
            <Fade direction="right" delay={1000}>
              <div className="container">
                <form onSubmit={handleSubmitPassword}>
                  <h2 className="text-xl py-2 font-semibold">Log In</h2>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="on"
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="on"
                    required
                  />
                  <button className="log" type="submit">
                    Log In
                  </button>
                  <a href="#" onClick={() => setShowCreateAccountModal(true)}>
                    Create an Account
                  </a>
                </form>
              </div>
            </Fade>
          </main>
        )}

        <footer>
          <p>&copy; 2023 Pharmacy Log App. All rights reserved.</p>
        </footer>

        {/* Login error handling ==================================== */}

        {showErrorModal && (
          <Fade direction="bottom">
            <div className="modal">
              <div className="modal-content">
                <h2>Error!</h2>
                <p>
                  {/* Password must contain at least one number and one special
                  character. */}
                  Please enter a correct username and password.
                </p>
                <button onClick={() => setShowErrorModal(false)}>
                  <Fade direction="bottom">Close</Fade>
                </button>
              </div>
            </div>
          </Fade>
        )}

        {/* Account creation =========================================== */}

        {showCreateAccountModal && (
          <Fade direction="bottom">
            <div className="modal">
              <div className="modal-content">
                <h2 className="py-3 text-xl font-semibold">
                  Create an Account
                </h2>
                <form onSubmit={handleCombinedSubmit} className="w-3/4">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="on"
                    value={data.firstName}
                    onChange={handleOnChangeUserData}
                    required
                  />
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="on"
                    value={data.lastName}
                    onChange={handleOnChangeUserData}
                    required
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="on"
                    value={data.email}
                    onChange={handleOnChangeUserData}
                    required
                  />
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="on"
                    value={data.username}
                    onChange={handleOnChangeUserData}
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="on"
                    value={data.password}
                    onChange={handleOnChangeUserData}
                    required
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="on"
                    value={data.confirmPassword}
                    onChange={handleOnChangeUserData}
                    required
                  />
                  <div className="checkboxes">
                    <div className="flex items-center">
                      <input
                        className="mx-2 mt-1"
                        type="checkbox"
                        id="isPhysician"
                        name="isPhysician"
                        value="physician"
                        checked={isPhysician}
                        onChange={handlePhysicianClick}
                      />
                      <label htmlFor="isPhysician">Physician</label>
                    </div>
                    <div className="flex">
                      <input
                        className="mx-2 mt-1"
                        type="checkbox"
                        id="isPharmacist"
                        name="isPharmacist"
                        value="pharmacist"
                        checked={isPharmacist}
                        onChange={handlePharmacistClick}
                      />
                      <label htmlFor="isPharmacist">Pharmacist</label>
                    </div>
                  </div>
                  <button type="submit">Create Account</button>
                </form>
                <button onClick={() => setShowCreateAccountModal(false)}>
                  <Fade direction="bottom">Cancel</Fade>
                </button>
              </div>
            </div>
          </Fade>
        )}

        {/* Password error handling ========================================= */}

        {showPasswordMatchErrorModal && (
          <Fade direction="bottom">
            <div className="modal">
              <div className="modal-content">
                <h2>Error! 😓</h2>
                <p>Passwords do not match.</p>
                <button onClick={() => setShowPasswordMatchErrorModal(false)}>
                  <Fade direction="bottom">Close</Fade>
                </button>
              </div>
            </div>
          </Fade>
        )}
      </div>
    </>
  );
}

export default PharmacyLogApp;
