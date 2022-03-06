import express from "express";
import wattpadHandler from "../controllers/handlers/wattpad.js";

const wattpadRouter = express.Router({ mergeParams : true });

wattpadRouter.get("/stories", wattpadHandler.sendScrapedStories);

export default wattpadRouter;