import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

//user registration

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All field are required" });
  }

  let existuser = await User.findOne({ email });
  if (existuser) {
    return res.status(400).json({ error: "user already exist" });
  }

  const saltRounds = 7;
  const hashedpassword = await bcrypt.hash(password, saltRounds);

  let user = await User.create({ name, email, password: hashedpassword });
  return res.json({
    message: "user registration successful",
    status: true,
    user,
  });
};

//user login

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ error: "all field are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .josn({ message: "user does not exist", Success: false });
  }

  const ismatch = await bcrypt.compare(password, user.password);

  if (!ismatch) {
    return res
      .status(400)
      .json({ error: "invalid credentials", Success: false });
  }

  const token = jwt.sign({ user }, process.env.JWT, {
    expiresIn: "2d",
  });

  res.json({ message: "welcome", token, Success: true });
};
