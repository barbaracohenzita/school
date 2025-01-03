const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/student-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const mongoDb = mongoose.connection;
mongoDb.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoDb.once('open', () => {
    console.log('Connected to MongoDB');
});

// PostgreSQL connection
const pgPool = new Pool({
    user: 'your_pg_user',
    host: 'localhost',
    database: 'student-app',
    password: 'your_pg_password',
    port: 5432,
});
pgPool.connect((err) => {
    if (err) {
        console.error('PostgreSQL connection error:', err.stack);
    } else {
        console.log('Connected to PostgreSQL');
    }
});

// MySQL connection
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'student-app',
});
mysqlConnection.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err.stack);
    } else {
        console.log('Connected to MySQL');
    }
});

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Student Organization Study App Backend');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
