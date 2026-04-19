const Food = require("../models/Food");
const User = require("../models/User");

const populateFood = (query) =>
  query
    .populate("donor", "name verified role")
    .populate("claimedBy", "name");

/* CREATE FOOD */
exports.createFood = async (req, res) => {
  try {
    const { title, description, location, pickupTime, phoneNumber } = req.body;

    if (!title || !location || !pickupTime || !phoneNumber) {
      return res.status(400).json({ msg: "Please fill all required food details" });
    }

    const createdFood = await Food.create({
      title,
      description,
      location,
      pickupTime,
      phoneNumber,
      image: req.file?.filename,
      donor: req.user
    });

    const food = await populateFood(Food.findById(createdFood._id));

    res.json(food);

  } catch (err) {
    res.status(500).json({ msg: "Unable to create food post" });
  }
};

/* GET ALL FOOD */
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

/* GET FOOD BY ID */
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

/* CLAIM FOOD */
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
      const alreadyClaimedByCurrentUser = existingFood.claimedBy.toString() === req.user;

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
