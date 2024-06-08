const Team = require("../model/teamModel");
const User = require("../model/userModel");
const Challenge = require("../model/challengeModel");
const Submission = require("../model/submission");

const createSubmission = async (req, res) => {
  try {
    const { teamId, userId, challengeId, flag } = req.body;

    const team = await Team.findById(teamId);
    const user = await User.findById(userId);
    const challenge = await Challenge.findById(challengeId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    if (!challenge.verifyFlag(flag)) {
      return res.status(400).json({ message: "Incorrect flag" });
    }

    const submission = new Submission({
      user,
      team,
      challenge,
    });

    await submission.save();
    user.solves.push(challenge._id);
    team.solves.push(challenge._id);
    user.score += challenge.value;
    await user.save();
    team.score += challenge.value;
    await team.save();
    res.status(201).json({
      status: "Success",
      data: submission,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getAllSubmission = async (req, res) => {
  try {
    const submissions = await Submission.find({})
      .populate('user', 'name') 
      .populate('team', 'name') 
      .populate('challenge', 'name');
    
    res.status(200).json({
      status: "Success",
      data: submissions,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: submission,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  createSubmission,
  getAllSubmission,
  getSubmissionById,
};
