// pages/Login.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { BookOpen, User, Lock } from "lucide-react";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [loginAs, setLoginAs] = useState("student");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      let endpoint;
      switch (loginAs) {
        case "admin":
          endpoint = "http://localhost/lms/admin_login.php";
          break;
        case "instructor":
          endpoint = "http://localhost/lms/instructor_login.php";
          break;
        default:
          endpoint = "http://localhost/lms/student_login.php";
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.success) {
        setUser({
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          role: loginAs,
        });
        navigate("/dashboard");
      } else {
        setFieldError("email", "Invalid credentials");
        setFieldError("password", "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setFieldError("email", "An error occurred");
      setFieldError("password", "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <BookOpen className="mx-auto h-12 w-auto text-primary" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to SACDMJA LMS
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center space-x-4 mb-6">
            {["student", "instructor", "admin"].map((role) => (
              <button
                key={role}
                className={`px-4 py-2 rounded-md ${
                  loginAs === role ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setLoginAs(role)}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      type="email"
                      name="email"
                      className="focus:ring-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="you@example.com"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="mt-2 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      type="password"
                      name="password"
                      className="focus:ring-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="••••••••"
                    />
                  </div>
                  <ErrorMessage name="password" component="div" className="mt-2 text-sm text-red-600" />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
