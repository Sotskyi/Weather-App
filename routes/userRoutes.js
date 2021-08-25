const { Router } = require("express");
const router = Router();

const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

router.post("/:userName", auth, async (req, res) => {
  try {
    const { userName } = req.body;

    const candidate = await User.findOne({ userName });

    candidate.userName = req.params.userName;

    candidate.save();

    res.status(201).json({ message: "username successfully updated " });
  } catch (e) {
    res.status(500).json({ message: "something wrong try again" });
  }
});
module.exports = router;
