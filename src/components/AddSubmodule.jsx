// components/AddSubmodule.jsx
import React, { useState } from "react";

const AddSubmodule = ({ moduleId, onSubmoduleAdded }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("Text");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://test.istreet.co.ke/submodules.php?module_id=${moduleId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content, type}),
      });

      const result = await response.json();
      if (result.success) {
        alert(result.message);
        onSubmoduleAdded(); // Callback to refresh submodules list
        setName("");
        setContent("");
        setType("Text");
      } else {
        alert(result.error || "Failed to add submodule");
      }
    } catch (error) {
      console.error("Error adding submodule:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-2">Add New Submodule</h3>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Submodule Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          rows="3"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        {isSubmitting ? "Adding..." : "Add Submodule"}
      </button>
    </form>
  );
};

export default AddSubmodule;
