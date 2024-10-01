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

app.get('/book/:id', (req, res) => {
    const sql = "SELECT * FROM `book title` INNER JOIN author ON `book title`.Author_ID = author.Author_ID WHERE `book title`.Title_ID = ?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.post('/return', (req, res) => {
    //console.log(req.body)
    const sql = "SELECT * FROM `issuebook` WHERE Member_ID = ? AND Book_ID = ? AND `Returned_Date` IS NULL";
    const userId = req.body.userId;
    const bookId = req.body.bookId;
    
    db.query(sql, [userId, bookId], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.post('/issue', (req, res) => {
    const { Admin_ID, userId, bookId, Issued_Date } = req.body;
    const sql = "INSERT INTO issuebook (`Admin_ID`, `Member_ID`, `Book_ID`, `Issued_Date`) VALUES (?, ?, ?, ?)";

    db.query(sql, [Admin_ID, userId, bookId, Issued_Date], (err, result) => {
        if(err) return res.json({Message: "Error inserting data into database"});
        return res.json({ Message: "Book issued", data: result });
    })
})

app.post('/returnbook', (req, res) => {
    const { id, date } = req.body;
    //console.log(id, date)
    const sql = "UPDATE issuebook SET `Returned_Date` = ? WHERE `Issue_ID` = ? AND `Returned_Date` IS NULL";

    db.query(sql, [date, id], (err, result) => {
        if(err) return res.json({Message: "Error inserting data into database"}); 
        return res.json({ Message: "Book returned", data: result });
    })
})


app.listen(8081, () => {
    console.log("Listening")
})