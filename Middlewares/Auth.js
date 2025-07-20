import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) {
    return res.json({ message: "login first", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT);

    const id = decoded.user._id;

    let user = await User.findById(id);

    if (!user) return res.json({ message: "user not found", success: false });
    req.user = user._id;
    next();
  } catch (error) {
    console.log("5. JWT Error:", error.message);
    return res.json({ message: "Invalid token", success: false });
  }
};
