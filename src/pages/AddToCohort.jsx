// pages/AddToCohort.jsx
import React, { useEffect, useState } from "react";

const AddToCohort = ({ cohortId, onClose, onAddSuccess }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available students on component mount
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

  // Handle student selection
  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  // Submit selected students to cohort
  const handleAddToCohort = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://test.istreet.co.ke/add_to_cohort.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cohort_id: cohortId,
          student_ids: selectedStudents,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert(result.message);
        onAddSuccess(); // Callback to refresh parent component
      } else {
        alert(result.error || "Failed to add students to cohort");
      }
    } catch (error) {
      console.error("Error adding students to cohort:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Add Students to Cohort</h2>

        <ul className="max-h-64 overflow-y-auto mb-4">
          {students.map((student) => (
            <li key={student.student_id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedStudents.includes(student.student_id)}
                onChange={() => handleSelectStudent(student.student_id)}
                className="mr-2"
              />
              <span className="text-gray-700">{student.student_name} - {student.student_email}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleAddToCohort}
            disabled={isSubmitting}
            className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            {isSubmitting ? "Adding..." : "Add Selected"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCohort;
