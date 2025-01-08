import React, { useState, useEffect } from "react";
import { HiOutlineSearch, HiPencilAlt, HiTrash } from "react-icons/hi";

const ManageBookings = () => {
  // Sample data for initial bookings
  const sampleBookings = [
    {
      id: 1,
      guestName: "John Doe",
      room: "Deluxe Suite",
      checkIn: "2025-01-01",
      checkOut: "2025-01-05",
    },
    {
      id: 2,
      guestName: "Jane Smith",
      room: "Superior Suite",
      checkIn: "2025-01-10",
      checkOut: "2025-01-15",
    },
    {
      id: 3,
      guestName: "Alice Johnson",
      room: "Deluxe Double Studio",
      checkIn: "2025-02-01",
      checkOut: "2025-02-03",
    },
  ];

  const [bookings, setBookings] = useState(sampleBookings); // Initialize with sample data
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleEdit = (id) => {
    console.log("Edit booking with ID:", id);
    alert(`Edit functionality for booking ID ${id} is not implemented yet.`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      alert("Booking deleted successfully.");
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.guestName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Manage Bookings</h1>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-lg shadow-md p-4 mb-6">
        <HiOutlineSearch className="text-gray-400 text-2xl mr-2" />
        <input
          type="text"
          placeholder="Search by guest name"
          className="w-full outline-none"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2 text-left">Guest Name</th>
              <th className="px-4 py-2 text-left">Room</th>
              <th className="px-4 py-2 text-left">Check-in</th>
              <th className="px-4 py-2 text-left">Check-out</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{booking.guestName}</td>
                <td className="px-4 py-2">{booking.room}</td>
                <td className="px-4 py-2">{booking.checkIn}</td>
                <td className="px-4 py-2">{booking.checkOut}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleEdit(booking.id)}
                    >
                      <HiPencilAlt />
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(booking.id)}
                    >
                      <HiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No bookings found. Try adjusting your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
