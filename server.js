/* FILE: server.js */
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Email configuration for real business (replace with real credentials for production)
// For demo/pitch, we can log and simulate success without real email keys.
// However, we provide a real nodemailer transporter using ethereal.email (test account) or your own.
// For portfolio pitch, this endpoint works as a simulation but also ready for real SMTP.

// Configure email transporter (comment if you don't have SMTP yet - it will fallback to simulation)
// Uncomment and fill to enable real email sending.
/*
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});
*/

// POST endpoint for contact form - Real world ready
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    
    // For real deployment, you would send an email to the owner.
    // For now, we simulate a successful store + log to console (perfect for showcasing to business owner)
    console.log(`📬 New message from ${name} (${email}): ${message}`);
    
    // If you have configured transporter, uncomment below:
    /*
    try {
        await transporter.sendMail({
            from: `"The Daily Brew Website" <${process.env.EMAIL_USER}>`,
            to: 'owner@thedailybrew.com',
            subject: `New contact from ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
        });
        return res.json({ success: true, message: 'Email sent! We will reply within 24h.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error sending message. Please call us.' });
    }
    */
    
    // Simulated success (perfect for pitching to business owner – shows backend integration)
    res.json({ success: true, message: 'Thanks for reaching out! The Daily Brew will contact you soon.' });
});

// Serve the main HTML for any unmatched routes (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ The Daily Brew server live at http://localhost:${PORT}`);
    console.log(`💼 Ready to pitch to the local business owner!`);
});