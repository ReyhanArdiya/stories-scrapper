import WattpadStory from "../../models/wattpad.js";
import wattpadScrapper from "../scrappers/wattpad.js";

const sendScrapedStories = async (req, res, next) => {
	let { tags } = req.query;

	if (!tags) {
		res.status(400).send("Please include a tags param in query string");
	} else {
		// tags param is expected to be a list seperated by commas
		tags = tags.split(",").map(tag => tag.trim());

		try {
			const scrapedStories = await wattpadScrapper.scrapeStories(
				req.page,
				...tags
			);
			res.json(scrapedStories);

			// Save the stories to DB for future use
			for (const story of scrapedStories) {
				const wattpadStory = new WattpadStory(story);
				wattpadStory.save().catch(err => console.error(err));
			}
		} catch (err) {
			next(err);
		}
	}
};

const wattpadHandler = { sendScrapedStories };

export default wattpadHandler;