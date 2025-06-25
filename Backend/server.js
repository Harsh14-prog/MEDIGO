
// ✅ FIX: Load .env correctly for ESM setup
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") }); // ✅ load .env before anything else


// ✅ Existing Imports
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// ✅ Your Routers
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import { userRouter } from "./routes/userRoutes.js";

// ✅ New Imports for Socket.IO
import http from "http";
import { Server } from "socket.io";


// ✅ Express Setup
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ✅ Connect DB & Cloud
connectDB();
connectCloudinary();

// ✅ Wrap in HTTP server to allow Socket.IO
const server = http.createServer(app);

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend during dev
    methods: ["GET", "POST"]
  }
});

// ✅ Socket.IO events
io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("send-offer", (data) => {
    socket.to(data.roomId).emit("receive-offer", data.offer);
  });

  socket.on("send-answer", (data) => {
    socket.to(data.roomId).emit("receive-answer", data.answer);
  });

  socket.on("send-ice-candidate", (data) => {
    socket.to(data.roomId).emit("receive-ice-candidate", data.candidate);
  });

  socket.on("disconnect", () => {
    console.log("🚫 A user disconnected:", socket.id);
  });
});

// ✅ Your Existing API Routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// ✅ Root Endpoint
app.get("/", (req, res) => {
  res.send("API WORKING GOOD");
});

// ✅ Start Server with Socket.IO
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
