if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys.prod");
} else {
  module.exports = require("./keys.dev");
}

// module.exports = {
//   MONGODB_URI:
//     "mongodb+srv://cabagemage:bIkjZOMtpP04FRSA@cluster0.qkcme.mongodb.net/burgerCafe",
//   SESSION_SECRET: "fish",
//   BASE_URL: ""
// };
