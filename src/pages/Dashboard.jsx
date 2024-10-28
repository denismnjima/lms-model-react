// pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ResponsiveContainer,
} from "recharts";
import { Book } from "lucide-react";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (user.role === "student") {
      const fetchCourses = async () => {
        try {
          const response = await fetch(`https://test.istreet.co.ke/student_courses.php?student_id=${user.id}`);
          const data = await response.json();
          if (data.success) {
            setCourses(data.data);
          } else {
            console.error("Failed to fetch student courses:", data);
          }
        } catch (error) {
          console.error("Error fetching student courses:", error);
        }
      };

      fetchCourses();
    }
  }, [user]);

  // Dummy Data for Admin and Instructor Dashboard
  const cohortData = [
    { name: "Cohort 2024 - Spring", students: 150 },
    { name: "Cohort 2024 - Fall", students: 120 },
    { name: "Cohort 2025 - Spring", students: 140 },
  ];

  const gradeData = [
    { course: "Programming 101", averageGrade: 85 },
    { course: "Data Science", averageGrade: 78 },
    { course: "Web Development", averageGrade: 92 },
  ];

  const completionData = [
    { name: "Completed", value: 65 },
    { name: "In Progress", value: 20 },
    { name: "Not Started", value: 15 },
  ];

  const submissionData = [
    { month: "Jan", submissions: 100 },
    { month: "Feb", submissions: 120 },
    { month: "Mar", submissions: 90 },
    { month: "Apr", submissions: 130 },
    { month: "May", submissions: 105 },
  ];

  const attendanceData = [
    { date: "2024-01-01", attendance: 95 },
    { date: "2024-02-01", attendance: 90 },
    { date: "2024-03-01", attendance: 93 },
    { date: "2024-04-01", attendance: 88 },
    { date: "2024-05-01", attendance: 92 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="flex">
      <Sidebar user={user} />

      <div className="p-6 bg-gray-100 flex-1">
        {user.role === "student" ? (
          <div className="min-h-screen">
            <h1 className="text-2xl font-bold mb-6">My Courses</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.course_id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="flex items-center justify-center h-48 bg-gray-200">
                    <Book className="text-gray-500 h-24 w-24" />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{course.course_name}</h2>
                    <p className="text-gray-600 mt-2">{course.course_description}</p>
                    <p className="text-sm text-gray-500 mt-2">Cohort: {course.cohort_name}</p>
                    <button
                      onClick={() => navigate(`/student-course?course_id=${course.course_id}`)}
                      className="mt-4 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
                    >
                      View Course
                    </button>
                  </div>
                </div>
              ))}
              {courses.length === 0 && (
                <p className="text-gray-500 text-center col-span-full">No enrolled courses found.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-screen">
            <h1 className="col-span-full text-2xl font-bold mb-6">Admin & Instructor Dashboard</h1>

            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Student Enrollment by Cohort</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cohortData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Average Grades per Course</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="averageGrade" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Completion Rates for Courses</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={completionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                    {completionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Assignment Submission Rate</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={submissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="submissions" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Student Attendance Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
