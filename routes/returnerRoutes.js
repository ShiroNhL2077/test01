const Returner = require("../models/Returner");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/newreturner", async (req, res) => {
  const { name, phoneNumber, address } = req.body;

  const newReturner = new Returner({
    name,
    phoneNumber,
    address,
  });

  try {
    await newReturner.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/getallreturners", async (req, res) => {
  try {
    const returners = await Returner.find({});
    res.json(returners);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/getreturnerbyaddress", async (req, res) => {
  const { address } = req.query;

  const filter = address
    ? { address: { $regex: new RegExp(address, "i") } }
    : {};

  try {
    const returners = await Returner.find(filter);
    res.json(returners);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/deletereturner/:phoneNumber", (req, res) => {
  const { phoneNumber } = req.params;

  // Validate that the phone number is a valid Object ID before proceeding
  if (!mongoose.Types.ObjectId.isValid(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  // Find the data instance with the given ID and remove it from the database
  Returner.findByIdAndRemove(phoneNumber, (err, deletedReturner) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (!deletedReturner) {
      return res.status(404).json({ message: "Returner not found" });
    }

    // Return a success message to the client
    res.json({ message: "Returner deleted successfully" });
  });
});


router.get("/getreturner/:phoneNumber", (req, res) => {
  const { phoneNumber } = req.params;

  // Check if phoneNumber is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phoneNumber" });
  }

  // Find the data instance with the given ID in the database
  Returner.findById(phoneNumber, (err, returner) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (!returner) {
      return res.status(404).json({ message: "Returner not found" });
    }

    // Return the data instance to the client
    res.json(returner);
  });
});


module.exports = router;
