const { Router } = require("express");
const burger = require("../models/burger");
const router = Router();

router.get("/", async (req, res) => {
  const burgers = await burger.getAll();
  res.render("burgers", {
    title: "Бургеры",
    burgersActive: true,
    burgers,
  });
});

router.get('/:id', async (req, res) => {
  const burgerId = await burger.getById(req.params.id);
  res.render('burger', {
    layout: 'empty',
    title: `Бургер ${burgerId.title}`,
    burgerId
  })
})

module.exports = router;
