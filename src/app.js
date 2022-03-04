import "dotenv/config";
import express from "express";

const port = process.env.PORT;
const app = express();


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