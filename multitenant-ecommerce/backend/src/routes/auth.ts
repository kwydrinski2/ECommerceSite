import express from "express";
import { Router } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    // 2. Compare password
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1️⃣ Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Username, email, and password are required",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "User already exists with that email",
      });
    }

    // 3️⃣ Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4️⃣ Insert new user
    const newUser = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [username, email, hashedPassword]
    );

    const newList = await pool.query(
      `INSERT INTO lists (user_id, title, description) VALUES ($1, 'MyList', 'My First List');`,
      [newUser.rows[0].id]
    );

    // 5️⃣ Create JWT token
    const token = jwt.sign(
      { userId: newUser.rows[0].id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // 6️⃣ Return user + token
    res.status(201).json({
      message: "User created successfully",
      token,
      user: newUser.rows[0],
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;