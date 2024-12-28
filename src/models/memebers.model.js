const mongoose = require("mongoose");
const { forEachChild } = require("typescript");

const memberSchema = new mongoose.Schema({
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

// Pre-save hook to hash the password
memberSchema.pre("save", async function (next) {
	if (this.isModified("registrationDate")) {
		this.registrationDate = formatDate(this.registrationDate);
	}
	if (this.isModified("lastActivity")) {
		this.lastActivity = formatDate(this.lastActivity);
	}

	next();
});

function formatDate(dateString) {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
}

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
