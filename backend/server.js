import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ILMS",
  database: "library_system",
});

app.get("/user/:id", (req, res) => {
  const sql = "SELECT * FROM member WHERE Member_ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.get("/book/:id", (req, res) => {
  const sql =
    "SELECT * FROM `book` INNER JOIN `book title` ON `book`.Title_ID = `book title`.Title_ID INNER JOIN author ON `book title`.Author_ID = author.Author_ID WHERE `book`.Book_ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.post("/issue", (req, res) => {
  const { Admin_ID, userId, bookId, Issued_Date } = req.body;
  const sql =
    "INSERT INTO issuebook (`Admin_ID`, `Member_ID`, `Book_ID`) VALUES (?, ?, ?)";

  db.query(sql, [Admin_ID, userId, bookId, Issued_Date], (err, result) => {
    if (err) return res.json({ Message: "Error inserting data into database" });
    return res.json({ Message: "Book issued", data: result });
  });
});

app.get("/return", (req, res) => {
  //console.log(req.body)
  const sql =
    "SELECT * FROM `issuebook` WHERE Member_ID = ? AND Book_ID = ? AND `Returned_Date` IS NULL";

  const userId = req.query.userId; // Get userId from query parameters
  const bookId = req.query.bookId; // Get bookId from query parameters

  db.query(sql, [userId, bookId], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.post("/returnbook", (req, res) => {
  const { bookId, userId } = req.body;
  const sql = "CALL UpdateReturnedDate(?, ?)";

  db.query(sql, [bookId, userId], (err, result) => {
    if (err) return res.json({ Message: "Error inserting data into database" });
    return res.json({ Message: "Book returned", data: result });
  });
});

app.listen(8081, () => {
  console.log("Listening");
});
