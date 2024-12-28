import express, {Request, Response} from "express"
const app = express()
import User from "./models/user.model";
import jwt from "jsonwebtoken";
import cors from "cors"

import { connectDB } from "./db/db";
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "*",
	})
);

app.get("/", (_: Request, res: Response) => {
	res.send("Welcome to moulhaqia server");
});

app.post("/admin/login", async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const admin = await User.findOne({ email });
		if (!admin) {
			res.status(400).send({ error: "Invalid credentials" });
			return;
		}

		const isMatch = await admin.comparePassword(password);
		if (!isMatch) {
			res.status(400).send({ error: "Invalid credentials" });
			return;
		}

		const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET!, {
			expiresIn: "1h",
		});

		res.send({ token });
	} catch (error) {
		res.status(500).json(error);
	}
});

app.get("/users", async (_: Request, res: Response) => {
	const users = await User.find();
	res.status(500).json({ users });
});


export default app