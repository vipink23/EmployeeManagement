import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Modal from "../Components/Modal.jsx";
import FilterModal from "./FilterModal.jsx";

function DataTable() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const itemsPerPage = 5;
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("Employee")));
  }, [load]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(data)
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Array.isArray(data)
    ? Math.ceil(data.length / itemsPerPage)
    : 0;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // delete data from the local storage

  const getElementsfromLocalStorage = () => {
    let elements = [];
    if (localStorage.getItem("Employee")) {
      elements = JSON.parse(localStorage.getItem("Employee"));
    }
    return elements;
  };
  const removeElementLocalStorage = (name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let elements = getElementsfromLocalStorage();
        elements = elements.filter((element) => element.id !== name);
        localStorage.setItem("Employee", JSON.stringify(elements));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
      setLoad(!load);
    });
  };

  // update Data

  const [showModal, setShowModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };
  const HandleFilter = () => {
    setFilterModal(true);
  };
  const HandleCloseFilterModal = () => {
    setFilterModal(false);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setShowModal(false);
  };

  const handleUpdate = () => {
    setLoad(!load);
  };

  const handleFilterData = (val) => {
    setData(val);
  };

  return (
    <>
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-lg p-4 w-full">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Employee List
            </h2>

            <div className="flex gap-2 ml-auto">
              <button
                style={{ cursor: "pointer" }}
                className="bg-gray-400 hover:bg-gray-300 text-white font-bold border-b-4 border-gray-200 hover:border-gray-300 px-2 py-1 rounded"
                onClick={HandleFilter}
              >
                Filter
              </button>
              <button
                style={{ cursor: "pointer" }}
                className="bg-indigo-400 hover:bg-indigo-300 text-white font-bold border-b-4 border-indigo-200 hover:border-indigo-500 px-3 py-1 rounded"
                onClick={() => navigate("/AddEmployee")}
              >
                ADD +
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-100 shadow-sm rounded-md">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Job</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td className="p-4" colSpan="4">
                      No data found
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-4">{item.empname}</td>
                      <td className="p-4">{item.job}</td>
                      <td className="p-4">{item.email}</td>
                      <td className="p-4">
                        <div className="flex" style={{ cursor: "pointer" }}>
                          <button
                            title="Edit"
                            type="button"
                            onClick={() => handleEdit(item)}
                            style={{ cursor: "pointer" }}
                            className="text-xs px-3 py-1 rounded-sm text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-300"
                          >
                            <FontAwesomeIcon icon={faPencil} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeElementLocalStorage(item.id)}
                            title="Delete"
                            style={{ cursor: "pointer" }}
                            className="ml-2 text-xs px-3 py-1 rounded-sm text-red-600 hover:text-red-800 border border-gray-300 hover:border-red-300"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="text-sm text-gray-600">
              {data && data.length > 0
                ? `Showing ${
                    (currentPage - 1) * itemsPerPage + 1
                  } to ${Math.min(
                    currentPage * itemsPerPage,
                    data.length
                  )} of ${data.length} entries`
                : "Showing 0 to 0 of 0 entries"}
            </div>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-2 py-1.5 border text-sm rounded transition-colors duration-200 ${
                    currentPage === i + 1
                      ? "bg-indigo-400 text-white border-indigo-300"
                      : "bg-white text-gray-800 border-gray-400 hover:bg-blue-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
        {showModal && (
          <Modal
            employee={selectedEmployee}
            onClose={handleCloseModal}
            onUpdate={handleUpdate}
          />
        )}
        {filterModal && (
          <FilterModal
            onClose={HandleCloseFilterModal}
            filterData={handleFilterData}
          />
        )}
      </div>
    </>
  );
}

export default DataTable;
