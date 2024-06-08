const Challenge = require("../model/challengeModel");
const Team = require("../model/teamModel");
const User = require("../model/userModel");

// Admin only can access
const createChallenge = async (req, res) => {
  const newChallenge = new Challenge(req.body);
  try {
    await newChallenge.save();
    res.status(201).json({
      status: "Success",
      data: newChallenge,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getAllChallenge = async (req, res) => {
  try {
    const challenges = await Challenge.find({});
    res.status(200).json({
      status: "Success",
      data: challenges,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: challenge,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Admin only can access
const updateChallenge = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedChallenge = await Challenge.findByIdAndUpdate(id, {
      $set: req.body,
    }, { new: true });
    res.status(200).json({
      status: "Success",
      data: updatedChallenge,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Admin only can access
const deleteChallenge = async (req, res) => {
  try {
    await Challenge.findByIdAndDelete(req.params.id);
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

const getAllChallengeWithoutFlag = async (req, res) => {
  try {
    const challenges = await Challenge.find({}).select("-flag");
    res.status(200).json({
      status: "Success",
      data: challenges,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getChallengeByIdWithoutFlag = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).select("-flag");
    res.status(200).json({
      status: "Success",
      data: challenge,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Admin only can access
const addHint = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedChallenge = await Challenge.findByIdAndUpdate(id, {
      $set: req.body,
    }, { new: true });
    req.io.emit('hintAdded', {
      challengeName: updatedChallenge.name,
      hints: req.body.hints,
    });
    res.status(200).json({
      status: "Success",
      data: updatedChallenge,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Function to handle hint usage by a user in a team
const useHint = async (req, res) => {
  const { challengeId,userId , hintIndex } = req.body;
  try {
    const user = await User.findById(userId).populate('team');
    const team = user.team;
    const challenge = await Challenge.findById(challengeId);

    if (!challenge || !user || !team) {
      return res.status(404).json({ message: "Challenge, User, or Team not found" });
    }

    await challenge.useHint(user, team, hintIndex);
    
    res.status(200).json({ message: "Hint used successfully", team, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createChallenge,
  getAllChallenge,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
  getAllChallengeWithoutFlag,
  getChallengeByIdWithoutFlag,
  addHint,
  useHint,
};
