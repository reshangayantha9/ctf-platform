import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import Navbar from "../src/components/Navbar/Navbar";
import Home from "../src/components/Home/Home";
import LineBar from "../src/components/LineBar";
import Users from "./components/Users/Users";
import Teams from "./components/Teams/Teams";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import Challenges from "./components/Challenges/Challenges";
import Login from "./auth/LoginSignup/Login";
import Signup from "./auth/LoginSignup/Signup";
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import toast, { Toaster } from "react-hot-toast";
import ProtectedRoute from "../src/components/ProtectedRoutes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./redux/Actions/authActions";
const socket=io.connect(process.env.REACT_APP_SOCKET_URL);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  const [isDashboard,setIsDashboard]=useState(false)
  useEffect(() => {
    socket.on('hintAdded', (data) => {
      const audio = new Audio('./assets/notification.wav');
      audio.play();
      toast.success(`New hint added to challenge ${data.challengeName}: ${data.hints.title}`);
    });
    return () => {
      socket.off('hintAdded');
    };
  }, []);
  return (
    <Router>
      {isDashboard ?<></>:<Navbar />}
      <LineBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/scoreboard" element={<Scoreboard socket={socket} />} />
        <Route path="/challenge" element={<ProtectedRoute element={Challenges} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard}setIsDashboard={setIsDashboard} />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
