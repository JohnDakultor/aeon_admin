// import React, { useState } from "react";
// import { HiOutlineSearch, HiPencilAlt, HiTrash } from "react-icons/hi";

// const ManageBookings = () => {
//   // Sample data for initial bookings
//   const sampleBookings = [
//     {
//       id: 1,
//       guestName: "John Doe",
//       room: "Deluxe Suite",
//       checkIn: "2025-01-01",
//       checkOut: "2025-01-05",
//       guests: 2,
//       payment: "$500",
//       phone: "123-456-7890",
//       email: "john.doe@example.com",
//     },
//     {
//       id: 2,
//       guestName: "Jane Smith",
//       room: "Superior Suite",
//       checkIn: "2025-01-10",
//       checkOut: "2025-01-15",
//       guests: 3,
//       payment: "$750",
//       phone: "987-654-3210",
//       email: "jane.smith@example.com",
//     },
//     {
//       id: 3,
//       guestName: "Alice Johnson",
//       room: "Deluxe Double Studio",
//       checkIn: "2025-02-01",
//       checkOut: "2025-02-03",
//       guests: 1,
//       payment: "$300",
//       phone: "555-123-4567",
//       email: "alice.johnson@example.com",
//     },
//   ];

//   const [bookings, setBookings] = useState(sampleBookings); // Initialize with sample data
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e) => setSearchQuery(e.target.value);

//   const handleEdit = (id) => {
//     console.log("Edit booking with ID:", id);
//     alert(`Edit functionality for booking ID ${id} is not implemented yet.`);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this booking?")) {
//       setBookings((prev) => prev.filter((booking) => booking.id !== id));
//       alert("Booking deleted successfully.");
//     }
//   };

//   const filteredBookings = bookings.filter((booking) =>
//     booking.guestName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-bold text-blue-600 mb-6">Manage Bookings</h1>

//       {/* Search Bar */}
//       <div className="flex items-center bg-white rounded-lg shadow-md p-4 mb-6">
//         <HiOutlineSearch className="text-gray-400 text-2xl mr-2" />
//         <input
//           type="text"
//           placeholder="Search by guest name"
//           className="w-full outline-none"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>

//       {/* Bookings Display */}
//       <div className="space-y-4 md:hidden">
//         {filteredBookings.map((booking) => (
//           <div
//             key={booking.id}
//             className="bg-white rounded-lg shadow-md p-4 flex flex-col"
//           >
//             <h3 className="text-xl font-bold mb-2">{booking.guestName}</h3>
//             <p>
//               <strong>Room:</strong> {booking.room}
//             </p>
//             <p>
//               <strong>Check-in:</strong> {booking.checkIn}
//             </p>
//             <p>
//               <strong>Check-out:</strong> {booking.checkOut}
//             </p>
//             <p>
//               <strong>Guests:</strong> {booking.guests}
//             </p>
//             <p>
//               <strong>Payment:</strong> {booking.payment}
//             </p>
//             <p>
//               <strong>Payment Meth:</strong> {booking.email}
//             </p>
//             <p>
//               <strong>Phone:</strong> {booking.phone}
//             </p>
//             <p>
//               <strong>Email:</strong> {booking.email}
//             </p>
//             <div className="mt-4 flex space-x-2">
//               <button
//                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 onClick={() => handleEdit(booking.id)}
//               >
//                 <HiPencilAlt />
//               </button>
//               <button
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 onClick={() => handleDelete(booking.id)}
//               >
//                 <HiTrash />
//               </button>
//             </div>
//           </div>
//         ))}
//         {filteredBookings.length === 0 && (
//           <p className="text-center text-gray-500">No bookings found.</p>
//         )}
//       </div>

