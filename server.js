let express = require("express");
require("dotenv").config();
let cors = require("cors");
let path = require("path");
const colors = require("colors");
const socketIo = require("socket.io");
const fs = require("fs");
const http = require("http");
const https = require("https");

let app = express();
app.use(express.json());

app.use(
  cors({
    origin: true,
  })
);
console.log(path.join(__dirname, "./chatwidget/build"));
// Thi 0 t tatic fi og fi th
app.use(
  express.static(path.resolve(path.join(__dirname, "./chatwidget/build")))
);

serverInstance = http.createServer(app);
// Initialize Socket.IO function
function initializeSocket(serverInstance) {
  const io = socketIo(serverInstance, {
    pingTimeout: 60000,
    cors: {
      origin: true,
    },
  });

  // Socket.IO connection logic
  io.on("connection", (socket) => {
    console.log(`Connected to socket.io ${socket.id}`.magenta.bold);

    // socket.on('setup', (userData) => {
    //     const userIdRoom = `user-${userData.id}`;
    //     socket.join(userIdRoom);
    //     console.log(`User ${userData.id} connected to room ${userIdRoom}`.america);
    // });
    // socket.on('customerSetup', (customerData) => {
    //     const customerIdRoom = `customer-${customerData.id}`;
    //     socket.join(customerIdRoom);
    //     console.log(`customer ${customerData.id} connected to room ${customerIdRoom}`.america);
    // });
    // socket.on("join chat", (conversationId) => {
    //     socket.join(conversationId);
    //     console.log(`User Joined Conversation:${conversationId}`.bgCyan);
    // });
    // socket.on("new message", (newMessageRecieved) => {
    //     const senderType = newMessageRecieved.message.senderType
    //     const chatDetails = newMessageRecieved.chatDetails
    //     if (senderType === "user") {
    //         const sendTo = chatDetails.customerId
    //         socket.in(`customer-${sendTo}`).emit("message received", newMessageRecieved);
    //     } else {
    //         const sendTo = chatDetails.userId
    //         socket.in(`user-${sendTo}`).emit("message received", newMessageRecieved);
    //     }
    // });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io; // Return the io instance
}

// Initializing Socket.IO
const io = initializeSocket(serverInstance);

const chatMessages = [
  {
    sender: "user",
    content: "hi",
    timestamp: "16:38",
  },
  {
    sender: "bot",
    content: "Try asking something else!",
    timestamp: "16:38",
  },
  {
    sender: "user",
    content: "hello",
    timestamp: "16:38",
  },
  {
    sender: "bot",
    content: "Hello there!",
    timestamp: "16:38",
  },
];
app.get("/sample", (req, res, next) => {
  console.log("ok ok");
  return res.send({
    message: "oka oka",
  });
});
app.get("/allMessages", (req, res, next) => {
  console.log("ok ok");
  return res.send({
    status: true,
    data: chatMessages,
  });
});

app.post("/customerMessage", (req, res, next) => {
  chatMessages.push(req.body);
  return res.send({
    message: "oka oka",
  });
});

app.post("/userMessage", (req, res, next) => {
    // Get the current time
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
  
    chatMessages.push({
      sender: "bot",
      content: req.body.content,
      timestamp: formattedTime, // Use the dynamically generated time here
    });
    io.sockets.emit("message received", {
      sender: "bot",
      content: req.body.content,
      timestamp: formattedTime, // Use the dynamically generated time here
    });
    console.log(chatMessages.length);
    return res.send({
      message: "oka oka",
    });
  });

app.get("/getfiles", (req, res, next) => {
  const jsFolder = "./chatwidget/build/static/js";
  const cssFolder = "./chatwidget/build/static/css";

  jsFiles = [];
  cssFiles = [];

  fs.readdirSync(jsFolder).forEach((eachFile) => {
    jsFiles.push(eachFile);
  });

  fs.readdirSync(cssFolder).forEach((eachFile) => {
    cssFiles.push(eachFile);
  });

  res.send({
    jsFiles,
    cssFiles,
  });
});

console.log(process.env.PORT);
const PORT = process.env.PORT || 8890;
serverInstance.listen(
  PORT,
  console.log(`server started on port ${PORT}`.yellow.bold)
);
// app.listen(PORT, () => {
//   console.log("server is running on: ", PORT);
// });
