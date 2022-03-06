import WattpadStory from "../models/wattpad.js";
import newPageRandomUA from "../utils/puppeteer-page-randomUA.js";
import puppeteer from "puppeteer";

// DBG
const browser = await puppeteer.launch({
	// devtools : true,
	// headless : false,
});
const page = await newPageRandomUA(browser);

/**
 * Scrapes wattpad's `/stories` endpoint that allows you to search a list of
 * stories based on `tags`.
 *
 * @param {import("puppeteer").Page} page
 * A puppeteer page.
 *
 * @param {...string} tags
 * Strings where each string will be appended after `/stories` as tag
 * filters for stories.
 *
 * @example
 * What the string array will turn out to be:
 * ```js
 * ["popular", "love"] => "/stories/popular%2Clove"
 * ```
 *
 * Example of searching `top` stories:
 * ```js
 * console.log(await scrapeStories(page, "top"));
 * ```
 */
const scrapeStories = async (page, ...tags) => {
	tags = tags.join("%2C");
	await page.goto(`https://www.wattpad.com/stories/${tags}`, { timeout : 60_000 });

	const isPageNotFound = await page.$eval("h1", h1 => h1.innerText.includes("missing"));

	if (isPageNotFound) {
		throw new Error("Page not found! Check your tags!");
	} else {
		return await page.evaluate(() => {
	    // Only get 10 story items from DOM
		// eslint-disable-next-line no-undef
			const storyItems = [ ...document.querySelectorAll(".browse-story-item") ].slice(0, 10);

			const storyData = [];
			for (const storyItem of storyItems) {
		    // Get the storyItem's data
				const cover = storyItem.querySelector(".item img")?.src;
				const link = storyItem.querySelector(".content > a.title")?.href;
				const title = storyItem.querySelector(".content > a.title")?.innerText;
				let author = storyItem.querySelector(".content > .username")?.innerText;
				let reads = storyItem.querySelector(".read-count")?.innerText;
				let votes = storyItem.querySelector(".vote-count")?.innerText;

				// Remove "by" from author string
				author = author.slice(3);

				// Turn reads and votes into numbers
				reads = reads.endsWith("K") ? parseInt(reads) + 1000 : parseInt(reads);
				votes = votes.endsWith("K") ? parseInt(votes) + 1000 : parseInt(votes);

				storyData.push({
					author,
					cover,
					link,
					reads,
					title,
					votes
				});
			}

			return storyData;
		});
	}
};

console.log(await scrapeStories(page, "top", "hahaha", "fiejfeiujui"));

const WattpadScrapper = { scrapeStories };

export default WattpadScrapper;