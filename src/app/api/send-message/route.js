// src/app/api/send-message/route.js

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer transport setup (uses environment variables)
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your specific email service (e.g., 'hotmail', 'outlook')
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail App Password user
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

export async function POST(request) {
  try {
    // 1. Parse the incoming request body
    const { name, email, message } = await request.json();

    // 2. Construct the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO, // The address that receives the form submission
      subject: `Portfolio Contact Form - Message from ${name} (${email})`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    // Success response
    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Nodemailer Error:", error);

    // Error response
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
