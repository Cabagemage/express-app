const { Router } = require("express");
const router = Router();
const Cart = require("../models/cart");
const Burger = require("../models/burger");

router.post("/add", async (req, res) => {
  const burger = await Burger.getById(req.body.id);
  await Cart.add(burger);
  res.redirect('/cart')
});

router.get('/', async (req, res) => {
  const cart = await Cart.fetch()
  res.render('cart', {
    title: 'Корзина',
    isCart: true,
    burgers: cart.burgers,
    price: cart.price
  })
})
module.exports = router;
