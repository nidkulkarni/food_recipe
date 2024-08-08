const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const multer = require('multer');
const port = 8081;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "recipes",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.message);
  } else {
    console.log('Connected to MySQL');
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Where to store the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename files if needed
  },
});

const upload = multer({ storage: storage });

// Endpoint for user signup with timestamps
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const createdAt = new Date(); // Timestamp for record creation

  const sql = "INSERT INTO login (username, email, password, created_at) VALUES (?, ?, ?, ?)";
  const values = [username, email, password, createdAt];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Signup failed" });
    }

    return res.status(200).json({ message: "Signup successful" });
  });
});

// Endpoint for creating a recipe with timestamps
app.post('/recipes', upload.single('image'), (req, res) => {
  const { name, state, ingredients, method, mealType, category } = req.body;
  const createdAt = new Date(); // Timestamp for recipe creation

  const sql = "INSERT INTO recipes (name, state, ingredients, method, mealtype, category, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [name, state, ingredients, method, mealType, category, createdAt];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Recipe creation failed" });
    }

    return res.status(200).json({ message: "Recipe created successfully" });
  });
});
//For the contact info 
app.post('/contact_info', (req, res) => {
  const { name, email, message } = req.body;

  // Insert contact information into the database
  const sql = "INSERT INTO contact_info (name, email, message) VALUES (?, ?, ?)";
  const values = [name, email, message];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to save contact information" });
    }

    return res.status(200).json({ message: "Contact information saved successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
