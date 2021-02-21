const { Router } = require("express");
const router = Router();
const Burger = require("../models/burger");
const auth = require("../middlewares/auth");
function mapCartItems(cart) {
  return cart.items.map((i) => ({
    ...i.burgerId._doc,
    id: i.burgerId.id,
    count: i.count,
  }));
}
function computePrice(burgers) {
  return burgers.reduce((total, burger) => {
    return (total += burger.price * burger.count);
  }, 0);
}
router.post("/add", auth, async (req, res) => {
  const burger = await Burger.findById(req.body.id);
  await req.user.addToCart(burger);
  res.redirect("/cart");
});
router.delete("/remove/:id", auth, async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate("cart.items.burgerId").execPopulate();
  const burgers = mapCartItems(user.cart);
  const cart = { burgers, price: computePrice(burgers) };

  res.status(200).json(cart);
});
router.get("/", auth, async (req, res) => {
  const user = await req.user.populate("cart.items.burgerId").execPopulate();
  const burgers = mapCartItems(user.cart);
  res.render("cart", {
    title: "Корзина",
    isCart: true,
    burgers: burgers,
    price: computePrice(burgers),
  });
});
module.exports = router;
