const express = require("express");
const router = express.Router();
const passport = require("passport");

// Start Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Handle Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log("✅ Google Auth Success. User:", req.user); // ✅ log user info
    res.redirect("/"); // or redirect to '/dashboard' if needed
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log("❌ Error during logout:", err);
      return res.status(500).send("Logout failed");
    }

    console.log("👋 User logged out");
    res.redirect("/");
  });
});

module.exports = router;
