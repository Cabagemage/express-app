const { Router } = require("express");
const Burger = require("../models/burger");
const router = Router();
const auth = require("../middlewares/auth");
router.get("/", async (req, res) => {
  const burgers = await Burger.find().populate("userId", "email name");
  console.log(burgers);
  res.render("burgers", {
    title: "Бургеры",
    burgersActive: true,
    burgers,
  });
});

router.get("/:id",  async (req, res) => {
  const burgerId = await Burger.findById(req.params.id);
  res.render("burger", {
    layout: "empty",
    title: `Бургер ${burgerId.title}`,
    burgerId,
  });
});

module.exports = router;
