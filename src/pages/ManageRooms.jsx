// import React, { useState } from "react";
// import { HiPencilAlt, HiTrash } from "react-icons/hi";

// function ManageRooms() {
//   const predefinedRooms = [
//     { name: "Deluxe Double Studio", capacity: 2, price: 120 },
//     { name: "Deluxe Suite", capacity: 4, price: 200 },
//     { name: "Superior Suite", capacity: 5, price: 250 },
//   ];

//   const [rooms, setRooms] = useState([
//     { id: 1, name: "Deluxe Double Studio", capacity: 2, price: 120, available: true },
//     { id: 2, name: "Deluxe Suite", capacity: 4, price: 200, available: false },
//   ]);

//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const [newRoom, setNewRoom] = useState({
//     name: "",
//     capacity: "",
//     price: "",
//     available: true,
//   });

//   const saveToDatabase = (updatedRooms) => {
//     console.log("Saving to database:", updatedRooms);
//   };

//   const handleAddOrEditRoom = () => {
//     if (!newRoom.name || !newRoom.capacity || !newRoom.price) {
//       alert("Please fill out all fields.");
//       return;
//     }

//     let updatedRooms;
//     if (isEdit) {
//       updatedRooms = rooms.map((room) =>
//         room.id === currentRoom.id ? { ...currentRoom, ...newRoom } : room
//       );
//     } else {
//       const roomToAdd = {
//         id: rooms.length + 1,
//         ...newRoom,
//       };
//       updatedRooms = [...rooms, roomToAdd];
//     }

//     setRooms(updatedRooms);
//     saveToDatabase(updatedRooms);
//     setIsPopupVisible(false);
//     setNewRoom({ name: "", capacity: "", price: "", available: true });
//     setIsEdit(false);
//     setCurrentRoom(null);
//   };

//   const handleEdit = (room) => {
//     setIsEdit(true);
//     setCurrentRoom(room);
//     setNewRoom({
//       name: room.name,
//       capacity: room.capacity,
//       price: room.price,
//       available: room.available,
//     });
//     setIsPopupVisible(true);
//   };

//   const handleDelete = (id) => {
//     const updatedRooms = rooms.filter((room) => room.id !== id);
//     setRooms(updatedRooms);
//     saveToDatabase(updatedRooms);
//   };

//   return (
//     <div className="p-4 md:p-8 bg-gray-100 min-h-screen manage-rooms">
//       <h1 className="text-4xl font-bold text-blue-600 mb-6">Manage Rooms</h1>

//       {/* Table */}
//       <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Room Name</th>
//             <th className="border px-4 py-2">Capacity</th>
//             <th className="border px-4 py-2">Price</th>
//             <th className="border px-4 py-2">Available</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rooms.map((room) => (
//             <tr key={room.id}>
//               <td className="border px-4 py-2">{room.name}</td>
//               <td className="border px-4 py-2">{room.capacity} guests</td>
//               <td className="border px-4 py-2">${room.price}</td>
//               <td className="border px-4 py-2">
//                 {room.available ? "Yes" : "No"}
//               </td>
//               <td className="border px-4 py-2 text-center">
//                 <div className="flex justify-center space-x-2">
//                   <button
//                     onClick={() => handleEdit(room)}
//                     className="text-green-500"
//                   >
//                     <HiPencilAlt size={20} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(room.id)}
//                     className="text-red-500"
//                   >
//                     <HiTrash size={20} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Add Room Button */}
//       <button
//         onClick={() => {
//           setIsPopupVisible(true);
//           setIsEdit(false);
//         }}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Add Room
//       </button>

//       {/* Popup */}
//       {isPopupVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-lg font-bold mb-4">
//               {isEdit ? "Edit Room" : "Add New Room"}
//             </h2>
//             <div className="mb-4">
//               <label className="block font-medium mb-2">Room Type</label>
//               <select
//                 className="w-full border px-4 py-2"
//                 value={newRoom.name}
//                 onChange={(e) =>
//                   setNewRoom((prev) => ({
//                     ...prev,
//                     name: e.target.value,
//                     ...predefinedRooms.find(
//                       (room) => room.name === e.target.value
//                     ),
//                   }))
//                 }
//               >
//                 <option value="">-- Select Room Type --</option>
//                 {predefinedRooms.map((room) => (
//                   <option key={room.name} value={room.name}>
//                     {room.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block font-medium mb-2">Capacity</label>
//               <input
//                 type="number"
//                 className="w-full border px-4 py-2"
//                 value={newRoom.capacity}
//                 onChange={(e) =>
//                   setNewRoom((prev) => ({ ...prev, capacity: e.target.value }))
//                 }
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block font-medium mb-2">Price</label>
//               <input
//                 type="number"
//                 className="w-full border px-4 py-2"
//                 value={newRoom.price}
//                 onChange={(e) =>
//                   setNewRoom((prev) => ({ ...prev, price: e.target.value }))
//                 }
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block font-medium mb-2">Available</label>
//               <select
//                 className="w-full border px-4 py-2"
//                 value={newRoom.available ? "true" : "false"}
//                 onChange={(e) =>
//                   setNewRoom((prev) => ({
//                     ...prev,
//                     available: e.target.value === "true",
//                   }))
//                 }
//               >
//                 <option value="true">Yes</option>
//                 <option value="false">No</option>
//               </select>
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
//                 onClick={() => setIsPopupVisible(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={handleAddOrEditRoom}
//               >
//                 {isEdit ? "Save Changes" : "Add Room"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ManageRooms;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiPencilAlt, HiTrash } from "react-icons/hi";

