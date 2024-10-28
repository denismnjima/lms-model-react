// pages/Instructors.jsx
import React, { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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
      }
    };

    fetchInstructors();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Sort instructors based on the selected field and order
  const sortedInstructors = [...instructors].sort((a, b) => {
    const fieldA = a[sortField].toLowerCase();
    const fieldB = b[sortField].toLowerCase();

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Filter instructors based on the search term
  const filteredInstructors = sortedInstructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchTerm) ||
      instructor.email.toLowerCase().includes(searchTerm)
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
      <h1 className="text-2xl font-bold mb-4">Instructors</h1>
      <div className="flex items-center mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by name or email"
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
              onClick={() => toggleSortOrder("name")}
            >
              Name
              {sortField === "name" && (
                sortOrder === "asc" ? <ChevronDown className="inline ml-1" /> : <ChevronUp className="inline ml-1" />
              )}
            </th>
            <th
              className="px-6 py-3 text-left font-semibold text-gray-700 cursor-pointer"
              onClick={() => toggleSortOrder("email")}
            >
              Email
              {sortField === "email" && (
                sortOrder === "asc" ? <ChevronDown className="inline ml-1" /> : <ChevronUp className="inline ml-1" />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredInstructors.map((instructor) => (
            <tr key={instructor.id} className="border-t border-gray-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {instructor.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {instructor.email}
              </td>
            </tr>
          ))}
          {filteredInstructors.length === 0 && (
            <tr>
              <td colSpan="2" className="text-center py-4 text-gray-500">
                No instructors found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Instructors;
