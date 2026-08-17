const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool targeting XAMPP
const database = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  multipleStatements: true
});

// GET: Fetch all trees for search & encyclopedia
app.get('/api/trees', async (req, res) => {
  try {
    const [rows] = await database.query('SELECT * FROM encyclopedia_db.trees');
    res.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Failed to fetch tree encyclopedia data' });
  }
});

// POST: Volunteer Registration
app.post('/api/register', async (req, res) => {
  const { fullName, email, phone } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ message: 'Full name and email are required.' });
  }

  try {
    await database.query(
      'INSERT INTO member_db.members (full_name, email, phone) VALUES (?, ?, ?)',
      [fullName, email, phone || null]
    );
    res.status(201).json({ message: 'Registered successfully as a volunteer!' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'This email is already registered.' });
    }
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Database query error.' });
  }
});

app.listen(5000, () => {
  console.log('Backend server active at http://localhost:5000');
});