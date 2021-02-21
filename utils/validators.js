const { body } = require("express-validator/check");
const User = require("../models/user");
exports.registerValidators = [
  body("email", "Введите корректный email")
    .isEmail()
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("Такой пользователь уже есть");
        }
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail(),
  body("password", "Пароль: минимум 6 символов")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Пароли должны совпадать");
      }
      return true;
    })
    .trim(),
  body("name", "Имя: минимум 3 символа").isLength({ min: 3 }).trim(),
];

exports.loginValidators = [
  body("email", "Введите корректный email").isEmail(),
  body("password", "Пароль: минимум 6 символов")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
];
