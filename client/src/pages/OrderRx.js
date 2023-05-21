/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { PharmContext } from "../context/PharmContext";
import { v4 as uuidv4 } from "uuid";
import { ImageToBase64 } from "../utility/ImagetoBase64.js";
import { ImFolderUpload } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import cogoToast from "cogo-toast";
import axios from "axios";
import SideBarNav from "../components/SideBarNav";

const clinicDepartments = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Pediatrics",
  "Clinical Infection",
  "General Medicine",
  "Obstetrics",
  "Gynecology",
  "Ophthalmology",
  "Orthopedics",
  "Geriatrics",
  "Nephrology",
  "Neurology",
  "Surgery",
];

const OrderRx = () => {
  const navigate = useNavigate();
  const [apiURL, setApiURL] = useState("http://localhost:5000");

  const { filteredPatientSearch, loggedInUser, getprescriptionData } =
    useContext(PharmContext);
  const [selectedClinic, setSelectedClinic] = useState("");
  const [prescriptionImage, setPrescriptionImage] = useState({
    image: "",
  });
  const [prescriptionInfo, setPrescriptionInfo] = useState({
    prescriptionID: "",
    patientName: "",
    patientID: "",
    dateOfBirth: "",
    datePrescribed: "",
    physicianName: "",
    clinicName: "",
    prescriptionImage: "",
    status: "",
  });

  // Destructuring prescriptionInfo
  const {
    prescriptionID,
    patientID,
    patientName,
    dateOfBirth,
    datePrescribed,
  } = prescriptionInfo;

  useEffect(() => {
    if (filteredPatientSearch.length > 0) {
      const { firstName, lastName, patientID, dateOfBirth } =
        filteredPatientSearch[0];
      const fullName = `${firstName} ${lastName}`;
      const uniqueID = `RX-${patientID}/${uuidv4().slice(0, 5).toUpperCase()}`;
      const options = { month: "long", day: "numeric", year: "numeric" };
      const datePrescribed = new Date().toLocaleDateString("en-US", options);

      setPrescriptionInfo((prevState) => ({
        ...prevState,
        prescriptionID: uniqueID,
        patientName: fullName,
        patientID,
        dateOfBirth,
        datePrescribed,
        physicianName: loggedInUser,
        prescriptionImage: prescriptionImage.image,
        clinicName: prescriptionInfo.clinicName,
        status: "Preparing",
      }));
    }
  }, [
    filteredPatientSearch,
    loggedInUser,
    prescriptionImage.image,
    prescriptionInfo.clinicName,
  ]);

  console.log("This is the prescriptionInfo", prescriptionInfo);

  // Uploading prescription image
  const uploadImage = async (e) => {
    const data = await ImageToBase64(e.target.files[0]);

    // console.log("New Image", data);

    setPrescriptionImage((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  // Selecting clinic name
  const handleClinicName = (e) => {
    e.preventDefault();

    setSelectedClinic(e.target.value);

    setPrescriptionInfo((prev) => {
      return {
        ...prev,
        clinicName: e.target.value,
      };
    });
  };

  const handlePhysicianNameChange = (event) => {
    setPrescriptionInfo({
      ...prescriptionInfo,
      physicianName: event.target.value,
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmitPrescription = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiURL}/prescriptionData/uploadPrescriptionData`,
        prescriptionInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataRes = response.data;
      cogoToast.success(dataRes.message);

      // Update prescription data to trigger re-render
      getprescriptionData();
    } catch (error) {
      console.error(error);
      cogoToast.error("Error submitting prescription");
    }
  };

  return (
    <div className="pt-16 min-h-[calc(100vh)] flex ">
      {/* SIDEBAR */}
      <SideBarNav />

      {/* PRESCRIPTION FORM */}

      <div className="w-5/6 border-2 border-blue">
        <div className="flex min-h-full flex-col">
          {/* PRESCRIPTION CONTAINER */}

          <div className="my-auto flex flex-col items-center">
            {/* DIVIDER */}

            <div className="flex">
              {/* Patient details */}
              <div className=" w-80 px-10 bg-[#d7f3fb] rounded-l-md ">
                <form className="my-2 mx-1 text-xl py-3">
                  <label htmlFor="prescriptionID">Prescription ID</label>
                  <input
                    className="w-56 h-6"
                    type="text"
                    id="prescriptionID"
                    name="prescriptionID"
                    required
                    defaultValue={prescriptionID}
                  ></input>
                  <label htmlFor="physicianName">Physician Name</label>
                  <input
                    className="w-56 h-6"
                    type="text"
                    id="physicianName"
                    name="physicianName"
                    required
                    value={prescriptionInfo.physicianName}
                    onChange={handlePhysicianNameChange}
                  ></input>
                  <label htmlFor="clinicName">Clinic Name</label>
                  <select
                    className="my-2 py-1 w-46 h-8"
                    aria-label="Select Clinic"
                    id="clinic-select"
                    value={selectedClinic}
                    onChange={handleClinicName}
                  >
                    <option value="">Select Clinic</option>
                    {/* Loop through the clinicDepartments array to create option elements */}
                    {clinicDepartments.map((clinic, index) => (
                      <option
                        key={index}
                        value={clinic}
                        selected={clinic === selectedClinic}
                      >
                        {clinic}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="patientID">Patient ID</label>
                  <input
                    className="w-56 h-6"
                    type="text"
                    id="patientID"
                    name="patientID"
                    required
                    defaultValue={patientID}
                  ></input>
                  <label htmlFor="patientName">Patient Name</label>
                  <input
                    className="w-56 h-6"
                    type="text"
                    id="patientName"
                    name="patientName"
                    defaultValue={patientName}
                    required
                  ></input>
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    className="w-56 h-6"
                    type="text"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    defaultValue={dateOfBirth}
                    required
                  ></input>
                  <label htmlFor="datePrescribed">Date Prescribed</label>
                  <input
                    className="w-56 h-6"
                    type="text"
                    id="datePrescribed"
                    name="datePrescribed"
                    defaultValue={datePrescribed}
                    required
                  ></input>
                </form>
              </div>

              {/* Upload Prescription */}

              <div className="w-[50em] bg-white flex justify-center items-center rounded-r-md">
                <label htmlFor="image">
                  <div className="w-full">
                    {prescriptionImage.image ? (
                      <img src={prescriptionImage.image} alt="" />
                    ) : (
                      <span className="text-5xl flex flex-col items-center">
                        <p className="text-xl">Choose a file</p>
                        <div className="cursor-pointer">
                          <ImFolderUpload />
                        </div>
                      </span>
                    )}
                    <input
                      type={"file"}
                      accept="image/*"
                      id="image"
                      onChange={uploadImage}
                      className="hidden"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Button */}

            <div className="mt-8 flex justify-center">
              <button
                className="border-2 border-[#0077be] bg-[#0077be] text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:shadow-outline"
                onClick={handleSubmitPrescription}
              >
                Submit
              </button>
              <button
                className="border-2 border-[#0077be] bg-white text-[#0077be] font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:shadow-outline mx-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderRx;
