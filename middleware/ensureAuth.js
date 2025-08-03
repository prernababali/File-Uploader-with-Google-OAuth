module.exports = function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  // Friendly message instead of "Cannot GET /login"
  return res
    .status(401)
    .send(`<h2 style="font-family:sans-serif;color:crimson;">🔒 You must <a href="/auth/google">log in with Google</a> to access this page.</h2>`);
};
