const express = require("express");
const router = express.Router();
const { Signup,Login,  getUserById,getAllUsers,getAllUserAdmin,getUserByName,createUser,updateUser,deleteUser} = require("../controller/authController");
const { isAuthentication, isAdmin } = require('../util/authMiddleware');
router.post("/signup", Signup);
router.post('/login', Login)
router.get('/get-all-users', getAllUsers)
router.get('/get-all-users-admin',isAuthentication,isAdmin, getAllUserAdmin);
router.post('/get-user-by-name', getUserByName)
router.post('/create-user',isAuthentication,isAdmin, createUser);
router.patch('/update-user/:_id',isAuthentication,isAdmin, updateUser);
router.post('/get-user-by-id',isAuthentication,isAdmin, getUserById);
router.delete('/delete-user/:id',isAuthentication,isAdmin, deleteUser);
router.get('/protected', isAuthentication, (req, res) => {
    res.json({ message: 'Protected route accessed' });
  });
  

  router.get('/admin', isAuthentication, isAdmin, (req, res) => {
    res.json({ message: 'Admin route accessed' });
  });


module.exports = router;
