const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const usersPath = path.join(__dirname, 'users.json');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.js', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, 'index.js'));
});

app.get('/api/users', (req, res) => {
  res.status(200);
  console.log('file started to send');
  res.sendFile(path.join(__dirname, 'users.json'));
  console.log('file finished sending');
});

app.post('/api/post', (req, res) => {
  res.status(201);

  const {body} = req;

  fs.readFile(usersPath, 'utf-8', (err, data) => {
    const users = JSON.parse(data);
    users.push(body);
    fs.writeFile(usersPath, JSON.stringify(users, null, 2), err => {});
  });

  res.end();
});

app.delete('/api/delete', (req, res) => {
  fs.writeFile(usersPath, '[]', err => {
    if (err) throw new Error(err.message);
  });

  res.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
