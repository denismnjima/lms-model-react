// pages/SingleSubmodule.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SingleSubmodule = () => {
  const location = useLocation();
  const [submodule, setSubmodule] = useState(null);
  const submoduleId = new URLSearchParams(location.search).get("submodule_id");

  // Fetch submodule details
  useEffect(() => {
    const fetchSubmodule = async () => {
      try {
        const response = await fetch(`http://localhost/lms/single_submodule.php?submodule_id=${submoduleId}`);
        const data = await response.json();
        if (data.success) {
          setSubmodule(data.data);
        } else {
          console.error("Failed to fetch submodule:", data);
        }
      } catch (error) {
        console.error("Error fetching submodule:", error);
      }
    };

    fetchSubmodule();
  }, [submoduleId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      {submodule ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{submodule.submodule_name}</h1>
          <p className="text-gray-600">{submodule.submodule_content}</p>
          <p className="text-sm text-gray-500 mt-4">Type: {submodule.submodule_type}</p>
        </>
      ) : (
        <p className="text-gray-500">Loading submodule details...</p>
      )}
    </div>
  );
};

export default SingleSubmodule;
