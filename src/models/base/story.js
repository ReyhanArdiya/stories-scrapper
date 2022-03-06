import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
	author : {
		required : true,
		type     : String
	},
	link : {
		required : true,
		type     : String
	},
	published : {
		required : true,
		type     : Date
	},
	source : {
		enum      : [ "wattpad", "ao3" ],
		lowercase : true,
		type      : String
	},
	title : {
		required : true,
		type     : String
	}
}, { strict : "throw" });

// Prevent saving the same story from the same source
StorySchema.index({
	source : 1,
	title  : 1
}, { unique : true });

// This will be used as a discriminator for other story models to extend from
const Story = mongoose.model("Story", StorySchema);

export default Story;