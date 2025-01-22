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

import ChatAdmin from "../components/Chat";

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
    sales: [],
    roomsData: {},
    salesThisMonth: 0,
    bookingsByMonth: [], // Added for the new chart
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bookings data
        const bookingsResponse = await axios.get("http://localhost:5000/api/totalBookings");
        const bookings = bookingsResponse.data.bookings;
        const totalRevenue = bookings.reduce(
          (sum, booking) => sum + (booking.payment_amount || 0),
          0
        );
  
        // Calculate bookings per month
        const bookingsByMonth = bookings.reduce((acc, booking) => {
          const month = new Date(booking.arrival_date).toLocaleString("default", { month: "long" });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});
  
        // Fetch room data
        const roomsResponse = await axios.get("http://localhost:5000/api/Rooms");
        console.log(roomsResponse.data); // Log the response to check its structure
  
        // Calculate total and available rooms
        const totalRooms = roomsResponse.data.length; // Total rooms is the length of the array
        const availableRooms = roomsResponse.data.filter(room => room.available).length; // Count rooms where 'available' is true
  
        setData((prevData) => ({
          ...prevData,
          totalBookings: bookings.length,
          revenue: totalRevenue,
          bookingsByMonth: Object.entries(bookingsByMonth).map(
            ([month, count]) => ({ month, count })
          ),
          availableRooms, // Set available rooms data
          roomsData: {
            occupied: totalRooms - availableRooms,
            available: availableRooms,
          },
        }));
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
    labels: data.sales?.map((sale) => sale.month) || [],
    datasets: [
      {
        label: "Sales Revenue",
        data: data.sales?.map((sale) => sale.amount) || [],
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
        data: [data.roomsData?.occupied || 0, data.roomsData?.available || 0],
        backgroundColor: ["#ff6347", "#3b82f6"],
        hoverOffset: 4,
      },
    ],
  };

  const salesThisMonthData = {
    labels: ["Sales Made", "Remaining Sales Target"],
    datasets: [
      {
        data: [data.salesThisMonth || 0, 10000 - (data.salesThisMonth || 0)],
        backgroundColor: ["#3b82f6", "#e5e7eb"],
        hoverOffset: 4,
      },
    ],
  };

  // Monthly Bookings Chart
  const bookingsByMonthData = {
    labels: data.bookingsByMonth.map((item) => item.month),
    datasets: [
      {
        label: "Bookings Per Month",
        data: data.bookingsByMonth.map((item) => item.count),
        borderColor: "#ff6347",
        backgroundColor: "rgba(255, 99, 71, 0.2)",
        fill: true,
        tension: 0.4,
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
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        {/* Stats Cards */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: "Total Bookings", value: data.totalBookings },
              { title: "Available Rooms", value: data.availableRooms },
              { title: "Revenue", value: `₱${data.revenue}` },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-700">
                  {stat.title}
                </h2>
                <p className="text-2xl text-blue-600 mt-2">
                  {stat.title === "Available Rooms"
                    ? `${data.availableRooms}`
                    : stat.value}
                </p>
              </div>
            ))}
          </div>
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

          {/* Bookings Per Month Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">
              Bookings Per Month
            </h2>
            <div className="mt-4">
              <Line
                data={bookingsByMonthData}
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
        </div>

        <div className="fixed bottom-4 right-4 z-50">
          {isChatOpen ? (
            <div className="relative w-80 h-96 bg-white shadow-2xl rounded-lg border border-gray-200">
              <button
                onClick={() => setIsChatOpen(false)}
                className="absolute top-3 right-3 text-gray-100 hover:text-gray-800 transition duration-300"
                aria-label="Close Chat"
              >
                ✖
              </button>
              <ChatAdmin isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
            </div>
          ) : (
            <button
              onClick={() => setIsChatOpen(true)}
              className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-5 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Talk to us!
              {unreadMessages > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
                  {unreadMessages}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
