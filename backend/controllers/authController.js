const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  verified: user.verified,
  verificationDocument: user.verificationDocument,
  points: user.points,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

/* REGISTER */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      verified: Boolean(req.file),
      verificationDocument: req.file?.filename || null
    });

    res.status(201).json({
      msg: "User registered",
      user: sanitizeUser(user)
    });

  } catch (err) {
    res.status(500).json({ msg: "Registration failed" });
  }
};

/* LOGIN */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token, user: sanitizeUser(user) });

  } catch (err) {
    res.status(500).json({ msg: "Login failed" });
  }
};
