import randomUseragent from "random-useragent";

/**
 * Helps you make a new `puppeteer.Page` and randomize its user agent.
 *
 * @param {import("puppeteer").Browser} browser
 *
 * @param {boolean} randomizeAgent
 *
 * @returns {Promise<import("puppeteer").Page>}
 * A promise that resolves to `page`.
 *
 * @example
 * ```
 * const browser = await puppetter.launch();
 * const page = await newPageRandomUA(browser);
 * ```
 */
const newPageRandomUA = async (browser, randomizeAgent = true) => {
	const newPage = await browser.newPage();
	if (randomizeAgent) {
		const userAgent = randomUseragent.getRandom(val => val.browserName === "Chrome" && val.osName === "Windows");
		newPage.setUserAgent(userAgent);
	}

	return newPage;
};

export default newPageRandomUA;