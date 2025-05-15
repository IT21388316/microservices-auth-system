const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// API Endpoint to Send Email
app.post("/send-email", async (req, res) => {
  const { email, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Registration Confirmation",
      text: message,
    });

    console.log(`✅ Email sent to ${email}`);
    res.status(200).send("Email sent successfully");
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    res.status(500).send("Failed to send email");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`notification service running on port ${process.env.PORT}`);
});
