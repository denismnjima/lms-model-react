// pages/InstructorCohorts.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InstructorCohorts = ({ instructorId }) => {
  const [cohorts, setCohorts] = useState([]);
  const navigate = useNavigate();

  // Fetch instructor cohorts on component mount
  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await fetch(`https://test.istreet.co.ke/instructor_cohorts.php?instructor_id=${instructorId}`);
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

    if (instructorId) fetchCohorts();
  }, [instructorId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">My Cohorts</h1>
      {cohorts.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Cohort Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Start Date</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">End Date</th>
              <th className="px-6 py-3 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cohorts.map((cohort) => (
              <tr key={cohort.cohort_id} className="border-t border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {cohort.cohort_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {cohort.course_start_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {cohort.course_end_date}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => navigate(`/cohort-students?cohort_id=${cohort.cohort_id}`)}
                    className="py-1 px-3 bg-primary text-white rounded-md hover:bg-primary-dark"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No cohorts assigned.</p>
      )}
    </div>
  );
};

export default InstructorCohorts;
