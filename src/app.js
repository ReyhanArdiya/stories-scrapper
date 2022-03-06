import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import newPageRandomUA from "./utils/puppeteer-page-randomUA.js";
import puppeteer from "puppeteer";
import wattpadRouter from "./routers/wattpad.js";

const port = process.env.PORT;
const app = express();
const browser = await puppeteer.launch();

// Connect to MongoDB
const mongoDatabase = process.env.MONGODB_URL;
try {
	await mongoose.connect(mongoDatabase);
	console.log(`Connected to ${mongoDatabase}!🍃`);
} catch (err) {
	console.log(`Error! Can't connect to ${mongoDatabase}!🍂`, err);
}

// Express Setup Middlewares
// Logger
app.use((req, res, next) => {
	console.log(
		"🌟 You got a new request! ( *≧◡≦)~💌 \\(￣▽￣* )ゞ 🌟",
		`⌚ ${new Date()
			.toLocaleString()} ⌚`
	);
	next();
});

// Add req.page for scrappers
app.use(async (req, res, next) => {
	try {
		req.page = await newPageRandomUA(browser);
		next();
	} catch (err) {
		next(err);
	}
});

// Routes

app.listen(port, () => console.log(`Listening on 🚢 ${port} (●'◡'●)`));