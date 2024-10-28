// pages/StudentSingleCourse.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StudentSingleCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [expandedModuleId, setExpandedModuleId] = useState(null);
  const courseId = new URLSearchParams(location.search).get("course_id");

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`https://test.istreet.co.ke/modules_list.php?course_id=${courseId}`);
        const data = await response.json();
        if (data.success) {
          setModules(data.data);
        } else {
          console.error("Failed to fetch modules:", data);
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, [courseId]);

  const fetchSubmodules = async (moduleId) => {
    try {
      const response = await fetch(`https://test.istreet.co.ke/submodules.php?module_id=${moduleId}`);
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error("Error fetching submodules:", error);
      return [];
    }
  };

  const toggleModule = async (moduleId) => {
    if (expandedModuleId === moduleId) {
      setExpandedModuleId(null);
    } else {
      const submodules = await fetchSubmodules(moduleId);
      setModules((prevModules) =>
        prevModules.map((mod) => (mod.module_id === moduleId ? { ...mod, submodules } : mod))
      );
      setExpandedModuleId(moduleId);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Course Modules</h1>
      {modules.map((module) => (
        <div key={module.module_id} className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-lg font-semibold cursor-pointer" onClick={() => toggleModule(module.module_id)}>
            {module.module_name}
          </h2>
          {expandedModuleId === module.module_id && (
            <div className="mt-2">
              {module.submodules && module.submodules.length > 0 ? (
                <ul>
                  {module.submodules.map((submodule) => (
                    <li
                      key={submodule.submodule_id}
                      onClick={() =>
                        navigate(`/single-submodule?submodule_id=${submodule.submodule_id}`)
                      }
                      className="cursor-pointer text-primary hover:underline"
                    >
                      {submodule.submodule_name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No submodules available.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentSingleCourse;
