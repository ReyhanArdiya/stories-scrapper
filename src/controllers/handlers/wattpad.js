import wattpadScrapper from "../scrappers/wattpad.js";

const sendScrapedStories = async (req, res, next) => {
	let { tags } = req.query;

	if (!tags) {
		res.status(400).send("Please include a tags param in query string");
	} else {
		// tags param is expected to be a list seperated by commas
		tags = tags.split(",").map(tag => tag.trim());

		try {
			res.json(await wattpadScrapper.scrapeStories(
				req.page,
				...tags
			));
		} catch (err) {
			next(err);
		}
	}
};

const wattpadHandler = { sendScrapedStories };

export default wattpadHandler;