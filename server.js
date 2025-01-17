const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASSWORD);
console.log(users);


// Configure Nodemailer with environment variables
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Get email from environment variable
    pass: process.env.EMAIL_PASSWORD,
  },
    tls: {
      rejectUnauthorized: false, // Get password from environment variable
  },
  port: 587
});

// Generate reset token
const generateResetToken = (email) => {
  const payload = { email };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }); 
};

// API to send reset link email
app.post("/send-reset-email", (req, res) => {
  const { email } = req.body;
  
  const resetToken = generateResetToken(email);
  const resetLink = `http://localhost:5000/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `Click this link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Failed to send email");
    }
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully");
  });
});

// Signup API with password hashing
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  console.log("New User:", req.body);

  if (users.find((user) => user.email === email)) {
    console.log("User already exists.");
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12); // 12 is the number of salt rounds
  users.push({ email, password: hashedPassword });
  res.status(201).send("User created successfully");
});

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send("Invalid credentials");
  }

  res.status(200).send("Login successful");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
