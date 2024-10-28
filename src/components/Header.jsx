// components/Header.jsx
import React from "react";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  if (!user) return null; // Render nothing if user is not defined

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <BookOpen className="h-8 w-8 text-primary mr-2" />
        <span className="text-xl font-bold text-gray-900">SACDMJA</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">
          {user.name} ({user.role})
        </span>
        <button
          onClick={handleLogout}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
