const express = require("express");
const { isAuthentication, isAdmin } = require("../util/authMiddleware");
const {
    getSettings,updateSettings} = require("../controller/settingController");

const settingRouter = express.Router();

settingRouter.get('/settings', getSettings);
settingRouter.put('/settings', isAuthentication, isAdmin,updateSettings);

module.exports = settingRouter;
