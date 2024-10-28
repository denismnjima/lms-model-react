// pages/CoursesList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "lucide-react"; // Icon for course thumbnail
import Sidebar from "../components/Sidebar";

const CoursesList = ({user}) => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost/lms/courses_list.php");
        const data = await response.json();
        if (data.success) {
          setCourses(data.data);
        } else {
          console.error("Failed to fetch courses:", data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex items-center justify-center h-48 bg-gray-200">
              <Book className="text-gray-500 h-24 w-24" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{course.name}</h2>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <button
                onClick={() => navigate(`/single-course?course_id=${course.id}`)}
                className="mt-4 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Manage
              </button>
            </div>
          </div>
        ))}
        {courses.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">No courses available.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default CoursesList;
