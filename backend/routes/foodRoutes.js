const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../config/multer");

const {
  createFood,
  getFoods,
  getFoodById,
  claimFood
} = require("../controllers/foodController");

router.post("/", auth, upload.single("image"), createFood);
router.get("/", getFoods);
router.get("/:id", getFoodById);
router.post("/claim/:id", auth, claimFood);

module.exports = router;
