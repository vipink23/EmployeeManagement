// import React from "react";
import { Formik, Form } from "formik";
function FilterModal({ onClose, filterData }) {
  const handleFilter = (values) => {
    const LocalValues = JSON.parse(localStorage.getItem("Employee"));
    const matchedItems = LocalValues.filter((item) => {
      const matchEmp = values.empname
        ? item.empname.toUpperCase() === values.empname.toUpperCase()
        : true;
      const matchAge = values.age ? item.age === values.age : true;
      const matchPhone = values.phone ? item.phone === values.phone : true;
      return matchEmp && matchAge && matchPhone;
    });
    filterData(matchedItems);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <>
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex items-center justify-center min-h-full p-4 sm:p-6">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-full max-w-2xl p-6 sm:p-8">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 dark:border-neutral-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Filter Employee
              </h3>
              <button
                onClick={onClose}
                style={{ cursor: "pointer" }}
                className="text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <Formik
              initialValues={{ empname: "", phone: "", age: "" }}
              onSubmit={handleFilter}
            >
              {({ handleChange, values }) => (
                <Form>
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                        <div>
                          <label
                            htmlFor="empname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Employee Name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="empname"
                              value={values.empname}
                              onChange={handleChange}
                              autoComplete="given-name"
                              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-indigo-600 focus:border-indigo-600"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="age"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Age
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="age"
                              value={values.age}
                              onChange={handleChange}
                              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-indigo-600 focus:border-indigo-600"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-indigo-600 focus:border-indigo-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-4">
                    <button
                      type="button"
                      style={{ cursor: "pointer" }}
                      className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{cursor:"pointer"}}
                      className="rounded-md bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-500 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                      Filter
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterModal;
