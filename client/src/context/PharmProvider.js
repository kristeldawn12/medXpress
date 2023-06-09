/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { PharmContext } from "./PharmContext";

import axios from "axios";

const PharmProvider = (props) => {
  // LOGIN
  const [loggedIn, setLoggedIn] = useState(false);
  const [apiURL, setApiURL] = useState("https://medxpress.onrender.com");

  const handleLogout = (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoggedIn(false);
    clearSearch();
    setfilteredPatientSearch([]);
  };

  // ============================================================================
  // All PATIENT DATA
  const [patientData, setPatientData] = useState([]);
  const getPatientData = async () => {
    const response = await axios.get(`${apiURL}/patientData`);
    setPatientData(response.data.data);
  };

  // console.log(patientData);

  // ============================================================================
  // SEARCH PATIENT
  const [filteredPatientSearch, setfilteredPatientSearch] = useState([]);
  const [searchPatientData, setSearchPatientData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    patientID: "",
    gender: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const { firstName, lastName, dateOfBirth } = searchPatientData;

    if (firstName === "") {
      alert("Please enter a first name.");
      return;
    }

    if (lastName === "") {
      alert("Please enter a last name.");
      return;
    }

    if (dateOfBirth === "") {
      alert("Please enter date of birth.");
      return;
    }

    // FILTER PATIENT DATA THAT MATCHES SEARCH DATA
    const filteredPatientData = patientData.filter(
      (data) =>
        data.dateOfBirth === dateOfBirth &&
        data.firstName.toLowerCase() === firstName.toLowerCase() &&
        data.lastName.toLowerCase() === lastName.toLowerCase()
    );

    if (filteredPatientData.length === 0) {
      alert("Patient not found");
    }

    setfilteredPatientSearch(filteredPatientData);
  };

  // console.log(filteredPatientSearch);

  const handleInputChange = (e) => {
    setSearchPatientData({
      ...searchPatientData,
      [e.target.name]: e.target.value,
    });
  };

  const clearSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    setSearchPatientData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    });
  };

  // ============================================================================
  // ALL USER DATA
  const [userData, setUserData] = useState([]);
  const getUserData = async () => {
    const response = await axios.get(`${apiURL}/userData`);

    setUserData(response.data.data);
  };

  // console.log(userData);

  // Showing user's firstname on display
  const [loggedInUser, setloggedInUser] = useState("");

  const userLoggedIn = (username, password) => {
    const user = userData.find(
      (user) => user.username === username && username.password === password
    );

    if (user) {
      const { firstName, lastName } = user;
      setloggedInUser(`${firstName} ${lastName}`);
    }
  };

  // ===========================================================================
  // PRESCRIPTION DATA

  const [prescriptionData, setPrescriptionData] = useState([]);
  const getprescriptionData = async () => {
    const response = await axios.get(`${apiURL}/prescriptionData`);

    setPrescriptionData(response.data.data);
  };

  // console.log(prescriptionData);

  // UPDATE PRESCRIPTION DATA
  const handleStatusUpdate = async (e, id, newStatus) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${apiURL}/prescriptionData/updateStatus/${id}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update the status field in the prescriptionData array with the new status value
      const updatedPrescriptionData = prescriptionData.map((prescription) => {
        if (prescription._id === id) {
          return {
            ...prescription,
            status: newStatus,
          };
        }
        return prescription;
      });

      // Set the updated prescriptionData array as the new state
      setPrescriptionData(updatedPrescriptionData);

      // Show success message
      alert(`Prescription updated to ${newStatus}`);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  // SOFT DELETE PRESCRIPTION DATA
  const handleDeletePrescription = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${apiURL}/prescriptionData/archivePrescription/${id}`,
        { deleted: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Removes the prescription data from the prescriptionData array
      setPrescriptionData((prevPrescriptionData) =>
        prevPrescriptionData.filter((prescription) => prescription._id !== id)
      );

      // Show success message
      alert(`Prescription archived`);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  // ============================================================================
  // USE EFFECT

  useEffect(() => {
    getPatientData();
    getUserData();
    getprescriptionData();
  }, []);

  //============================================================================
  // CONTEXT VALUE
  const contextValue = {
    loggedIn,
    patientData,
    searchPatientData,
    filteredPatientSearch,
    userData,
    loggedInUser,
    prescriptionData,
    setloggedInUser,
    handleLogout,
    setLoggedIn,
    handleInputChange,
    handleSearch,
    clearSearch,
    setPrescriptionData,
    handleStatusUpdate,
    handleDeletePrescription,
    getprescriptionData,
  };

  return (
    <PharmContext.Provider value={contextValue}>
      {props.children}
    </PharmContext.Provider>
  );
};

export default PharmProvider;
