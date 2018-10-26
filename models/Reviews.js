var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ReviewsSchema object
// This is similar to a Sequelize model
var ReviewsSchema = new Schema({
  // `name` must be unique and of type String
  rating: {
    type: Number,
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comment: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Review = mongoose.model("Reviews", ReviewsSchema);

// Export the Review model
module.exports = Review;
