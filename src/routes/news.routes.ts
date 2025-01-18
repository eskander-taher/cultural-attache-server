import express from "express";
import { createNews, getAllNews, getNewsById, updateNews, deleteNews } from "../controllers/news.controller";
import protect from "../middleware/tempAuth";

const router = express.Router();

router.get("/", getAllNews);
router.post("/", protect, createNews);
router.get("/:id", protect, getNewsById);
router.put("/:id", protect, updateNews);
router.delete("/:id", protect, deleteNews);

export default router;
