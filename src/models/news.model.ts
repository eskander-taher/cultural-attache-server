import mongoose, { Document, Schema } from "mongoose";

export interface INews extends Document {
	id?: string;
	title: string;
	description: string;
	thumbnail?: string;
	images?: string[];
}

const NewsSchema: Schema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	thumbnail: { type: String },
	images: { type: [String] },
});

export default mongoose.model<INews>("News", NewsSchema);
