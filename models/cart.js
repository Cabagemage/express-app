const path = require("path");
const fs = require("fs");

const p = path.join(path.dirname(process.mainModule.filename),  "data", "cart.json");

class Cart {


  static async add(burger) {
    const cart = await Cart.fetch();

    const idx = cart.burgers.findIndex(c => c.id === burger.id);
    const candidate = cart.burgers[idx];

    if (candidate) {
      // burgers exists
      candidate.count++;
      burger.burgers[idx] = candidate;
    } else {
      // nujno dobavit
      burger.count = 1;
      cart.burgers.push(burger);
    }
    burger.price += +burger.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(burger), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Cart;
