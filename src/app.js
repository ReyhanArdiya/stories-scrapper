import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const port = process.env.PORT;
const app = express();

// Connect to MongoDB
const mongoDatabase = process.env.MONGODB_URL;
try {
	await mongoose.connect(mongoDatabase);
	console.log(`Connected to ${mongoDatabase}!🍃`);
} catch (err) {
	console.log(`Error! Can't connect to ${mongoDatabase}!🍂`, err);
}

// Express Setup Middlewares
app.use((req, res, next) => {
	console.log(
		"🌟 You got a new request! ( *≧◡≦)~💌 \\(￣▽￣* )ゞ 🌟",
		`⌚ ${new Date()
			.toLocaleString()} ⌚`
	);
	next();
});

// Routes

app.listen(port, () => console.log(`Listening on 🚢 ${port} (●'◡'●)`));