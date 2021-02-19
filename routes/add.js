const { Router } = require("express");
const router = Router();
const Burger = require("../models/burger");
router.get("/", (req, res) => {
  res.render("add", {
    title: "О нас",
    aboutActive: true,
  });
});
router.post("/", async (req, res) => {
  console.log(req.body);
  const burger = new Burger(
    req.body.title,
    req.body.about,
    req.body.price,
    req.body.image
  );
  await burger.save();
  res.redirect("/burgers");
});
module.exports = router;
