require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DEBUG (CHECK ENV LOADED)
console.log("EMAIL:", process.env.EMAIL);
console.log("PASS:", process.env.PASS ? "Loaded ✅" : "Not Loaded ❌");

// SIMPLE SPAM MEMORY
let lastMessageTime = {};

// EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

// VERIFY CONNECTION (IMPORTANT)
transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ Email config error:", error);
  } else {
    console.log("✅ Email server ready");
  }
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  // VALIDATION
  if (!name || !email || !message) {
    return res.status(400).send("All fields required");
  }

  // RATE LIMIT
  const now = Date.now();
  if (lastMessageTime[email] && now - lastMessageTime[email] < 2000) {
    return res.status(429).send("Too many requests. Try later.");
  }
  lastMessageTime[email] = now;

  try {
    // 📩 EMAIL TO YOU
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });

    // 📧 AUTO REPLY
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Thanks for contacting me 🚀",
      html: `
        <div style="font-family:sans-serif;padding:20px;">
          <h2>Hello ${name},</h2>
          <p>Thank you for reaching out through my portfolio.</p>
          <p>I will get back to you soon.</p>

          <hr/>

          <p><b>Your Message:</b></p>
          <p>${message}</p>

          <br/>
          <p>Best regards,</p>
          <p><b>Mirali Sheth</b></p>
        </div>
      `
    });

    console.log("✅ Emails sent successfully");
    res.send("Message sent successfully!");

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).send("Error sending email");
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});