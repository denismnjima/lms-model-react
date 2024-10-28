// App.jsx
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCohort from "./pages/AddCohort";
import Instructors from "./pages/Instructors";
import StudentsList from "./pages/StudentsList";
import CohortsList from "./pages/CohortsList";
import CohortStudents from "./pages/CohortStudents";
import CoursesList from "./pages/CoursesList";
import AddCourses from "./pages/AddCourses";
import InstructorCohorts from "./pages/InstructorCohorts";
import SingleCourse from "./pages/SingleCourse";
import SingleSubmodule from "./pages/SingleSubmodule";
import StudentSingleCourse from "./pages/StudentSingleCourse";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/dashboard" element={<Dashboard user={user} />} />
      {user?.role === "admin" && <Route path="/add-cohort" element={<AddCohort  user={user}/>} />}
      {user?.role === "admin" && <Route path="/instructors" element={<Instructors />} />}
      {(user?.role === "admin" || user?.role === "instructor") && (
        <>
          <Route path="/students" element={<StudentsList />} />
          <Route path="/courses" element={<CoursesList user={user}/>} />
          <Route path="/add-course" element={<AddCourses />} />
        </>
      )}
      {user?.role === "admin" && <Route path="/cohorts" element={<CohortsList />} />}
      {user?.role === "instructor" && (
        <Route path="/instructor-cohorts" element={<InstructorCohorts instructorId={user.id} />} />
      )}
      <Route path="/cohort-students" element={<CohortStudents />} />
      <Route path="/" element={<Dashboard user={user} />} />
      <Route path="/single-course" element={<SingleCourse />} />
      <Route path="/single-submodule" element={<SingleSubmodule />} />
      <Route path="/student-course" element={<StudentSingleCourse />} />
      <Route path="/single-submodule" element={<SingleSubmodule />} />
    </Routes>
  );
}

export default App;
