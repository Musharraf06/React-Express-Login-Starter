const router = require("express").Router();
const {
  loginController,
  logoutController,
} = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const verifyJWT = require("../controllers/verifyJWT");
const { loginAuth, loggedinAuth } = require("../middleware/auth");

router.post("/login", loggedinAuth, loginController);
router.post("/logout", logoutController);
router.post("/signup", loggedinAuth, signupController);
router.post("/verify", verifyJWT);

module.exports = router;
