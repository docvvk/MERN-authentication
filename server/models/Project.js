const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
	name:{ type:String,required:true },
	repoUrl: { type: String, required: true },
	appUrl: { type: String, required: true },
	imageUrl:{type:String},
	description: { type: String},
	keywords:{ type: Array },
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
