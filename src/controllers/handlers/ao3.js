import Ao3Story from "../../models/ao3.js";
import ao3Scrapper from "../scrappers/ao3.js";

const sendScrapedTags = async (req, res, next) => {
	let { tags } = req.query;

	if (!tags) {
		res.status(400).send("Please include a tags param in query string");
	} else {
		// tags param is expected to be a list seperated by commas
		tags = tags.split(",").map(tag => tag.trim());

		try {
			const scrapedStories = await ao3Scrapper.scrapeTags(
				req.page,
				...tags
			);
			res.json(scrapedStories);

			// Save the stories to DB for future use
			for (const story of scrapedStories) {
				const ao3Story = new Ao3Story(story);
				ao3Story.save().catch(err => console.error(err));
			}
		} catch (err) {
			next(err);
		}
		req.page.close();
	}
};

const ao3Handler = { sendScrapedTags };

export default ao3Handler;