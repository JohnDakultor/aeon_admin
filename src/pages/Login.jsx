import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { HiMenu, HiX } from "react-icons/hi"; // Import icons for drawer toggle

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Admin = () => {
  const [data, setData] = useState({
    totalBookings: 0,
    availableRooms: 0,
    revenue: 0,
    overallBooked: 0, // Replace registeredUsers with overallBooked
    sales: [], // For line chart (sales for past months)
    roomsData: {}, // Data for Pie Chart (rooms status)
    salesThisMonth: 0, // Sales for this month
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer state for mobile view

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/dashboard"
        );
        setData(response.data); // Assuming the response contains the necessary data
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  // Prepare chart data for sales (line chart)
  const salesData = {
    labels: data.sales.map((sale) => sale.month),
    datasets: [
      {
        label: "Sales Revenue",
        data: data.sales.map((sale) => sale.amount),
        borderColor: "#3b82f6", // Blue
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Light blue
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Prepare chart data for available rooms (pie chart)
  const roomsData = {
    labels: ["Occupied", "Available"],
    datasets: [
      {
        data: [data.roomsData.occupied, data.roomsData.available],
        backgroundColor: ["#ff6347", "#3b82f6"], // Red for occupied, Blue for available
        hoverOffset: 4,
      },
    ],
  };

  // Prepare chart data for sales this month (pie chart)
  const salesThisMonthData = {
    labels: ["Sales Made", "Remaining Sales Target"],
    datasets: [
      {
        data: [data.salesThisMonth, 10000 - data.salesThisMonth], // Example target is 10,000
        backgroundColor: ["#3b82f6", "#e5e7eb"], // Blue for sales made, Light gray for target
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isDrawerOpen ? "block" : "hidden"
        } md:block w-64 bg-blue-600 text-white p-4 fixed inset-0 z-10 md:z-0 transition-all`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button
            className="md:hidden text-3xl"
            onClick={() => setIsDrawerOpen(false)}
          >
            <HiX />
          </button>
        </div>
        <ul>
          <li className="mb-4">
            <a href="/admin" className="hover:text-blue-300">
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a href="/admin/bookings" className="hover:text-blue-300">
              Manage Bookings
            </a>
          </li>
          <li className="mb-4">
            <a href="/admin/rooms" className="hover:text-blue-300">
              Manage Rooms
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        {/* Drawer Button for Mobile */}
        <button
          className="md:hidden text-3xl text-blue-600"
          onClick={() => setIsDrawerOpen(true)}
        >
          <HiMenu />
        </button>
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Bookings */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold">Total Bookings</h2>
            <p className="text-xl text-gray-500 mt-2">{data.totalBookings}</p>
          </div>

          {/* Available Rooms */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold">Available Rooms</h2>
            <p className="text-xl text-gray-500 mt-2">{data.availableRooms}</p>
          </div>

          {/* Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold">Revenue</h2>
            <p className="text-xl text-gray-500 mt-2">${data.revenue}</p>
          </div>

          {/* Overall Booked (Year) */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold">Overall Booked (Year)</h2>
            <p className="text-xl text-gray-500 mt-2">{data.overallBooked}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Sales Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">
              Sales Breakdown (Past Months)
            </h2>
            <div className="mt-4">
              <Line
                data={salesData}
                options={{ responsive: true, maintainAspectRatio: true }}
              />
            </div>
          </div>

          {/* Available Rooms Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">Room Availability</h2>
            <div className="mt-4 w-full max-w-xs mx-auto">
              <Pie
                data={roomsData}
                options={{ responsive: true, maintainAspectRatio: true }}
              />
            </div>
          </div>

          {/* Sales This Month Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">Sales This Month</h2>
            <div className="mt-4 w-full max-w-xs mx-auto">
              <Pie
                data={salesThisMonthData}
                options={{ responsive: true, maintainAspectRatio: true }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