function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [newRoom, setNewRoom] = useState({
    name: "",
    capacity: "",
    price: "",
    available: true,
  });

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rooms");
      setRooms(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const saveToDatabase = async () => {
    try {
      if (!newRoom.name || !newRoom.capacity || !newRoom.price) {
        alert("All fields must be filled.");
        return;
      }
      const roomData = {
        ...newRoom,
        capacity: Number(newRoom.capacity),
        price: Number(newRoom.price),
       
      };

      if (isEdit) {
        await axios.put(`http://localhost:5000/api/updateRoom/${currentRoom.id}`, roomData);
      } else {
        await axios.post("http://localhost:5000/api/createRoom", roomData);
      }

      fetchRooms();
      setIsPopupVisible(false);
      setNewRoom({ name: "", capacity: "", price: "", available: true, room_number: "" });
      setIsEdit(false);
      setCurrentRoom(null);
    } catch (error) {
      console.error("Error saving room to the database:", error.response?.data || error);
    }
  };

  const handleEdit = (room) => {
    setIsEdit(true);
    setCurrentRoom(room);
    setNewRoom({
      name: room.name,
      capacity: room.capacity,
      price: room.price,
      available: room.available,
      room_number: room.room_number,
    });
    setIsPopupVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteRoom/${id}`);
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen manage-rooms">
      <h1 className="text-2xl sm:text-4xl font-bold text-blue-600 mb-6">Manage Rooms</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 mb-6 text-sm sm:text-base">
          <thead>
            <tr>
              <th className="border px-2 sm:px-4 py-2">Room Name</th>
              <th className="border px-2 sm:px-4 py-2">Capacity</th>
              <th className="border px-2 sm:px-4 py-2">Price</th>
              <th className="border px-2 sm:px-4 py-2">Available</th>
              <th className="border px-2 sm:px-4 py-2">Room Number</th>
              <th className="border px-2 sm:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room.id}>
                  <td className="border px-2 sm:px-4 py-2">{room.name}</td>
                  <td className="border px-2 sm:px-4 py-2">{room.capacity} guests</td>
                  <td className="border px-2 sm:px-4 py-2">₱{room.price}</td>
                  <td className="border px-2 sm:px-4 py-2">{room.available ? "Yes" : "No"}</td>
                  <td className="border px-2 sm:px-4 py-2">{room.room_number}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button onClick={() => handleEdit(room)} className="text-green-500">
                        <HiPencilAlt size={20} />
                      </button>
                      <button onClick={() => handleDelete(room.id)} className="text-red-500">
                        <HiTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No rooms available or error fetching data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => {
          setIsPopupVisible(true);
          setIsEdit(false);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
      >
        Add Room
      </button>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 mx-4">
            <h2 className="text-lg font-bold mb-4">{isEdit ? "Edit Room" : "Add New Room"}</h2>
            <div className="mb-4">
              <label className="block font-medium mb-2">Room Type</label>
              <input
                type="text"
                className="w-full border px-4 py-2"
                value={newRoom.name || ""}
                onChange={(e) => setNewRoom((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Capacity</label>
              <input
                type="number"
                className="w-full border px-4 py-2"
                value={newRoom.capacity || ""}
                onChange={(e) => setNewRoom((prev) => ({ ...prev, capacity: e.target.value }))}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Price</label>
              <input
                type="number"
                className="w-full border px-4 py-2"
                value={newRoom.price || ""}
                onChange={(e) => setNewRoom((prev) => ({ ...prev, price: e.target.value }))}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Available</label>
              <select
                className="w-full border px-4 py-2"
                value={newRoom.available ? "true" : "false"}
                onChange={(e) => setNewRoom((prev) => ({ ...prev, available: e.target.value === "true" }))}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Room Number</label>
              <input
                type="number"
                className="w-full border px-4 py-2"
                value={newRoom.room_number || ""}
                onChange={(e) => setNewRoom((prev) => ({ ...prev, room_number: e.target.value }))}
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
                onClick={saveToDatabase}
              >
                {isEdit ? "Save Changes" : "Add Room"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageRooms;
