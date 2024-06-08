const express = require("express");
const { isAuthentication, isAdmin } = require("../util/authMiddleware");
const {
    createSubmission,
    getAllSubmission,
    getSubmissionById
} = require("../controller/Submission");

const submissionRouter = express.Router();

submissionRouter.get("/get-all-submission", isAuthentication,getAllSubmission);
submissionRouter.get("/get-submission/:id", isAuthentication, isAdmin, getSubmissionById);
submissionRouter.post("/add-submission", isAuthentication, createSubmission);

module.exports = submissionRouter;
