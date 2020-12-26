const jwt = require("jsonwebtoken");

const verifyJWT = (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, (err, token) => {
    if (err) {
      return res.json({
        errors: "Token generation failed",
      });
    } else {
      return res.json({
        success: "Successfully signed",
        data: token,
      });
    }
  });
};

module.exports = verifyJWT;
