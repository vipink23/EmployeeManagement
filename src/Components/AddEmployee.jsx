import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddEmployee() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = localStorage.getItem("Employee");
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });
  const handleSubmit = (values, { resetForm }) => {
    const newEmployee = { id: Date.now(), ...values };
    setEmployees((prev) => {
      const updatedEmployees = [...prev, newEmployee];
      localStorage.setItem("Employee", JSON.stringify(updatedEmployees));
      return updatedEmployees;
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Added Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      resetForm();
    }, 1520);
  };
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    empname: Yup.string().required("Employee Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
    phone: Yup.string()
      .required("Phone Number is Required")
      .max(10, "Phone Number should not exceed 10 digits")
      .min(10, "Phone Number Should not less than 10 digits"),
  });

  return (
    <>
      <Formik
        initialValues={{ empname: "", email: "", phone: "", age: "", job: "" }}
        onSubmit={handleSubmit}
        validationSchema={DisplayingErrorMessagesSchema}
      >
        {({ handleChange, values, errors }) => (
          <Form>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8 w-full">
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                      ADD EMPLOYEE
                    </h2>
                  </div>
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
                            value={values.empname}
                            onChange={handleChange}
                            autoComplete="given-name"
                            className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-indigo-600 focus:border-indigo-600"
                          />
                          {errors.empname && (
                            <div className="text-xs font-light text-red-500 mt-1">
                              {errors.empname}
                            </div>
                          )}
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
                            value={values.phone}
                            onChange={handleChange}
                            className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-indigo-600 focus:border-indigo-600"
                          />
                          {errors.phone && (
                            <div className="text-xs font-light text-red-500 mt-1">
                              {errors.phone}
                            </div>
                          )}
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
                    onClick={() => navigate("/")}
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
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddEmployee;
