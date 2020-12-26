const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      errors: "Enter credentials",
    });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({
      errors: "User does not exist",
    });
  }
  if (user) {
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.json({
        errors: "Wrong password. Try again",
      });
    }
    if (isMatch) {
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET
      );
      req.session.userId = user._id;
      req.session.username = user.username;
      console.log(req.session);
      return res.json({
        responce: {
          token: token,
          id: user.id,
        },
        success: "Successfully logged in",
      });
    }
  }
};

const logoutController = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("sid");
    res.redirect("/login");
  });
};

module.exports = { loginController, logoutController };
