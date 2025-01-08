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
import { HiMenu, HiX } from "react-icons/hi";

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
    overallBooked: 0,
    sales: [],
    roomsData: {},
    salesThisMonth: 0,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/dashboard"
        );
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data", err);
        alert("Failed to fetch dashboard data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chart data preparation
  const salesData = {
    labels: data.sales.map((sale) => sale.month),
    datasets: [
      {
        label: "Sales Revenue",
        data: data.sales.map((sale) => sale.amount),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const roomsData = {
    labels: ["Occupied", "Available"],
    datasets: [
      {
        data: [data.roomsData.occupied, data.roomsData.available],
        backgroundColor: ["#ff6347", "#3b82f6"],
        hoverOffset: 4,
      },
    ],
  };

  const salesThisMonthData = {
    labels: ["Sales Made", "Remaining Sales Target"],
    datasets: [
      {
        data: [data.salesThisMonth, 10000 - data.salesThisMonth],
        backgroundColor: ["#3b82f6", "#e5e7eb"],
        hoverOffset: 4,
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-blue-600 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Drawer Toggle Button */}
        <button
          className="md:hidden text-3xl text-blue-600 mb-4"
          onClick={() => setIsDrawerOpen(true)}
        >
          <HiMenu />
        </button>

        <h1 className="text-4xl font-bold text-blue-600 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Bookings", value: data.totalBookings },
            { title: "Available Rooms", value: data.availableRooms },
            { title: "Revenue", value: `$${data.revenue}` },
            { title: "Overall Booked (Year)", value: data.overallBooked },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-700">
                {stat.title}
              </h2>
              <p className="text-2xl text-blue-600 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sales Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">
              Sales Breakdown
            </h2>
            <div className="mt-4">
              <Line
                data={salesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: { position: "top" },
                    tooltip: { enabled: true },
                  },
                }}
              />
            </div>
          </div>

          {/* Room Availability Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">
              Room Availability
            </h2>
            <div className="mt-4 w-full max-w-xs mx-auto">
              <Pie data={roomsData} options={{ responsive: true }} />
            </div>
          </div>

          {/* Sales This Month Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">
              Sales This Month
            </h2>
            <div className="mt-4 w-full max-w-xs mx-auto">
              <Pie data={salesThisMonthData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
