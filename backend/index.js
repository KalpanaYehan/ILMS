import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { verifyUser } from "./middlewares/verifyUser.js";
import authorsRout from "./routes/authorsRout.js";
import booksRout from "./routes/booksRout.js";
import publishersRout from "./routes/publishersRout.js";
import reviewsRout from "./routes/reviewsRout.js";
import dashboardRout from "./routes/dashboardRout.js";
import popularRout from "./routes/popularRout.js";
import userRout from "./routes/userRout.js";

import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
export default app;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  return res.json("from the backend side");
});

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

app.use("/books/books", verifyUser, booksRout);
app.use("/books/authors", verifyUser, authorsRout);
app.use("/books/publishers", verifyUser, publishersRout);
app.use("/reviews", verifyUser, reviewsRout);
app.use("/dashboard", dashboardRout);
app.use("/popular", popularRout);
app.use("/users", verifyUser, userRout);

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connection pool is initialized and healthy!");
  connection.release();
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, role } = req.body;
  const connection = await pool.promise().getConnection(); // Get a connection from the pool

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // SQL query for inserting a new user
    const sql = `
          INSERT INTO member (First_name, Last_name, Email, Contact_No, Password, Role)
          VALUES (?, ?, ?, ?, ?, ?)
      `;

    // Execute the query with values
    const [result] = await connection.query(sql, [
      firstName,
      lastName,
      email,
      phoneNumber,
      hashedPassword,
      role,
    ]);

    // Respond with success and the new user's ID
    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Error during registration: ", err.message);
    res.status(500).json({ error: "Failed to register user." });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

app.post("/login", async (req, res) => {
  const { userEmail, password } = req.body;

  let connection;

  try {
    // Get a connection from the pool
    connection = await pool.promise().getConnection();

    // Query to find the user by email
    const sql = "SELECT * FROM member WHERE Email = ?";
    const [results] = await connection.query(sql, [userEmail]);

    if (results.length > 0) {
      const user = results[0];

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.Password);

      if (isMatch) {
        // Generate access and refresh tokens
        const accesstoken = jwt.sign(
          { userEmail: user.Email },
          "default-secret",
          { expiresIn: "15m" }
        );
        const refreshtoken = jwt.sign(
          { userEmail: user.Email },
          "default-secret",
          { expiresIn: "1d" }
        );

        // Set the cookies
        res.cookie("accesstoken", accesstoken, { maxAge: 900000 });
        res.cookie("refreshtoken", refreshtoken, {
          maxAge: 86400000,
          secure: true,
          sameSite: "strict",
        });

        // Respond with the user details and access token
        res.status(200).json({
          message: "success",
          accesstoken: accesstoken,
          user: {
            userId: user.Member_ID,
            username: user.First_name,
            role: user.Role,
            email: user.Email,
          },
        });
      } else {
        res.status(401).json({ message: "The password is incorrect" });
      }
    } else {
      res.status(404).json({ message: "No record found" });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

app.get("/home", verifyUser, async (req, res) => {
  let connection;
  try {
    // Get a connection from the pool with promises
    connection = await pool.promise().getConnection();

    // You can execute a query here if needed
    // Example: const [results] = await connection.query('SELECT * FROM some_table');

    // Just returning a success message for now
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
});



app.post('/logout', (req, res) => {
    // Clear HttpOnly cookies by setting them to expire in the past
    res.cookie('refreshtoken', '', { expires: new Date(0), httpOnly: true, path: '/' });
    //res.clearCookie('accesstoken', { path: '/' })
    // Send a response indicating successful logout
    res.json({ message: 'Logged out successfully' });
    // .status(200)
  });


app.get("/popularBooks", async (req, res) => {
  const connection = await pool.promise().getConnection();

  try {
    const sql = `
            SELECT 
                bt.Title_name, 
                bt.Title_ID,
                bt.Img_url,
                a.Name AS author,
                COUNT(*) AS issue_count
            FROM 
                issuebook ib
            JOIN 
                book b ON ib.Book_ID = b.Book_ID
            JOIN
                book_title bt ON b.Title_ID = bt.Title_ID
            JOIN
                author a ON bt.Author_ID = a.Author_ID
            WHERE 
                ib.Issued_date >= DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE())-1 DAY)
                AND ib.Issued_date < LAST_DAY(CURDATE()) + INTERVAL 1 DAY
            GROUP BY 
                bt.Title_ID, bt.Title_name, bt.Img_url, a.Name
            ORDER BY 
                issue_count DESC
            LIMIT 10;

        `;

    const [result] = await connection.query(sql);

    res.status(200).json(result); // Send the result back to the frontend
  } catch (err) {
    console.error("Error fetching popular books:", err.message);
    res.status(500).json({ error: "Failed to fetch popular books." });
  } finally {
    connection.release();
  }
});

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
