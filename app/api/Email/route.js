// pages/api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Create a transporter using Gmail SMTP
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: "edwinngugi38@gmail.com",
        pass: "your-app-password-here", // Replace with the app password you generated
      },
    });

    try {
      // Send email
      await transporter.sendMail({
        from: '"Your Website" <edwinngugi38@gmail.com>',
        to: "edwinngugi38@gmail.com", // You can change this if you want to send to a different email
        subject: `New message from ${name}`,
        text: `From: ${name} (${email})\n\nMessage: ${message}`,
      });

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}