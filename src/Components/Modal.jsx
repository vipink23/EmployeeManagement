// import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

function Modal({ employee, onClose, onUpdate }) {
  if (!employee) return null;

  const HandleSubmit = (values) => {
    const EmployeeDetails = JSON.parse(localStorage.getItem("Employee")) || [];
    const UpdatedEmployee = EmployeeDetails.map((emp) => {
      return emp.id === employee.id
        ? {
            ...emp,
            job: values.job,
            email: values.email,
          }
        : emp;
    });
    localStorage.setItem("Employee", JSON.stringify(UpdatedEmployee));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Updated Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      if (onUpdate) onUpdate();
      onClose();
    }, 1520);
  };

   const DisplayingErrorMessagesSchema = Yup.object().shape({
      email: Yup.string().email("Invalid Email").required("Email is Required"),
    });

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

      {/* Modal Box */}
      <div className="relative z-10 flex items-center justify-center min-h-full">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-full max-w-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 dark:border-neutral-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Update Employee
            </h3>
            <button
              onClick={onClose}
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
            initialValues={{
              empname: employee ? employee?.empname : "",
              email: employee ? employee.email : "",
              phone: employee ? employee.phone : "",
              age: employee ? employee.age : "",
              job: employee ? employee.job : "",
            }}
            onSubmit={HandleSubmit}
            validationSchema={DisplayingErrorMessagesSchema}
          >
            {({ handleChange, values, errors }) => (
              <Form>
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="empname"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Employee Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="empname"
                            readOnly
                            value={values.empname}
                            onChange={handleChange}
                            autoComplete="given-name"
                            className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-indigo-600 focus:border-indigo-600"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Age
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            value={values.age}
                            readOnly
                            name="age"
                            onChange={handleChange}
                            className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-indigo-600 focus:border-indigo-600"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Job
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="job"
                            value={values.job}
                            onChange={handleChange}
                            className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-indigo-600 focus:border-indigo-600"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="phone"
                            readOnly
                            value={values.phone}
                            onChange={handleChange}
                            className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-indigo-600 focus:border-indigo-600"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-indigo-600 focus:border-indigo-600"
                          />
                          {errors.email && (
                            <div className="text-xs font-light text-red-500 mt-1">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-end gap-x-4">
                  <button
                    type="button"
                    style={{ cursor: "pointer" }}
                    onClick={onClose}
                    className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ cursor: "pointer" }}
                    //   onClick={handleSubmit}
                    className="rounded-md bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-500 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Footer */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
