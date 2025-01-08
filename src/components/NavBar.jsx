import React, { useState } from "react";
import { HiX, HiMenu } from "react-icons/hi"; // Import X and Menu icons from react-icons

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-30 md:hidden bg-blue-600 text-white p-2 rounded-full shadow-lg"
        aria-label="Open navigation menu"
        onClick={() => setIsDrawerOpen(true)}
      >
        <HiMenu className="text-2xl" />
      </button>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-20 bg-blue-600 text-white w-64 h-screen p-4 transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:z-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <button
              className="md:hidden text-3xl"
              aria-label="Close navigation menu"
              onClick={() => setIsDrawerOpen(false)}
            >
              <HiX />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-4 flex-grow">
            <li>
              <a
                href="/admin"
                className="hover:text-blue-300 block text-lg transition-all duration-300 transform hover:translate-x-2"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/admin/bookings"
                className="hover:text-blue-300 block text-lg transition-all duration-300 transform hover:translate-x-2"
              >
                Manage Bookings
              </a>
            </li>
            <li>
              <a
                href="/admin/manage-rooms"
                className="hover:text-blue-300 block text-lg transition-all duration-300 transform hover:translate-x-2"
              >
                Manage Rooms
              </a>
            </li>
          </ul>

          {/* Footer */}
          <div className="mt-auto">
            <p className="text-sm text-center">
              © {new Date().getFullYear()} Hotel Admin Panel
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
