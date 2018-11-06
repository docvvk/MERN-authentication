const db = require("../models");

// Defining methods for the UsersController
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(db => res.json(db))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .populate("projects")
      .then(db => res.json(db))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log(`creating document for: \n ${JSON.stringify(req.body)}`)
    db.User
      .create(req.body)
      .then(function (req, data) { res.send(data) })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(db => res.json(db))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(db => db.remove())
      .then(db => res.json(db))
      .catch(err => res.status(422).json(err));
  }
};
