import { Schema, model, Document } from "mongoose";

interface IMember extends Document {
	id: number;
	name: string;
	surname: string;
	phoneNumber: string;
	birthday: Date;
	registrationDate: Date;
	lastActivity: Date;
	age: number;
	gender: "male" | "female";
	email: string;
	dealStage: "deal" | "no deal";
	trainerOwner: string;
}

const MemberSchema: Schema<IMember> = new Schema({
	id: { type: Number },
	name: { type: String },
	surname: { type: String },
	phoneNumber: { type: String },
	birthday: { type: Date },
	registrationDate: { type: Date },
	lastActivity: { type: Date },
	age: { type: Number },
	gender: { type: String, enum: ["male", "female"] },
	email: { type: String },
	dealStage: { type: String, enum: ["deal", "no deal"] },
	trainerOwner: { type: String },
});

const Member = model<IMember>("Member", MemberSchema);

export default Member;
