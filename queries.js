







// import mysql package
const mysql = require('mysql2/promise');

// mysql database connection
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// fetch the information for Admin
async function getAdmin() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM adminlogin");
    return rows;
  } finally {
    connection.release();
  }
}

// Function to authenticate admin
async function authenticateAdmin(email, password) {
  const connection = await pool.getConnection();
  try {
    // Perform authentication logic here
    // Example: Check if email and password match in the database
    const [rows] = await connection.query("SELECT * FROM adminlogin WHERE email = ? AND password = ?", [email, password]);
    return rows.length > 0; // Return true if there's a match, false otherwise
  } finally {
    connection.release();
  }
}

// Export functions
module.exports = {
  getAdmin,
  authenticateAdmin,
};
