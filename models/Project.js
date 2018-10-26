var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  // `title` must be of type String
  repoURL: {
    type: String,
    required: true,
    unique: true
  },
  appURL: {
    type: String,
    required: true,
    unique: true
  },
  projectName: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  description: {
    type: String,
    required: true
  },
  keywords: [
    {
      type: String,
      required: true
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
var Project = mongoose.model("Project", ProjectSchema);

// Export the Project model
module.exports = Project;
