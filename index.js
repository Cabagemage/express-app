const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const app = express();
const csrf = require("csurf");
const flash = require("connect-flash");
const helmet = require("helmet");
const compression = require("compression");
const varMiddlewares = require("./middlewares/variables");
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/add");

const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const profileRoutes = require("./routes/profile");
const authRoutes = require("./routes/auth");
const burgerRoutes = require("./routes/burgers");
const Handlebars = require("handlebars");
const userMiddleware = require("./middlewares/user");
const keys = require("./keys/keys");
const errorHandler = require("./middlewares/error");
const fileHandler = require("./middlewares/file");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const path = require("path");
// const hbs = exphbs.create({
//   defaultLayout: "main",
//   extname: "hbs",
// });
// const password = "bIkjZOMtpP04FRSA";

const store = new MongoStore({
  collection: "sessions",
  uri: keys.MONGODB_URI,
});
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
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(fileHandler.single("avatar"));
app.use(csrf());
app.use(helmet());
app.use(compression());
app.use(flash());
app.use(varMiddlewares);
app.use(userMiddleware);
app.use("/", homeRoutes);
app.use("/add", aboutRoutes);
app.use("/orders", ordersRoutes);
app.use("/burgers", burgerRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/profile", profileRoutes);

app.use(errorHandler);
const { PORT = 9999 } = process.env;
// myFirstDatabase?retryWrites=true&w=majority
async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
    });

    app.listen(PORT, () => {
      // Если всё работает, консоль покажет, какой порт приложение слушает
      console.log(`App listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
