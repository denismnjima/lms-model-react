// pages/CohortStudents.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddToCohort from "./AddToCohort";

const CohortStudents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [cohort, setCohort] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);

  // Extract cohort_id from query parameters
  const cohortId = new URLSearchParams(location.search).get("cohort_id");

  // Fetch students in the cohort on component mount
  useEffect(() => {
    const fetchCohortStudents = async () => {
      try {
        const response = await fetch(`http://localhost/lms/view_by_cohort.php?cohort_id=${cohortId}`);
        const data = await response.json();
        if (data.success) {
          setStudents(data.data);
          setCohort({
            name: data.data[0]?.cohort_name,
            startDate: data.data[0]?.course_start_date,
            endDate: data.data[0]?.course_end_date,
            instructor: data.data[0]?.instructor_name,
          });
        } else {
          console.error("Failed to fetch students:", data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (cohortId) fetchCohortStudents();
  }, [cohortId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Cohort: {cohort.name}</h1>
      <p>Instructor: {cohort.instructor}</p>
      <p>Course Dates: {cohort.startDate} to {cohort.endDate}</p>

      <button
        onClick={() => setShowAddModal(true)}
        className="mt-4 mb-6 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        Add Students to Cohort
      </button>

      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">Age</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
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
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No students found in this cohort.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showAddModal && (
        <AddToCohort
          cohortId={cohortId}
          onClose={() => setShowAddModal(false)}
          onAddSuccess={() => {
            setShowAddModal(false);
            navigate(0); // Refresh the page to show updated student list
          }}
        />
      )}
    </div>
  );
};

export default CohortStudents;
