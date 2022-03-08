export class NoStoryError extends Error {
	constructor(message) {
		super(message);
		this.name = "NoStoryError";
		this.status = 404;
	}
}

export class BadRequestError extends Error {
	constructor(message) {
		super(message);
		this.name = "BadRequestError";
		this.status = 400;
	}
}