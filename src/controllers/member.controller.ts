import { Request, Response } from "express";
import Member from "../models/memebers.model";

// Create a new member
export const createMember = async (req: Request, res: Response): Promise<void> => {
	try {
		const newMember = new Member(req.body);
		const savedMember = await newMember.save();
		res.status(201).json(savedMember);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

// Get all members
export const getMembers = async (req: Request, res: Response): Promise<void> => {
	try {
		const members = await Member.find();
		res.status(200).json(members);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

// Get a single member by ID
export const getMemberById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const member = await Member.findById(id);
		if (!member) {
			res.status(404).json({ message: "Member not found" });
		} else {
			res.status(200).json(member);
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

// Update a member by ID
export const updateMember = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const updatedMember = await Member.findByIdAndUpdate(id, req.body, { new: true });
		if (!updatedMember) {
			res.status(404).json({ message: "Member not found" });
		} else {
			res.status(200).json(updatedMember);
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

// Delete a member by ID
export const deleteMember = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const deletedMember = await Member.findByIdAndDelete(id);
		if (!deletedMember) {
			res.status(404).json({ message: "Member not found" });
		} else {
			res.status(200).json({ message: "Member deleted successfully" });
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
