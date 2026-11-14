
import User from "../models/userModel.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 5 * 24 * 60 * 60 * 1000,
};

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role === "Author" ? "Author" : "Reader",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = user.getJWTToken();

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.error("Login Error:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Logout User
export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
};
