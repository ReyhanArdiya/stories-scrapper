import Story from "./base/story.js";
import mongoose from "mongoose";

const WattpadSchema = new mongoose.Schema({
	cover  : String,
	reads  : { type : Number },
	source : {
		default : "wattpad",
		type    : String
	},
	votes : { type : Number },
}, { strict : "throw" });

const WattpadStory = Story.discriminator("Wattpad", WattpadSchema);

export default WattpadStory;