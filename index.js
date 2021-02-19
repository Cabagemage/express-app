const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/add");
const burgerRoutes = require("./routes/burgers");

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/add", aboutRoutes);
app.use("/burgers", burgerRoutes);
const { PORT = 9999 } = process.env;

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
