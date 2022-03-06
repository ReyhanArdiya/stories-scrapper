import express from "express";
import wattpadHandler from "../controllers/handlers/wattpad.js";

const wattpadRouter = express.Router({ mergeParams : true });

// This endpoint expects the user to send "tags=a,b,c" query string
wattpadRouter.get("/stories", wattpadHandler.sendScrapedStories);

export default wattpadRouter;