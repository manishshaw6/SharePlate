const Food = require("../models/Food");
const User = require("../models/User");

/* POPULATE HELPER */
const populateFood = (query) =>
  query
    .populate("donor", "name verified role")
    .populate("claimedBy", "name");


/* =========================
   CREATE FOOD
========================= */
exports.createFood = async (req, res) => {
  try {
    const { title, description, location, pickupTime, phoneNumber } = req.body;

    if (!title || !location || !pickupTime || !phoneNumber) {
      return res.status(400).json({ msg: "Please fill all required food details" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "Image is required" });
    }

    const createdFood = await Food.create({
      title,
      description,
      location,
      pickupTime,
      phoneNumber,
      image: req.file.path, // ✅ Cloudinary URL
      donor: req.user
    });

    const food = await populateFood(Food.findById(createdFood._id));

    res.status(201).json(food);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Unable to create food post" });
  }
};


/* =========================
   GET ALL FOOD
========================= */
exports.getFoods = async (req, res) => {
  try {
    const foods = await populateFood(
      Food.find().sort({ createdAt: -1 })
    );

    res.json(foods);

  } catch (err) {
    res.status(500).json({ msg: "Unable to fetch food posts" });
  }
};


/* =========================
   GET FOOD BY ID
========================= */
exports.getFoodById = async (req, res) => {
  try {
    const food = await populateFood(Food.findById(req.params.id));

    if (!food) {
      return res.status(404).json({ msg: "Food post not found" });
    }

    res.json(food);

  } catch (err) {
    res.status(500).json({ msg: "Unable to fetch food details" });
  }
};


/* =========================
   CLAIM FOOD
========================= */
exports.claimFood = async (req, res) => {
  try {
    const existingFood = await Food.findById(req.params.id).select("donor claimedBy");

    if (!existingFood) {
      return res.status(404).json({ msg: "Food post not found" });
    }

    if (existingFood.donor.toString() === req.user) {
      return res.status(400).json({ msg: "You cannot claim your own post" });
    }

    if (existingFood.claimedBy) {
      const alreadyClaimedByCurrentUser =
        existingFood.claimedBy.toString() === req.user;

      return res.status(400).json({
        msg: alreadyClaimedByCurrentUser
          ? "You already claimed this food"
          : "This food has already been claimed"
      });
    }

    const food = await populateFood(
      Food.findOneAndUpdate(
        { _id: req.params.id, claimedBy: null },
        { $set: { claimedBy: req.user } },
        { new: true }
      )
    );

    if (!food) {
      return res.status(400).json({ msg: "This food has already been claimed" });
    }

    await User.findByIdAndUpdate(existingFood.donor, {
      $inc: { points: 10 }
    });

    res.json({
      msg: "Food claimed successfully",
      food
    });

  } catch (err) {
    res.status(500).json({ msg: "Unable to claim food" });
  }
};


/* =========================
   UPDATE FOOD
========================= */
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ msg: "Food not found" });
    }

    if (food.donor.toString() !== req.user) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    const updates = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      pickupTime: req.body.pickupTime,
      phoneNumber: req.body.phoneNumber,
    };

    if (req.file) {
      updates.image = req.file.path; // ✅ Cloudinary
    }

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json(updatedFood);

  } catch (err) {
    res.status(500).json({ msg: "Unable to update food" });
  }
};


/* =========================
   DELETE FOOD
========================= */
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ msg: "Food not found" });
    }

    if (food.donor.toString() !== req.user) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await food.deleteOne();

    res.json({ msg: "Food deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Unable to delete food" });
  }
};