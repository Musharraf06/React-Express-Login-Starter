const bcrypt = require("bcryptjs");
const User = require("../model/userModel");

const signupController = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;

    // Validation checks
    if (!username || !email || !password || !confirm_password) {
      return res.json({
        errors: "Enter credentials",
      });
    }
    if (password !== confirm_password) {
      return res.json({
        errors: "Passwords don't match",
      });
    }
    if (password.length < 6 && confirm_password.length < 6) {
      return res.json({
        errors: "Password too short. Enter atleast 6 charecters",
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.json({
        errors: "User account already exist. Try logging in",
      });
    }

    // Hashing password
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Saving user details to database
    User.create(
      {
        username: username,
        email: email,
        password: hashedPassword,
      },
      (err, result) => {
        if (err) {
          return res.json({
            errors: "Error creating account. Please Try again",
          });
        } else {
          return res.json({
            success: "Successfully signed in!",
          });
        }
      }
    );
  } catch {
    console.log("error signing up");
  }
};

module.exports = signupController;
