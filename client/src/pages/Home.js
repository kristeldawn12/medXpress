import React, { useContext } from "react";
import { PharmContext } from "../context/PharmContext";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import SideBarNav from "../components/SideBarNav";

const Home = () => {
  const {
    searchPatientData,
    filteredPatientSearch,
    handleInputChange,
    handleSearch,
    clearSearch,
  } = useContext(PharmContext);

  const navigate = useNavigate();

  const columns = [
    { key: "patientID", name: "Patient ID" },
    { key: "firstName", name: "First Name" },
    { key: "lastName", name: "Last Name" },
    { key: "dateOfBirth", name: "Date of Birth" },
    { key: "address", name: "Address" },
    { key: "contactNumber", name: "Contact Number" },
    { key: "button", name: "Prescription" },
  ];

  const TableHeader = ({ columns }) => {
    return (
      <thead>
        <tr className="border bg-white">
          {columns.map((col) => (
            <th key={col.key} className="border text-lg py-3">
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const TableBody = ({ data, columns }) => {
    return (
      <tbody>
        {data.map((row) => (
          <tr key={row.patientID} className="border bg-white">
            {columns.map((column) => (
              <td key={column.key} className="border px-2 py-5 text-lg">
                {column.key === "button" ? (
                  <div className="flex justify-center">
                    <button
                      className="bg-[#0077be] text-white w-24 hover:text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                      onClick={() => navigate("/order")}
                    >
                      Order
                    </button>
                  </div>
                ) : (
                  row[column.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <>
      {/* SIDEBAR Section */}

      <div className="pt-16 min-h-[calc(100vh)] flex">
        <SideBarNav />

        {/* PATIENT SEARCH */}

        <div className="w-5/6 border-blue">
          <Fade direction="top-left">
            <div className="bg-gradient-to-r from-blue-200 to-blue-500 text-center px-3 py-2">
              <p className="text-black font-serif text-4xl">Search Patient</p>
            </div>

            <div className="w-full h-28 border rounded-md overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-md bg-gradient-to-r from-blue-200 to-blue-500 py-1">
              <form className="flex my-2 mx-1">
                <label htmlFor="firstName" className="mr-2 text-lg">
                  Firstname:
                </label>
                <input
                  className="w-32 h-6 px-2 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out"
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={searchPatientData.firstName}
                  onChange={handleInputChange}
                />
                <label htmlFor="lastName" className="mx-2 text-lg">
                  Lastname:
                </label>
                <input
                  className="w-32 h-6 px-2 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out"
                  type="text"
                  id="Lastname"
                  name="lastName"
                  required
                  value={searchPatientData.lastName}
                  onChange={handleInputChange}
                />
                <label htmlFor="dateOfBirth" className="mx-2 text-lg">
                  Date of Birth:
                </label>
                <input
                  className="w-36 h-6 px-2 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out"
                  type="text"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="YYYY-MM-DD"
                  required
                  value={searchPatientData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </form>
              <div className="flex justify-end">
                <button
                  className="border rounded-full w-28 bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out mx-2 py-2"
                  onClick={handleSearch}
                >
                  Search
                </button>

                <button
                  className="border rounded-full w-28 bg-white text-blue-600 hover:text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out mx-2 py-2"
                  onClick={clearSearch}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* PATIENT TABLE */}

            <div className="mt-4 px-2">
              <table className="w-full rounded-lg overflow-hidden table-auto bg-blue-500">
                <TableHeader columns={columns} />
                <TableBody data={filteredPatientSearch} columns={columns} />
              </table>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default Home;
