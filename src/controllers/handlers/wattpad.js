import wattpadScrapper from "../scrappers/wattpad-scrapper.js";

const sendScrapedStories = async (req, res, next) => {
	let { tags = "top" } = req.query;

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
};

const wattpadHandler = { sendScrapedStories };

export default wattpadHandler;