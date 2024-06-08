const User = require("../model/userModel");
const Team =require("../model/teamModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password, role: "admin",team:null });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, team } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const newUser = new User({ name, email, password, role, team });
    await newUser.save();

    if (team) {
      const teamDoc = await Team.findById(team);
      if (teamDoc) {
        teamDoc.members.push(newUser._id);
        await teamDoc.save(); 
      }
    }

    res.status(201).json({ message: "New user created successfully", success: true, newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
const updateUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const oldUser = await User.findById(_id);
    if (!oldUser) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }
    const oldTeamId = oldUser.team;
    const updatedUser = await User.findByIdAndUpdate(_id, {
      $set: req.body,
    }, { new: true });

    const newTeamId = updatedUser.team;
    if (oldTeamId && oldTeamId.toString() !== newTeamId.toString()) {
      await Team.findByIdAndUpdate(oldTeamId, {
        $pull: { members: _id }
      });
      if (newTeamId) {
        await Team.findByIdAndUpdate(newTeamId, {
          $addToSet: { members: _id }
        });
      }
    }
    res.status(200).json({
      status: "Success",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({
        message: "User logged in successfully",
        success: true,
        data: user,
        token: token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["member", "captain"] } }, "-password").populate("team", "name");
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users", error: error.message });
  }
};


const getAllUserAdmin = async (req, res) => {
  try {
    const users = await User.find({}, "-password").populate("team", "name");
    res.status(200).json
      ({
        success: true,
        data: users,
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: error.message });
  }
};

const getUserByName = async (req, res) => {
  try {
    const { name } = req.body; 
    console.log(name)
    const user = await User.findOne(
      { name: name},
      "-password"
    ).populate("team", "name");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or not a member" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve user", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { _id } = req.body; 
    const user = await User.findById(_id);
    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = { Signup, Login, getAllUsers, getAllUserAdmin, getUserByName,createUser,getUserById,updateUser,deleteUser  };
