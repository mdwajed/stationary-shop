import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../userModel';

dotenv.config();
// Ensure the JWT_SECRET is present
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

// Register User
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists', status: true });
      return;
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // Generate JWT token 🔥
    const accessToken = jwt.sign(
      { userId: newUser._id, email: newUser.email, name: newUser.name },
      JWT_SECRET as string,
      { expiresIn: '7d' },
    );
    res.status(201).json({
      message: 'User registered successfully',
      status: true,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    //  Generate JWT token
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );

    res.status(200).json({
      message: 'Login successful',
      status: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
