import Story from "./base/story.js";
import mongoose from "mongoose";

const WattpadSchema = new mongoose.Schema({
	reads : { type : Number },
	votes : { type : Number }
}, { strict : "throw" });

const WattpadStory = Story.discriminator("Wattpad", WattpadSchema);

export default WattpadStory;