//       {/* Table for Larger Screens */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="w-full bg-white shadow-lg rounded-lg">
//           <thead>
//             <tr className="bg-blue-600 text-white">
//               <th className="px-4 py-2 text-left">Guest Name</th>
//               <th className="px-4 py-2 text-left">Room</th>
//               <th className="px-4 py-2 text-left">Check-in</th>
//               <th className="px-4 py-2 text-left">Check-out</th>
//               <th className="px-4 py-2 text-left">Guests</th>
//               <th className="px-4 py-2 text-left">Payment</th>
//               <th className="px-4 py-2 text-left">Phone</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBookings.map((booking) => (
//               <tr key={booking.id} className="border-t hover:bg-gray-100">
//                 <td className="px-4 py-2">{booking.guestName}</td>
//                 <td className="px-4 py-2">{booking.room}</td>
//                 <td className="px-4 py-2">{booking.checkIn}</td>
//                 <td className="px-4 py-2">{booking.checkOut}</td>
//                 <td className="px-4 py-2">{booking.guests}</td>
//                 <td className="px-4 py-2">{booking.payment}</td>
//                 <td className="px-4 py-2">{booking.phone}</td>
//                 <td className="px-4 py-2">{booking.email}</td>
//                 <td className="px-4 py-2">
//                   <div className="flex space-x-2">
//                     <button
//                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                       onClick={() => handleEdit(booking.id)}
//                     >
//                       <HiPencilAlt />
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                       onClick={() => handleDelete(booking.id)}
//                     >
//                       <HiTrash />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {filteredBookings.length === 0 && (
//               <tr>
//                 <td colSpan="9" className="text-center py-4 text-gray-500">
//                   No bookings found. Try adjusting your search.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageBookings;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineSearch, HiPencilAlt, HiTrash } from "react-icons/hi";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const openEditModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    axios
      .put(
        `http://localhost:5000/api/bookings/${selectedBooking.id}`,
        selectedBooking
      )
      .then((response) => {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === selectedBooking.id ? response.data : booking
          )
        );
        closeModal();
        alert("Booking updated successfully.");
      })
      .catch((error) => console.error("Error updating booking:", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      axios
        .delete(`http://localhost:5000/api/bookings/${id}`)
        .then(() => {
          setBookings((prev) => prev.filter((booking) => booking.id !== id));
          alert("Booking deleted successfully.");
        })
        .catch((error) => console.error("Error deleting booking:", error));
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    `${booking.first_name} ${booking.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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

      {/* Table for Larger Screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2 text-left">Guest Name</th>
              <th className="px-4 py-2 text-left">Room</th>
              <th className="px-4 py-2 text-left">Check-in</th>
              <th className="px-4 py-2 text-left">Check-out</th>
              <th className="px-4 py-2 text-left">Guests</th>
              <th className="px-4 py-2 text-left">Payment Amount</th>
              <th className="px-4 py-2 text-left">Payment Method</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Arrival-time</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">
                  {booking.first_name} {booking.last_name}
                </td>
                <td className="px-4 py-2">{booking.room_type}</td>
                <td className="px-4 py-2">
                  {new Date(booking.arrival_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(booking.departure_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{booking.number_of_guests}</td>
                <td className="px-4 py-2">{booking.payment_amount || "N/A"}</td>
                <td className="px-4 py-2">{booking.payment_method || "N/A"}</td>
                <td className="px-4 py-2">{booking.phone_number || "N/A"}</td>
                <td className="px-4 py-2">{booking.email || "N/A"}</td>
                <td className="px-4 py-2">
                  {(() => {
                    const [hour, minute] = booking.arrival_time.split(":");
                    const date = new Date();
                    date.setHours(hour);
                    date.setMinutes(minute);

                    return date.toLocaleString([], {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    });
                  })()}
                </td>

                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => openEditModal(booking)}
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
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No bookings found. Try adjusting your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-4 mb-4 shadow-lg rounded-lg"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {booking.first_name} {booking.last_name}
              </h3>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => openEditModal(booking)}
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
            </div>
            <p>
              <strong>Room:</strong> {booking.room_type}
            </p>
            <p>
              <strong>Check-in:</strong>{" "}
              {new Date(booking.arrival_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Check-out:</strong>{" "}
              {new Date(booking.departure_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Guests:</strong> {booking.number_of_guests}
            </p>
            <p>
              <strong>Payment Amount:</strong> {booking.payment_amount || "N/A"}
            </p>
            <p>
              <strong>Payment Method:</strong> {booking.payment_method || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {booking.phone_number || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {booking.email || "N/A"}
            </p>
            <p>
              <strong>Arrival Time:</strong> {(() => {
                    const [hour, minute] = booking.arrival_time.split(":");
                    const date = new Date();
                    date.setHours(hour);
                    date.setMinutes(minute);

                    return date.toLocaleString([], {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    });
                  })()}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Booking</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Guest Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={selectedBooking.first_name}
                onChange={(e) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={selectedBooking.last_name}
                onChange={(e) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Room Type
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={selectedBooking.room_type}
                onChange={(e) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    room_type: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={selectedBooking.arrival_date.substring(0, 10)}
                onChange={(e) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    arrival_date: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Check-out Date
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={selectedBooking.departure_date.substring(0, 10)}
                onChange={(e) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    departure_date: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Arrival Time
              </label>
              <input
                type="time"
                className="w-full p-2 border rounded"
                value={selectedBooking.arrival_time}
                onChange={(e) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    arrival_time: e.target.value,
                  }))
                }
              />
            </div>
          

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Number of Guests
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={selectedBooking.number_of_guests}
                onChange={(e) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    number_of_guests: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Payment Amount
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={selectedBooking.payment_amount}
                onChange={(e) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    payment_amount: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Payment Method
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={selectedBooking.payment_method}
                onChange={(e) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    payment_method: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full p-2 border rounded"
                value={selectedBooking.phone_number}
                onChange={(e) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    phone_number: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={selectedBooking.email}
                onChange={(e) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
