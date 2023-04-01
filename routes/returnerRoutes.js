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

router.get("/getreturnersbyaddress/:address", (req, res) => {
  const { address } = req.params;

  // Find all the data instances in the database with the given address
  Returner.find({ address })
    .then((returners) => {
      if (returners.length === 0) {
        return res
          .status(404)
          .json({ message: "No returners found with that address" });
      }

      // Return the data instances to the client
      res.json(returners);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});


router.delete("/deletereturner/:phoneNumber", (req, res) => {
  const { phoneNumber } = req.params;

  // Parse the phoneNumber parameter as an integer
  const parsedPhoneNumber = parseInt(phoneNumber);

  // Validate that the parsed phoneNumber is a valid number
  if (isNaN(parsedPhoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  // Find the data instance with the given phoneNumber and remove it from the database
  Returner.findOneAndRemove({ phoneNumber: parsedPhoneNumber })
    .then((deletedReturner) => {
      if (!deletedReturner) {
        return res.status(404).json({ message: "Returner not found" });
      }

      // Return a success message to the client
      res.json({ message: "Returner deleted successfully" });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});


router.get("/getreturner/:phoneNumber", (req, res) => {
  const { phoneNumber } = req.params;

  // Check if phoneNumber is a valid number
  if (isNaN(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phoneNumber" });
  }

  // Find the data instance with the given phoneNumber in the database
  Returner.findOne({ phoneNumber })
    .then((returner) => {
      if (!returner) {
        return res.status(404).json({ message: "Returner not found" });
      }
      res.json(returner);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});



module.exports = router;
