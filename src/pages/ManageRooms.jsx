import React, { useState } from "react";

function ManageRooms() {
  const predefinedRooms = [
    { name: "Deluxe Double Studio", capacity: 2, price: 120 },
    { name: "Deluxe Suite", capacity: 4, price: 200 },
    { name: "Superior Suite", capacity: 5, price: 250 },
  ];

  const [rooms, setRooms] = useState([
    { id: 1, name: "Deluxe Double Studio", capacity: 2, price: 120 },
    { id: 2, name: "Deluxe Suite", capacity: 4, price: 200 },
  ]);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    capacity: "",
    price: "",
  });

  const handleAddRoom = () => {
    if (!newRoom.name || !newRoom.capacity || !newRoom.price) {
      alert("Please fill out all fields.");
      return;
    }

    const roomToAdd = {
      id: rooms.length + 1,
      ...newRoom,
    };

    setRooms([...rooms, roomToAdd]);
    setIsPopupVisible(false); // Close popup
    setNewRoom({ name: "", capacity: "", price: "" }); // Reset form
  };

  const handleDelete = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen manage-rooms">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Manage Rooms</h1>

      {/* Table to display existing rooms */}
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">Room Name</th>
            <th className="border px-4 py-2">Capacity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="border px-4 py-2">{room.name}</td>
              <td className="border px-4 py-2">{room.capacity} guests</td>
              <td className="border px-4 py-2">${room.price}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(room.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Room Button */}
      <button
        onClick={() => setIsPopupVisible(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Room
      </button>

      {/* Popup Card */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Room</h2>
            <div className="mb-4">
              <label className="block font-medium mb-2">Room Type</label>
              <select
                className="w-full border px-4 py-2"
                value={newRoom.name}
                onChange={(e) =>
                  setNewRoom((prev) => ({
                    ...prev,
                    name: e.target.value,
                    ...predefinedRooms.find(
                      (room) => room.name === e.target.value
                    ),
                  }))
                }
              >
                <option value="">-- Select Room Type --</option>
                {predefinedRooms.map((room) => (
                  <option key={room.name} value={room.name}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Capacity</label>
              <input
                type="number"
                className="w-full border px-4 py-2"
                value={newRoom.capacity}
                onChange={(e) =>
                  setNewRoom((prev) => ({ ...prev, capacity: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Price</label>
              <input
                type="number"
                className="w-full border px-4 py-2"
                value={newRoom.price}
                onChange={(e) =>
                  setNewRoom((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={() => setIsPopupVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddRoom}
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageRooms;
