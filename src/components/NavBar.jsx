import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
          Hotel Booking
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-white hover:text-blue-300">Home</a>
          <a href="/admin" className="text-white hover:text-blue-300">Admin</a>
          <button className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Log Out
          </button>
        </div>
        <div className="md:hidden">
          <button className="text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
