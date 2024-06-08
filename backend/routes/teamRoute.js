const express = require('express');
const { isAuthentication, isAdmin } = require('../util/authMiddleware');
const {
    createTeam,
    getAllTeam,
    updateTeam,
    deleteTeam,
    getTeamById,
    addMembersToTeam
} = require('../controller/teamController');

const teamRouter = express.Router();

teamRouter.get("/get-all-teams", isAuthentication, getAllTeam);
teamRouter.get("/get-team/:id", isAuthentication, getTeamById);
teamRouter.post("/add-team", isAuthentication, isAdmin, createTeam);
teamRouter.patch("/edit-team/:id", isAuthentication, isAdmin, updateTeam);
teamRouter.patch("/update-team/add-member", isAuthentication, isAdmin, addMembersToTeam);
teamRouter.delete("/delete-team/:id", isAuthentication, isAdmin, deleteTeam);

module.exports = teamRouter;
