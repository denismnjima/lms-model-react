// pages/StudentsList.jsx
import React, { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("student_name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://test.istreet.co.ke/list_students.php");
        const data = await response.json();
        if (data.success) {
          setStudents(data.data);
        } else {
          console.error("Failed to fetch students:", data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Sort students based on the selected field and order
  const sortedStudents = [...students].sort((a, b) => {
    const fieldA = a[sortField]?.toString().toLowerCase() || "";
    const fieldB = b[sortField]?.toString().toLowerCase() || "";

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Filter students based on the search term
  const filteredStudents = sortedStudents.filter(
    (student) =>
      student.student_name.toLowerCase().includes(searchTerm) ||
      student.student_email.toLowerCase().includes(searchTerm) ||
      (student.instructor_name?.toLowerCase().includes(searchTerm) || false)
  );

  // Toggle sorting order
  const toggleSortOrder = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <div className="flex items-center mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by name, email, or instructor"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
        <thead>
          <tr>
            <th
              className="px-6 py-3 text-left font-semibold text-gray-700 cursor-pointer"
              onClick={() => toggleSortOrder("student_name")}
            >
              Name
              {sortField === "student_name" && (
                sortOrder === "asc" ? <ChevronDown className="inline ml-1" /> : <ChevronUp className="inline ml-1" />
              )}
            </th>
            <th
              className="px-6 py-3 text-left font-semibold text-gray-700 cursor-pointer"
              onClick={() => toggleSortOrder("student_email")}
            >
              Email
              {sortField === "student_email" && (
                sortOrder === "asc" ? <ChevronDown className="inline ml-1" /> : <ChevronUp className="inline ml-1" />
              )}
            </th>
            <th
              className="px-6 py-3 text-left font-semibold text-gray-700 cursor-pointer"
              onClick={() => toggleSortOrder("student_age")}
            >
              Age
              {sortField === "student_age" && (
                sortOrder === "asc" ? <ChevronDown className="inline ml-1" /> : <ChevronUp className="inline ml-1" />
              )}
            </th>
            <th
              className="px-6 py-3 text-left font-semibold text-gray-700 cursor-pointer"
              onClick={() => toggleSortOrder("instructor_name")}
            >
              Instructor
              {sortField === "instructor_name" && (
                sortOrder === "asc" ? <ChevronDown className="inline ml-1" /> : <ChevronUp className="inline ml-1" />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.student_id} className="border-t border-gray-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {student.student_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {student.student_email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {student.student_age || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {student.instructor_name || "Unassigned"}
              </td>
            </tr>
          ))}
          {filteredStudents.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
