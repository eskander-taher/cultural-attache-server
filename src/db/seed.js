const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Member = require("../models/memebers.model");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URL;

const seedMembers = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing members
		await Member.deleteMany({});
		console.log("Existing members removed");

		// Create 100 fake members
		const members = [];
		for (let i = 1; i <= 10; i++) {
			const member = new Member({
				id: i,
				name: faker.person.firstName(),
				surname: faker.person.lastName(),
				phoneNumber: faker.phone.number(),
				birthday: faker.date.past(40, new Date(2004, 0, 1)),
				registrationDate: faker.date.recent(365),
				lastActivity: faker.date.recent(30),
				age: faker.number.int({ max: 60, min: 20 }),
				gender: faker.person.sex(),
				email: faker.internet.email(),
				dealStage: faker.number.int({ max: 5, min: 0 }) !== 1 ? "deal" : "no deal",
				trainerOwner: faker.person.firstName() + " " + faker.person.lastName(),
			});
			members.push(member);
		}

		// Insert members into the database
		await Member.insertMany(members);
		console.log("20 members have been added to the database");

		mongoose.connection.close();
	} catch (error) {
		console.error("Error seeding data:", error);
		mongoose.connection.close();
	}
};

seedMembers();
