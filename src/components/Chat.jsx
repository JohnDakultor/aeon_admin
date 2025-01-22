import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ChatAdmin = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  

  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    setSocket(socketInstance);

    socketInstance.emit("admin_connected");

    socketInstance.on("message", (message) => {
      if (message?.text && message?.sender) {
        const textToRender =
          typeof message.text === "object" ? message.text.message : message.text;

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: textToRender, sender: message.sender },
        ]);
      } else {
        console.error("Invalid message format:", message);
      }
    });

    socketInstance.on("user_connected", (socketId) => {
      setConnectedUsers((prevUsers) => [...prevUsers, socketId]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSend = (userSocketId) => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "admin" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.emit("send_message_admin", { socketId: userSocketId, message: input });
      setInput("");
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);  // Close the chat by setting isChatOpen to false
  };

  return (
    isChatOpen && (  // Only render the chat if isChatOpen is true
      <div className="fixed bottom-4 right-4 w-full max-w-md sm:max-w-lg md:max-w-xl z-50">
        <div className="relative bg-white shadow-xl rounded-lg flex flex-col h-[85vh] sm:h-[75vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white rounded-t-lg">
            <h1 className="text-lg font-semibold sm:text-xl">Admin Chat</h1>
            <button
              onClick={handleCloseChat}  // Close the chat
              className="text-white hover:text-gray-200"
            >
              ✖
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "admin" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg text-sm max-w-xs break-words ${
                    message.sender === "admin"
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="p-4 bg-white border-t flex items-center space-x-3">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend(connectedUsers[0]);
              }}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base"
              onClick={() => handleSend(connectedUsers[0])}
            >
              Send
            </button>
          </div>

          {/* Connected Users */}
          <div className="p-4 bg-gray-200 border-t rounded-b-lg">
            <h3 className="text-lg font-semibold mb-2">Connected Users:</h3>
            <ul className="space-y-2">
              {connectedUsers.length > 0 ? (
                connectedUsers.map((socketId) => (
                  <li key={socketId} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{socketId}</span>
                    <button
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      onClick={() => handleSend(socketId)}
                    >
                      Message
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-600">No users connected.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatAdmin;
