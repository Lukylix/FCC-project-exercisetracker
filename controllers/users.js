const User = require("../models/User").model;

exports.createUser = (req, res, next) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => res.json({ _id: user._id, username: user.username }))
    .catch((err) => {
      if (err.hasOwnProperty("keyPattern")) {
        err.message = "Username already taken";
        err.status = 409;
      }
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => next(err));
};
