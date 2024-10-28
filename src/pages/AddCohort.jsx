// pages/AddCohort.jsx
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const AddCohort = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [loadingInstructors, setLoadingInstructors] = useState(true);

  // Fetch instructors on component mount
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch("http://localhost/lms/ instructors.php");
        const data = await response.json();
        if (data.success) {
          setInstructors(data.data);
        } else {
          console.error("Failed to fetch instructors:", data);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      } finally {
        setLoadingInstructors(false);
      }
    };

    fetchInstructors();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Cohort name is required"),
    instructor_id: Yup.string().required("Instructor is required"),
    course_start_date: Yup.date().required("Start date is required"),
    course_end_date: Yup.date()
      .required("End date is required")
      .min(Yup.ref("course_start_date"), "End date must be after start date"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      const response = await fetch("http://localhost/lms/add_cohort.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        resetForm();
        navigate("/dashboard");
      } else if (result.error) {
        Object.keys(result.error).forEach((key) => {
          setFieldError(key, result.error[key]);
        });
      }
    } catch (error) {
      console.error("Error adding cohort:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add New Cohort
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={{
              name: "",
              instructor_id: "",
              course_start_date: "",
              course_end_date: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Cohort Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Cohort 2024 - Spring"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary"
                  />
                  <ErrorMessage name="name" component="div" className="mt-1 text-red-500 text-sm" />
                </div>

                <div>
                  <label htmlFor="instructor_id" className="block text-sm font-medium text-gray-700">
                    Instructor
                  </label>
                  <Field
                    as="select"
                    name="instructor_id"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary"
                  >
                    <option value="">Select an instructor</option>
                    {loadingInstructors ? (
                      <option disabled>Loading...</option>
                    ) : (
                      instructors.map((instructor) => (
                        <option key={instructor.id} value={instructor.id}>
                          {instructor.name}
                        </option>
                      ))
                    )}
                  </Field>
                  <ErrorMessage name="instructor_id" component="div" className="mt-1 text-red-500 text-sm" />
                </div>

                <div>
                  <label htmlFor="course_start_date" className="block text-sm font-medium text-gray-700">
                    Course Start Date
                  </label>
                  <Field
                    type="date"
                    name="course_start_date"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary"
                  />
                  <ErrorMessage
                    name="course_start_date"
                    component="div"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="course_end_date" className="block text-sm font-medium text-gray-700">
                    Course End Date
                  </label>
                  <Field
                    type="date"
                    name="course_end_date"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary"
                  />
                  <ErrorMessage
                    name="course_end_date"
                    component="div"
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {isSubmitting ? "Adding..." : "Add Cohort"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddCohort;
