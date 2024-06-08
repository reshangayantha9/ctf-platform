const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const teamRouter = require('./routes/teamRoute');
const challengeRoute = require('./routes/challengeRoute');
const submissionRoute = require('./routes/submissionRoute');
const settingRouter = require('./routes/SettingRoute');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const DB = process.env.DB;

const corsOptions = {
  origin: `${process.env.CLIENT_URL}`,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const io = new Server(server, {
  cors: corsOptions,
});

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });

  socket.on('customEvent', (data) => {
      console.log('Custom event received:', data);
  });
});

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected..');
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api", authRoute);
app.use("/api", teamRouter);
app.use("/api", challengeRoute);
app.use("/api", submissionRoute);
app.use("/api", settingRouter);
app.get("/", (req, res) => res.send("Express on Vercel"));
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
