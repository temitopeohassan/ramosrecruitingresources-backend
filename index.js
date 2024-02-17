





const express = require('express');
const cors = require('cors'); // Import cors package
const jwt = require('jsonwebtoken'); // Import jsonwebtoken package


const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

require('dotenv').config();
const queries = require('./queries');

app.get('/', (req, res) => {
  res.send('<h1>Ramos Recruiting Resources Backend</h1>')
})

app.post('/api/admin/login', async (req, res) => {
  console.log('Call made to /api/admin/login'); // Adding console log
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Authenticate user (you need to implement this logic)
    const authenticated = await queries.authenticateAdmin(email, password);

    if (!authenticated) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If authentication is successful, generate a token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token to the client
    res.json({ token });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route for fetching admin data (example)
app.get('/api/admin', async (req, res) => {
  // You can add authentication middleware here to verify token
  // For demonstration, let's just return some dummy data
  const admin = { username: 'admin', role: 'admin' };
  res.json(admin);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
