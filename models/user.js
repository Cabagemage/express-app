
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: String,
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        burgerId: {
          type: Schema.Types.ObjectId,
          ref: "Burger",
          required: true,
        },
      },
    ],
  },
  image: {
    type: String,
  },
});

userSchema.methods.addToCart = function (burger) {
  const items = [...this.cart.items];
  const idx = items.findIndex((c) => {
    return c.burgerId.toString() === burger._id.toString();
  });

  if (idx >= 0) {
    items[idx].count = items[idx].count + 1;
  } else {
    items.push({
      burgerId: burger._id,
      count: 1,
    });
  }

  // const newCart = { items: clonedItems };

  // this.cart = newCart;

  this.cart = { items };

  return this.save();
};
userSchema.methods.clearCart = function () {
  this.cart = { items: []};

  return this.save();
};



userSchema.methods.removeFromCart = function (id) {
  let items = [...this.cart.items];
  const idx = items.findIndex((c) => c.burgerId.toString() === id.toString());

  if (items[idx].count === 1) {items = items.filter((c) => c.burgerId.toString() !== id.toString())}
    else {
    items[idx].count--;
  }
  this.cart = { items };
  return this.save();
};
module.exports = model("User", userSchema);
