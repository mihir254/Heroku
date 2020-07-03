var express = require("express");
var router = express.Router();
var authenticate = require("../utils/authenticate");

const User = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  // console.log("in");
  res.send({
    success: true,
    mssg: "Hello",
  });
});

router.post("/login", authenticate.local, (req, res, next) => {
  User.findById(req.user._id)
    .populate("wishlist")
    .populate({ path: "cart", populate: { path: "product" } })
    .populate({ path: "orders", populate: { path: "contents.product" } })
    .then((user) => {
      res.send({
        success: true,
        token: authenticate.getToken({ _id: req.user._id }),
        user: user,
      });
    })
    .catch((err) => next(err));
});

router.post("/sign-up", (req, res, next) => {
  let newUser = new User({
    email: req.body.email,
    name: req.body.name,
    contact: req.body.contact,
    address: req.body.address,
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (!err) {
      res.json({
        user: user,
        success: true,
        token: authenticate.getToken({ _id: user._id }),
      });
    } else {
      res.json({ err: err });
    }
  });
});

module.exports = router;
