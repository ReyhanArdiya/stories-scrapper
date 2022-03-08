import ao3Handler from "../controllers/handlers/ao3.js";
import express from "express";

const ao3Router = express.Router({ mergeParams : true });

// This endpoint expects the user to send "tags=a,b,c" query string
ao3Router.get("/tags", ao3Handler.sendScrapedTags);

export default ao3Router;