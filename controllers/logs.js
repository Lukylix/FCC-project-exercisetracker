const User = require("../models/User").model;
const Exercise = require("../models/Exercise").model;

exports.getUserLogs = (req, res, next) => {
  User.findById(req.params._id)
    .select("-__v -id")
    .then((user) => {
      user = user.toObject({ getters: true });
      delete user.id;
      let query = { user_id: req.params._id };
      if (req.query.from && req.query.to) query.date = { $gte: new Date(req.query.from), $lt: new Date(req.query.to) };
      Exercise.find(query)
        .select("-user_id -__v -_id")
        .limit(parseInt(req.query.limit))
        .then((exercises) => {
          //Document to object
          exercises = JSON.parse(JSON.stringify(exercises));
          //Readable date
          for (let x = 0; x < exercises.length; x++) exercises[x].date = new Date(exercises[x].date).toDateString();
          user.log = exercises;
          user.count = exercises.length;
          res.json(user);
        });
    })
    .catch((err) => next(err));
};
