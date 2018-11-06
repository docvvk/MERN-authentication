const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName:{type:String,required:true},
  repoURL: { type: String, required: true },
  appURL: { type: String, required: true },
  imageURL:{type:String},
  destription: { type: String},
  keywords:{type:Array},
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }]
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
