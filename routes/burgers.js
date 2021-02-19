const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("burgers", {
    title: "Бургеры",
    burgersActive: true,
  });
});

module.exports = router;
