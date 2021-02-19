const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: "О нас",
    aboutActive: true,
  });
});

module.exports = router;
