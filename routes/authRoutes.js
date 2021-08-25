const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

router.post(
  "/register",
  [
    check("userName", "The field cannot be empty").exists(),
    check("password", "minimum password length is 2 characters").isLength({
      min: 2,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Inaccurate registration information",
        });
      }

      const { userName, password } = req.body;

      const candidate = await User.findOne({ userName });

      if (candidate) {
        return res.status(400).json({ message: "userName already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ userName, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "user created successfully" });
    } catch (e) {
      res.status(500).json({ message: "something wrong try again" });
    }
  }
);

router.post(
  "/login",
  [
    check("userName", "The field cannot be empty").exists(),
    check("password", "minimum password length is 4 characters").isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Inaccurate registration information",
        });
      }

      const { userName, password } = req.body;

      const user = await User.findOne({ userName });

      if (!user) {
        return res.status(400).json({ message: "No such user here" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Password incorrect" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id, userName: user.userName });
    } catch (e) {
      res.status(500).json({ message: "something wrong try again" });
    }
  }
);

module.exports = router;
