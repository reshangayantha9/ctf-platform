const Team = require("../model/teamModel");
const User = require("../model/userModel");

// Admin only can access
const createTeam = async (req, res) => {
  const newTeam = new Team(req.body);
  try {
    await newTeam.save();
    res.status(201).json({
      status: "Success",
      data: newTeam,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getAllTeam = async (req, res) => {
  try {
    const teams = await Team.find({}).populate('members');
    res.status(200).json({
      status: "Success",
      data: teams,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members');
    res.status(200).json({
      status: "Success",
      data: team,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Admin only can access
const updateTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTeam = await Team.findByIdAndUpdate(id, {
      $set: req.body,
    }, { new: true }).populate('members');
    res.status(200).json({
      status: "Success",
      data: updatedTeam,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Admin only can access
const deleteTeam = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
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

// Add members to a team
const addMembersToTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.body.teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    team.members.push(user);
    await team.save();
    res.status(200).json({
      status: "Success",
      message: "Members added to the team successfully",
      team,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createTeam,
  getAllTeam,
  getTeamById,
  updateTeam,
  deleteTeam,
  addMembersToTeam,
};
