import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import stripe from 'stripe';

dotenv.config({ path: "./.env" });

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

export const test = (req, res) => {
  res.json("Test is working");
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username.trim() === "" || email.trim() === "" || password.trim() === "") {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password should be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email is already taken",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      amount: 0,
    });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, username: user.username, amount: user.amount },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true }).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const user = await User.findById(decodedToken.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        amount: user.amount
      });
    } catch (dbError) {
      console.error(dbError);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};

export const postPayment = async (req, res) => {
  try {
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/failure",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAdmin = async (req, res) => {
  const data = await User.find({},{password: 0});
  res.status(200).json(data)
}

export const putAdmin = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  console.log(amount)

  try {
    const user = await User.findByIdAndUpdate(id, { amount }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
}

export const logoutUser = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) }).json({ message: "Logged out successfully" });
};

export const checkAuth = (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.json({ isAuthenticated: false });
    }
    return res.json({ isAuthenticated: true });
  });
};

