const express = require("express");
const { isAuthentication, isAdmin } = require("../util/authMiddleware");
const {
    createChallenge,
    getAllChallenge,
    updateChallenge,
    deleteChallenge,
    getChallengeById,
    getAllChallengeWithoutFlag,
    getChallengeByIdWithoutFlag,
    addHint,
    useHint
} = require("../controller/challengeController");
const challengeRouter = express.Router();
challengeRouter.get("/get-all-challenge", isAuthentication, isAdmin, getAllChallenge);
challengeRouter.get("/get-challenge/:id", isAuthentication, getChallengeById);
challengeRouter.post("/add-challenge", isAuthentication, isAdmin, createChallenge);
challengeRouter.patch("/edit-challenge/:id", isAuthentication, isAdmin, updateChallenge);
challengeRouter.patch("/add-hint/:id", isAuthentication, isAdmin, addHint);
challengeRouter.delete("/delete-challenge/:id", isAuthentication, isAdmin, deleteChallenge);
challengeRouter.get("/get-all-user-challenge", isAuthentication, getAllChallengeWithoutFlag);
challengeRouter.get("/get-user-challenge/:id", isAuthentication, getChallengeByIdWithoutFlag);
challengeRouter.post("/use-hint", isAuthentication, useHint);
module.exports =challengeRouter;
