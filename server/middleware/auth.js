function loginAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login");
  } else {
    next();
  }
}

function loggedinAuth(req, res, next) {
  if (req.session.userId) {
    return res.redirect("/");
  } else {
    next();
  }
}

module.exports = { loginAuth, loggedinAuth };
