const { Router } = require("express");
const router = Router();
const Order = require("../models/order");
const auth = require("../middlewares/auth");
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ "user.userId": req.user.id }).populate(
      "user.userId"
    );
    res.render("orders", {
      isOrder: true,
      title: "Заказы",
      orders: orders.map((o) => {
        return {
          ...o._doc,
          price: o.burgers.reduce((total, c) => {
            return (total += c.count * c.burger.price);
          }, 0),
        };
      }),
    });
  } catch (e) {}
});
router.post("/", auth, async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.burgerId").execPopulate();

    const burgers = user.cart.items.map((i) => ({
      count: i.count,
      burger: { ...i.burgerId._doc },
    }));

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      burgers: burgers,
    });

    await order.save();

    // await req.user.clearCart();

    res.redirect("/orders");
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
