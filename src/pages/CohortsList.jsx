// pages/CohortsList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const CohortsList = () => {
  const [cohorts, setCohorts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch cohorts on component mount
  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await fetch("https://test.istreet.co.ke/list_cohorts.php");
        const data = await response.json();
        if (data.success) {
          setCohorts(data.data);
        } else {
          console.error("Failed to fetch cohorts:", data);
        }
      } catch (error) {
        console.error("Error fetching cohorts:", error);
      }
    };

    fetchCohorts();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter cohorts based on the search term
  const filteredCohorts = cohorts.filter(
    (cohort) =>
      cohort.cohort_name.toLowerCase().includes(searchTerm) ||
      cohort.instructor_name.toLowerCase().includes(searchTerm)
  );

  // Navigate to CohortStudents page with cohort_id as query param
  const handleRowClick = (cohortId) => {
    navigate(`/cohort-students?cohort_id=${cohortId}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Cohorts</h1>
      <div className="flex items-center mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by cohort name or instructor"
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
            <th className="px-6 py-3 text-left font-semibold text-gray-700">Cohort Name</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">Instructor</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">Start Date</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">End Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredCohorts.map((cohort) => (
            <tr
              key={cohort.cohort_id}
              onClick={() => handleRowClick(cohort.cohort_id)}
              className="cursor-pointer border-t border-gray-200 hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {cohort.cohort_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {cohort.instructor_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {cohort.course_start_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {cohort.course_end_date}
              </td>
            </tr>
          ))}
          {filteredCohorts.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No cohorts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CohortsList;
