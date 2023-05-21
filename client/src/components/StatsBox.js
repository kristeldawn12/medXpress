import React, { useContext, useState } from "react";
import { PharmContext } from "../context/PharmContext";
import { SiCodereview } from "react-icons/si";
import { TiDelete } from "react-icons/ti";

const StatsBox = () => {
  const { prescriptionData, handleStatusUpdate, handleDeletePrescription } =
    useContext(PharmContext);
  const [selectedImage, setSelectedImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { key: "prescriptionID", name: "Prescription ID" },
    { key: "patientName", name: "Patient Name" },
    { key: "patientID", name: "Patient ID" },
    { key: "dateOfBirth", name: "Date of Birth" },
    { key: "clinicName", name: "Clinic Name" },
    { key: "physicianName", name: "Physician Name" },
    { key: "datePrescribed", name: "Date Prescribed" },
    { key: "prescriptionImage", name: "View Rx", icon: <SiCodereview /> },
    {
      key: "status",
      name: "Current Status",
    },
    { key: "task", name: "Task" },
  ];

  const TableHeader = ({ columns }) => {
    return (
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="px-2 pl-9 pr-9 bg-[#0077be] text-white"
            >
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const TableBody = ({ data, columns }) => {
    // converting the DOB & Date Prescribed to a readable format

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };

    return (
      <tbody>
        {data.map((row, index) => (
          // PRESCRIPTION INFORMATION
          <tr
            key={row.prescriptionID}
            className={`${index % 2 === 0 ? "bg-white" : "bg-transparent"}`}
          >
            {columns.map((column) =>
              column.key === "datePrescribed" ? (
                // DATE PRESCRIBED COLUMN
                <td key={column.key} className="py-1">
                  {formatDate(row[column.key])}
                </td>
              ) : column.key === "dateOfBirth" ? (
                // DATE OF BIRTH COLUMN
                <td key={column.key} className="">
                  {formatDate(row[column.key])}
                </td>
              ) : column.key === "prescriptionImage" ? (
                // ===================================================
                // PRESCRIPTION IMAGE COLUMN
                <td key={column.key}>
                  <button onClick={() => handleImageClick(row[column.key])}>
                    <SiCodereview icon={column.icon} />
                  </button>

                  {/* MODAL FOR PRESCRIPTION IMAGE MAGNIFYING GLASS */}

                  {showModal && (
                    <div className="modal">
                      <div className="modal-content">
                        <button
                          onClick={() => setShowModal(false)}
                          className="absolute top-[2.5em] right-[14.2em] px-2 rounded-full"
                          style={{ fontSize: "3rem" }}
                        >
                          <TiDelete />
                        </button>
                        <div>
                          <img
                            src={selectedImage}
                            alt="Prescription"
                            className="w-[35em] h-[45em] bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              ) : column.key === "task" ? (
                // ==============================================
                // TASK COLUMN

                <td key={column.key}>
                  {row[column.key]}
                  <div className="flex py-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg mx-1 text-sm"
                      onClick={(e) => handleStatusUpdate(e, row._id, "Ready")}
                    >
                      Ready
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-md mx-1 text-sm"
                      onClick={(e) =>
                        handleStatusUpdate(e, row._id, "Completed")
                      }
                    >
                      Completed
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md mx-1 text-sm"
                      onClick={(e) => handleDeletePrescription(e, row._id)}
                    >
                      Archive
                    </button>
                  </div>
                </td>
              ) : (
                <td key={column.key}>{row[column.key]}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    );
  };

  const handleImageClick = (imageData) => {
    setSelectedImage(imageData);
    setShowModal(true);
  };

  return (
    <div className="w-full flex flex-col px-2 text-center">
      <table>
        <TableHeader columns={columns} />
        <TableBody data={prescriptionData} columns={columns} />
      </table>
    </div>
  );
};

export default StatsBox;
