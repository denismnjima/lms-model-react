// components/AddModule.jsx
import React, { useState } from "react";

const AddModule = ({ courseId, onModuleAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://test.istreet.co.ke/add_module.php?course_id=${courseId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }), // Include course_id here
      });

      const result = await response.json();
      if (result.success) {
        alert(result.message);
        onModuleAdded(); // Callback to refresh modules list
        setName("");
        setDescription("");
      } else {
        alert(result.error || "Failed to add module");
      }
    } catch (error) {
      console.error("Error adding module:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-2">Add New Module</h3>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Module Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          rows="3"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        {isSubmitting ? "Adding..." : "Add Module"}
      </button>
    </form>
  );
};

export default AddModule;
