const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const upload = require("../config/multer");

const {
  createFood,
  getFoods,
  getFoodById,
  claimFood,
  updateFood,
  deleteFood
} = require("../controllers/foodController");

router.post("/", auth, upload.single("image"), createFood);
router.get("/", getFoods);
router.get("/:id", getFoodById);
router.post("/claim/:id", auth, claimFood);
router.put("/:id", auth, upload.single("image"), updateFood);
router.delete("/:id", auth, deleteFood);

module.exports = router;