const { Router } = require("express");
const router = Router();
const Burger = require("../models/burger");
const auth = require("../middlewares/auth");

router.get("/", auth, (req, res) => {
  res.render("add", {
    title: "О нас",
    aboutActive: true,
  });
});
router.post("/", auth, async (req, res) => {
  console.log(req.body);

  const burger = new Burger({
    title: req.body.title,
    about: req.body.about,
    price: req.body.price,
    image: req.body.image,
    userId: req.user,
  });
  try {
    await burger.save();
    res.redirect("/burgers");
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
