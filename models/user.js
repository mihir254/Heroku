const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  points: {
    type: Number,
    default: 0,
  },
  orders: [
    {
      type: Number,
      ref: "Order",
    },
  ],
  wishlist: [
    {
      type: String,
      ref: "Product",
    },
  ],
  cart: [
    {
      product: {
        type: String,
        ref: "Product",
      },
      size: String,
      color: String,
      quantity: Number,
      price:Number
    },
  ],
  cartTotal: Number,
});
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", userSchema);
module.exports = User;
