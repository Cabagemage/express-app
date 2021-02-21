const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const session = require("express-session");
const app = express();
const varMiddlewares = require('./middlewares/variables')
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/add");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const burgerRoutes = require("./routes/burgers");
const Handlebars = require("handlebars");
const User = require("./models/user");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const path = require("path");
// const hbs = exphbs.create({
//   defaultLayout: "main",
//   extname: "hbs",
// });
// const password = "bIkjZOMtpP04FRSA";

app.engine(
  "hbs",
  exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "main",
    extname: "hbs",
  })
);
app.set("view engine", "handlebars");
app.set("view engine", "hbs");
app.set("views", "views");


app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "fish",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(varMiddlewares)
app.use("/", homeRoutes);
app.use("/add", aboutRoutes);
app.use("/orders", ordersRoutes);
app.use("/burgers", burgerRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
const { PORT = 9999 } = process.env;
// myFirstDatabase?retryWrites=true&w=majority
async function start() {
  try {
    const url =
      "mongodb+srv://cabagemage:bIkjZOMtpP04FRSA@cluster0.qkcme.mongodb.net/burgerCafe";
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    // const candidate = await User.findOne();
    // if (!candidate) {
    //   const user = new User({
    //     email: "amaka@mail.ru",
    //     name: "Abaka",
    //     cart: { items: [] },
    //   });
    //   await user.save();
    // }
    app.listen(PORT, () => {
      // Если всё работает, консоль покажет, какой порт приложение слушает
      console.log(`App listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
