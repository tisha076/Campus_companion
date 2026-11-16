
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ======================================
// STUDENT REGISTRATION
// ======================================
export const register = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      student_id,
      department
    } = req.body;

    // Validate required fields
    if (!full_name || !email || !password || !student_id || !department) {
      return res.status(400).json({
        message: "Please fill in all required fields."
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address."
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long."
      });
    }

    // Check existing email or student ID
    const [existingUser] = await db.execute(
      "SELECT user_id FROM users WHERE email = ? OR student_id = ?",
      [email, student_id]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "Email or Student ID already exists."
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert student into database
    const [result] = await db.execute(
      `INSERT INTO users
      (full_name, email, password, role, student_id, department)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        email,
        hashedPassword,
        "student",
        student_id,
        department
      ]
    );

    return res.status(201).json({
      message: "Student registered successfully!",
      user: {
        user_id: result.insertId,
        full_name,
        email,
        student_id,
        department,
        role: "student"
      }
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Server error during registration."
    });
  }
};


// ======================================
// STUDENT LOGIN
// ======================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    // Find user
    const [users] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const user = users[0];

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        student_id: user.student_id,
        department: user.department,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error during login."
    });
  }
};

