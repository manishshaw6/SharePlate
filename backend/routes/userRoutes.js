const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  getLeaderboard,
  getProfile
} = require("../controllers/userController");

router.get("/leaderboard", getLeaderboard);
router.get("/me", auth, getProfile);

module.exports = router;
