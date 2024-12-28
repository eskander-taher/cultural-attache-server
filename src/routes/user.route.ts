import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/user.model';

const router = express.Router();

// Create Admin Route
router.post('/admin/create', async (req: Request, res: any) => {
  const { email, password } = req.body;

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(400).send({ error: 'Admin already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the admin
  const admin = new Admin({ email, password: hashedPassword });
  await admin.save();

  res.status(201).send({ message: 'Admin created successfully' });
});

// Admin Login Route
router.post('/admin/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find the admin by email
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }

  // Check the password
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }

  // Generate a JWT
  const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.send({ token });
});

export { router as adminRouter };
