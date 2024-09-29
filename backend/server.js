import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ILMS",
    database: "library_system"
})

// Check MySQL connection
{/*
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});
*/}

app.get('/user/:id', (req, res) => {
    const sql = "SELECT * FROM member WHERE Member_ID = ?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.listen(8081, () => {
    console.log("Listening")
})