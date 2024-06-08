const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const isAuthentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
 try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = isAuthentication;


// Middleware to check if user is an admin
const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);
   
    if (user && user.role === "admin") {
      next(); 
    } else {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
  
module.exports = { isAuthentication, isAdmin };
