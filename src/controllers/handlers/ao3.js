import Ao3Story from "../../models/ao3.js";
import { BadRequestError } from "../../utils/error-classes.js";
import ao3Scrapper from "../scrappers/ao3.js";

const sendScrapedTags = async (req, res, next) => {
	let { tags } = req.query;

	try {
		if (!tags) {
			throw new BadRequestError("Please include a tags param in query string");
		} else {
			// tags param is expected to be a list seperated by commas
			tags = tags.split(",").map(tag => tag.trim());

			const scrapedStories = await ao3Scrapper.scrapeTags(
				req.page,
				...tags
			);
			res.json(scrapedStories);

			// Save the stories to DB for future use
			for (const story of scrapedStories) {
				const ao3Story = new Ao3Story(story);
				ao3Story.save().catch(() => null);
			}
		}
	} catch (err) {
		next(err);
	}
	req.page.close();
};

const ao3Handler = { sendScrapedTags };

export default ao3Handler;