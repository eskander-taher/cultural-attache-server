import express from "express";
import { createNews, getAllNews, getNewsById, updateNews, deleteNews } from "../controllers/news.controller";
import protect from "../middleware/tempAuth";

const router = express.Router();

router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.post("/", protect, createNews);
router.put("/:id", protect, updateNews);
router.delete("/:id", protect, deleteNews);

export default router;
