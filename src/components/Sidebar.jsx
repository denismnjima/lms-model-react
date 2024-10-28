// components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpenCheck,
  ClipboardList,
  GraduationCap,
  Users,
  PlusCircle,
  UserPlus,
} from "lucide-react";

const Sidebar = ({ user }) => {
  const location = useLocation();

  if (!user) return null;

  const baseNavItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", path: "/courses", icon: BookOpenCheck },
    { name: "Assignments", path: "/assignments", icon: ClipboardList },
    { name: "Grades", path: "/grades", icon: GraduationCap },
  ];

  const instructorNavItems = [
    { name: "Students", path: "/students", icon: Users },
    { name: "Add Course", path: "/add-course", icon: PlusCircle },
    { name: "My Cohorts", path: "/instructor-cohorts", icon: GraduationCap }, // New item for instructor cohorts
  ];

  const adminNavItems = [
    { name: "Instructors", path: "/instructors", icon: UserPlus },
    { name: "Cohorts", path: "/cohorts", icon: GraduationCap },
    { name: "Add Cohort", path: "/add-cohort", icon: PlusCircle },
  ];

  const navItems =
    user.role === "admin"
      ? [...baseNavItems, ...instructorNavItems, ...adminNavItems]
      : user.role === "instructor"
      ? [...baseNavItems, ...instructorNavItems]
      : baseNavItems;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu</h2>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`${
                isActive(item.path) ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
              } flex items-center px-4 py-2 rounded-md`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
