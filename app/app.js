const express = require('express');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

// Membuat table users otomatis
const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
)
`;

db.query(createTableQuery, (err) => {
  if (err) {
    console.log('Failed create table:', err);
  } else {
    console.log('Users table ready');
  }
});

// GET semua user
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

// GET user by id
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(results[0]);
  });
});

// POST user baru
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  db.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: 'User created',
        id: results.insertId
      });
    }
  );
});

// PUT update user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  db.query(
    'UPDATE users SET name=?, email=? WHERE id=?',
    [name, email, id],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: 'User updated'
      });
    }
  );
});

// DELETE user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM users WHERE id=?',
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: 'User deleted'
      });
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});