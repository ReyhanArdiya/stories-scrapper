import Story from "./base/story.js";
import mongoose from "mongoose";

const Ao3Schema = new mongoose.Schema({
	bookmarks : { type : Number },
	hits      : { type : Number },
	kudos     : { type : Number },
}, { strict : "throw" });

const Ao3Story = Story.discriminator("Ao3", Ao3Schema);

export default Ao3Story;