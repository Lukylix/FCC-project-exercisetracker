const Exercise = require("../models/Exercise").model;

exports.createExercise = (req, res, next) => {
  req.body.date = req.body.date ? new Date(req.body.date) : new Date();
  req.body.user_id = req.params._id;
  const exercise = new Exercise(req.body);
  exercise
    .save()
    .then((exercise) => {
      exercise
        .populate("user_id")
        .execPopulate()
        .then((exercise) => {
          //Convert to object (allow modificatrion)
          exercise = exercise.toObject({ getters: true });
          //Readable date
          exercise.date = exercise.date.toDateString();
          exercise.username = exercise.user_id.username;
          exercise._id = exercise.user_id._id;
          //remove unwanted properties
          const { user_id, id, __v, ...response } = exercise;
          res.json(response);
        });
    })
    .catch((err) => next(err));
};
