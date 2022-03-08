import { NoStoryError } from "../../utils/error-classes.js";

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
	/*  eslint-disable no-undef */
	// URL encode the spaces
	const link = `https://archiveofourown.org/tags/${tags.join("%20")}`;
	await page.goto(link, { timeout : 60_000 });

	const isPageNotFound = await page.$eval("#main h2.heading", h => h.innerText.includes("404"));
	if (isPageNotFound) {
		throw new NoStoryError(
			"Stories page not found! Check your tags or make your tags more specific!",
			link
		);
	}

	// For a story item, ao3 has two possible selectors: either the id starts with bookmark or work
	const storySelectors = {
		bookmark : "li[id^=\"bookmark\"]",
		work     : "li[id^=\"work\"]"
	};

	// Determine which selector pattern the page uses or if there are no stories
	const storyType = await page.evaluate(
		(bookmarkPattern, workPattern) => {
			if (document.querySelector(bookmarkPattern)) {
				return "bookmark";
			} else if (document.querySelector(workPattern)) {
				return "work";
			}
		},
		storySelectors.bookmark,
		storySelectors.work
	);

	/* Sometimes the page doesn't contain any story and is not a no
	found page so we need to check that */
	if (!storyType) {
		throw new NoStoryError(
			"Stories page not found! Check your tags or make your tags more specific!",
			link
		);
	}

	const storyPattern = storySelectors[storyType];
	return await page.evaluate(
		storyPattern => {
			const storyItems = [];
			for (let i = 1; i <= 10; i++) {
				const story = document.querySelector(`${storyPattern}:nth-of-type(${i})`);
				if (story) {
					storyItems.push(story);
				} else {
					// There is a possibility that a page doesn't have 10 stories, so we break early
					break;
				}
			}

			// Get every storyItem's data
			return storyItems.map(storyItem => ({
				author    : storyItem?.querySelector("h4 a:last-of-type")?.innerText,
				bookmarks : +storyItem?.querySelector("dd.bookmarks")?.innerText,
				hits      : +storyItem?.querySelector("dd.hits")?.innerText,
				kudos     : +storyItem?.querySelector("dd.kudos")?.innerText,
				link      : storyItem?.querySelector("h4 a:first-of-type")?.href,
				title     : storyItem?.querySelector("h4 a:first-of-type")?.innerText
			}));
		},
		storyPattern
	);
	/*  eslint-enable no-undef */
};

const ao3Scrapper = { scrapeTags };

export default ao3Scrapper;
