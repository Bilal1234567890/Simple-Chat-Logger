const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

let chatLog = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Render login page
app.get('/login', (req, res) => {
  res.render('login', { messageCount: chatLog.length });
});

// Handle login POST
app.post('/login', (req, res) => {
  const { username } = req.body;
  if (username && username.trim()) {
    res.cookie('username', username.trim(), { httpOnly: false });
    return res.redirect('/');
  }
  res.render('login', { messageCount: chatLog.length, error: 'Username required' });
});

// Render chat page (index)
app.get('/', (req, res) => {
  if (!req.cookies.username) {
    return res.redirect('/login');
  }
  res.render('index', { username: req.cookies.username, chatLog });
});

// Handle new message POST
app.post('/messages', (req, res) => {
  const { message } = req.body;
  const username = req.cookies.username || 'Anonymous';
  if (message && message.trim()) {
    const timestamp = new Date().toISOString();
    chatLog.push({ timestamp, message, username });
  }
  res.redirect('/');
});

// Handle logout POST
app.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/login');
});

// Fallback for 404
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
