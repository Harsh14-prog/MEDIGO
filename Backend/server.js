// ✅ Existing imports
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import http from "http";
import { Server } from "socket.io";

// ✅ Routers
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import { userRouter } from "./routes/userRoutes.js";

// ✅ Load env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ✅ Connect DB & cloud
connectDB();
connectCloudinary();

// ✅ HTTP server & Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// ✅ Attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Socket events
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User joined personal room: ${userId}`);
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined call room: ${roomId}`);
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
    console.log("🚫 User disconnected:", socket.id);
  });
});

// ✅ API routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API WORKING GOOD");
});

// ✅ Start server
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
