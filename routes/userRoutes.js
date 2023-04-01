const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", (req, res) => {
  const { pageName, phoneNumber, password } = req.body;

  const newUser = new User({
    pageName,
    phoneNumber,
    password,
  });

  newUser
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});

module.exports = router;
