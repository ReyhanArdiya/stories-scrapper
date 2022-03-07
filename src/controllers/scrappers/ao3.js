/**
 * Ao3's story item data.
 *
 * @typedef {object} Ao3StoryData
 *
 * @property {number} bookmarks
 *
 * @property {number} hits
 *
 * @property {number} kudos
 *
 * @property {string} author
 *
 * @property {string} cover
 *
 * @property {string} link
 *
 * @property {string} title
 */

/**
 * Scrapes Ao3's `/tags` endpoint that allows you to search a list of
 * stories based on `tags`.
 *
 * @param {import("puppeteer").Page} page
 * A puppeteer page.
 *
 * @param {...string} tags
 * Strings where each string will be appended after `/tags` as tag
 * filters for stories.
 *
 * @returns {Promise<Ao3StoryData[]>}
 * A promise that resolves into an array of {@link Ao3StoryData}.
 *
 * @example
 * What the string array will turn out to be:
 * ```js
 * ["popular", "love"] => "/tags/popular%20love"
 * ```
 *
 * Example of searching `top` stories:
 * ```js
 * console.log(await scrapeTags(page, "top"));
 * ```
 */
const scrapeTags = async (page, ...tags) => {
	// URL encode the spaces
	tags = tags.join("%20");
	await page.goto(`https://archiveofourown.org/tags/${tags}`, { timeout : 60_000 });

	const isPageNotFound = await page.$eval("#main h2.heading", h => h.innerText.includes("404"));

	if (isPageNotFound) {
		// TODO the error here and the one in wattpad is similiar, could reuse it thru class me thinks
		const err = new Error("Stories page not found! Check your tags!");
		err.name = "StoriesPageNotFound";
		throw err;
	} else {
		return await page.evaluate(() => {
			// Only get 10 story items from DOM
			const storyItems = [];
			for (let i = 1; i <= 10; i++) {
				// eslint-disable-next-line no-undef
				storyItems.push(document.querySelector(`li[id^="work"]:nth-of-type(${i})`));
			}

			// Get every storyItem's data
			return storyItems.map(storyItem => ({
				author    : storyItem.querySelector("h4 a:last-of-type")?.innerText,
				// CMT some stories doesn't have a bookmark
				bookmarks : +storyItem.querySelector("dd.bookmarks")?.innerText,
				hits      : +storyItem.querySelector("dd.hits")?.innerText,
				kudos     : +storyItem.querySelector("dd.kudos")?.innerText,
				link      : storyItem.querySelector("h4 a:first-of-type")?.href,
				title     : storyItem.querySelector("h4 a:first-of-type")?.innerText
			}));
		});
	}
};

const ao3Scrapper = { scrapeTags };

export default ao3Scrapper;