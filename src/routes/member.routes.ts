import express from "express";
const router = express.Router();

import {
	createMember,
	updateMember,
	getMembers,
	getMemberById,
	deleteMember,
} from "../controllers/member.controller";

router.post("/", createMember);
router.get("/:id", getMemberById);
router.get("/", getMembers);
router.put("/", updateMember);
router.get("/:id", deleteMember);

export default router;
