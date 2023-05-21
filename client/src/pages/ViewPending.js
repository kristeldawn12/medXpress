import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PharmContext } from "../context/PharmContext";
import { Fade } from "react-awesome-reveal";
import SideBarNav from "../components/SideBarNav";

const ViewPending = () => {
  const { prescriptionData } = useContext(PharmContext);

  return (
    <div className="pt-16 min-h-screen flex">
      {/* SIDEBAR CONTAINER */}
      <SideBarNav />

      {/* PENDING CONTAINER */}

      <div className="w-5/6">
        <div className="flex flex-col">
          <Fade direction="bottom-left">
            <div className="flex flex-col items-center py-5">
              <h2 className="text-4xl font-bold text-gray-800">
                Order Tracker
              </h2>
              {/* Add your pending items list or content here */}
              {/* Check if the status is ready or preparing */}
            </div>
            <div className="flex justify-center">
              <table className="rounded-lg overflow-hidden bg-white shadow-lg w-5/6 flex">
                {/* PREPARING */}
                <div className="w-1/2 flex flex-col px-2 py-1">
                  <div>
                    <p className="py-2 px-4 text-center text-xl font-semibold">
                      Preparing
                    </p>
                  </div>
                  <thead>
                    <tr className="bg-gray-200 flex">
                      <th className="w-1/3 py-2 px-4">Prescription ID</th>
                      <th className="w-1/3 py-2 px-4">Patient Name</th>
                      <th className="w-1/3 py-2 px-4">Patient ID</th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {prescriptionData
                      .filter((row) => row.status === "Preparing")
                      .map((row) => (
                        <tr
                          key={row.prescriptionID}
                          className="flex text-center"
                        >
                          <td className="w-1/3 py-2 px-4 ">
                            {row.prescriptionID}
                          </td>
                          <td className="w-1/3 py-2 px-4">{row.patientName}</td>
                          <td className=" w-1/3 py-2 px-4">{row.patientID}</td>
                        </tr>
                      ))}
                  </tbody>
                </div>
                {/* READY TO COLLECT */}
                <div className="w-1/2 flex flex-col px-2 py-1">
                  <div>
                    <p className="py-2 px-4 text-center text-xl font-semibold">
                      Ready Orders
                    </p>
                  </div>
                  <thead>
                    <tr className="bg-gray-200 flex">
                      <th className="w-1/3 py-2 px-4">Prescription ID</th>
                      <th className="w-1/3 py-2 px-4">Patient Name</th>
                      <th className="w-1/3 py-2 px-4">Patient ID</th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {prescriptionData
                      .filter((row) => row.status === "Ready")
                      .map((row) => (
                        <tr
                          key={row.prescriptionID}
                          className="flex text-center"
                        >
                          <td className="w-1/3 py-2 px-4">
                            {row.prescriptionID}
                          </td>
                          <td className="w-1/3 py-2 px-4">{row.patientName}</td>
                          <td className="w-1/3 py-2 px-4">{row.patientID}</td>
                        </tr>
                      ))}
                  </tbody>
                </div>
              </table>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default ViewPending;
