const { v4: uuidv4 } = require("uuid");
const burgers = require("../data/burgers.json")
const fs = require("fs");
const path = require("path");
class Burger {
  constructor(title, about, price, image) {
    this.title = title;
    this.about = about;
    this.price = price;
    this.image = image;
    this.id = uuidv4();
  }

  toJSON() {
    return {
      title: this.title,
      about: this.about,
      price: this.price,
      image: this.image,
      id: this.id,
    };
  }
  async save() {
    const burgers = await Burger.getAll();
    burgers.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "burgers.json"),
        JSON.stringify(burgers),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "burgers.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  static async getById(id) {
    await Burger.getAll()

    return burgers.find(c => c.id === id)
  }
}

module.exports = Burger;
