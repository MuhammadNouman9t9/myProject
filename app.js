// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;
const secretKey = 'your_secret_key';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = { username: 'testuser', password: 'password' };

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/app.html'); 
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post('/submit-data', authenticateJWT, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  console.log(`Received data: Username: ${username}, Password: ${password}`);

  res.status(200).json({ message: 'Data submitted successfully' });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
