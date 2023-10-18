// Import required modules
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser'

// Create an Express application
const app = express();
const port = 3000; // Adjust the port number as needed

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'scitecs', // Replace with your database name
});

app.use(cors({
  origin: 'http://localhost:3001', // Replace with your React app's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

// Middleware to parse JSON requests
app.use(express.json());

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Perform user authentication by querying the signup_table
  const sql = 'SELECT * FROM signup_table WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error('Error during authentication:', error);
      res.status(500).json({ error: 'Authentication failed' });
    } else {
      if (results.length > 0) {
        // Authentication successful
        res.json({ message: 'Authentication successful' });
      } else {
        // Authentication failed
        res.status(401).json({ error: 'Authentication failed' });
      }
    }
  });
});

// Define a route to handle the POST request for saving data into 'report_table'
app.post('/api/saveData/report', (req, res) => {
  // Access the data sent in the request body
  const { firstName, lastName, middleName, cellphoneNo, telephoneNo, houseNo, street, complaintType, proofParagraph, proofImageVideo } = req.body;

  // Perform the data-saving logic here
  const sql = 'INSERT INTO report_table (first_name, last_name, middle_name, cellphone_no, telephone_no, house_no, street, complaint_type, proof_paragraph, proof_image_video) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [firstName, lastName, middleName, cellphoneNo, telephoneNo, houseNo, street, complaintType, proofParagraph, proofImageVideo];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error saving data to the report_table: ' + error.message);
      res.status(500).json({ error: 'Error saving data' });
      return;
    }

    console.log('Data saved to the report_table');
    res.json({ message: 'Data saved successfully' });
  });
});

// Define a route to handle the GET request for fetching data from 'report_table'
app.get('/api/reports', (req, res) => {
  const sql = 'SELECT first_name, last_name, middle_name, cellphone_no, telephone_no, house_no, street, complaint_type, proof_paragraph, proof_image_video FROM report_table';
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching data from report_table: ' + error.message);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    console.log(results);
    res.json(results);
  });

});


// Define a route to handle the POST request for saving data into 'signup_table'
app.post('/api/saveData/signup', (req, res) => {
  const { name, email, password } = req.body;

  const sql = 'INSERT INTO signup_table (name, email, password) VALUES (?, ?, ?)';
  const values = [name, email, password];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error saving data to the signup_table: ' + error.message);
      res.status(500).json({ error: 'Error saving data' });
      return;
    }

    console.log('Data saved to the signup_table');
    res.json({ message: 'Data saved successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
