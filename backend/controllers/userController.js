const Food = require("../models/Food");
const User = require("../models/User");

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ points: -1, name: 1 })
      .select("name points role verified");

    res.json(users);

  } catch (err) {
    res.status(500).json({ msg: "Unable to fetch leaderboard" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const [user, posts, claimedFoods] = await Promise.all([
      User.findById(req.user).select("name email role verified points"),
      Food.find({ donor: req.user })
        .sort({ createdAt: -1 })
        .populate("donor", "name verified role")
        .populate("claimedBy", "name"),
      Food.find({ claimedBy: req.user })
        .sort({ createdAt: -1 })
        .populate("donor", "name verified role")
        .populate("claimedBy", "name")
    ]);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      user,
      posts,
      claimedFoods
    });

  } catch (err) {
    res.status(500).json({ msg: "Unable to fetch profile data" });
  }
};
