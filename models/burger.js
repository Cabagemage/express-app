const {Schema, model} = require("mongoose");

const Burger = new Schema({
 title: {
   type: String,
   required: true,
 },
 price: {
   type: Number,
   required: true,
 },
 about: {
   type: String,
   required: false,
 },
 image: {
   type: String
 },
 userId: {
   type: Schema.Types.ObjectId,
   ref: "User"
 }
})

Burger.method('toClient', function() {
  const burger = this.toObject()

  burger.id = burger._id
  delete burger._id
  return burger


})
module.exports = model('Burger', Burger);
