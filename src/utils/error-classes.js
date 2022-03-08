export class NoStoryError extends Error {
	constructor(message, link) {
		super();
		this.message = message;
		this.name = "NoStoryError";
		this.status = 404;
		this.link = link;
	}
}

export class BadRequestError extends Error {
	constructor(message) {
		super();
		this.message = message;
		this.name = "BadRequestError";
		this.status = 400;
	}
}