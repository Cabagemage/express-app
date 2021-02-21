const { Router } = require("express");
const router = Router();
const User = require("../models/user");
router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Войти",
    isLogin: true,
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findById("6030f0776ac4676880c9d117");
    req.session.user = user;
    req.user = user;
    req.session.isAuthenticated = true,
    req.session.save((err) => {
      if (err) {
        throw err;
      }
      res.redirect("/");
    })
      next();
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
