const express = require("express");
const serverless = require("serverless-http"); 
require("dotenv").config();
const path = require("path");
const sendEmail = require("./sendEmail");

const app = express();
const verifyOtp = [];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("email.ejs");
});

app.post("/sendEmail", async (req, res) => {
  const email = req.body.email;
  console.log("Email is ", email);
  const otp = Math.floor(100000 + Math.random() * 900000);
  verifyOtp.push(otp);
  const subject = "Email Verification OTP";
  const message = `Your OTP for email verification is ${otp}. Please do not share it with anyone.`;
  await sendEmail(email, subject, message);
  console.log("Email sent to the user and OTP is ", otp);
  res.render("Otp.ejs");
});

app.post("/verifyOtp", (req, res) => {
  const otp = req.body.otp;
  if (!otp) return res.send("Please provide OTP");
  if (otp != verifyOtp[verifyOtp.length - 1]) return res.send("Invalid OTP");
  res.send("Email verified successfully");
});

// ✅ Export for Vercel serverless
module.exports.handler = serverless(app);

// ✅ Optional: run locally if not on Vercel
if (!process.env.VERCEL) {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
}
