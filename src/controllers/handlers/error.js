/* eslint-disable no-unused-vars */
export const handleNoEndpointFound = (req, res) => {
	res.status(404).json("Endpoint not found!");
};

export const handleAnyError = (err, req, res, next) => {
	const { status = 500 } = err;

	res.status(status).json(status !== 500 ? err : "Something went wrong!");
};

// CMT use this approach when you want each error type to be handled differently
// import { BadRequestError, NoStoryError } from "../../utils/error-classes.js";

/* This looks weird but my goal is so that if I ever change the `name` prop of
 an error class, I only need to change it in one place */
// const NoStoryErrorName = new NoStoryError("").name;
// const BadRequestErrorName = new BadRequestError("").name;


// const handleNoStoryError = (err, req, res, next) => {
// 	if (err.name !== NoStoryErrorName) {
// 		next(err);
// 	} else {
// 		res.status(err.status).json(err);
// 	}
// };

// const handleBadRequestError = (err, req, res, next) => {
// 	if (err.name !== BadRequestErrorName) {
// 		next(err);
// 	} else {
// 		res.status(err.status).json(err);
// 	}
// };