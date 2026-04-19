const router = require("express").Router();
const upload = require("../config/multer");
const { register, login } = require("../controllers/authController");

router.post("/register", upload.single("document"), register);
router.post("/login", login);

module.exports = router;
