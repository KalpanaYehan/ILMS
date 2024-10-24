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
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();

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

app.use("/books/books", booksRout);
app.use("/books/authors", authorsRout);
app.use("/books/publishers", publishersRout);

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

////////////////////////////above from this line/////////////////////////////////////////////

// app.post('/addBook', async (req, res) => {
//     const { bookName, author, category, publisher, isbn, pages, copies, Img_url } = req.body;

//     const connection = await pool.promise().getConnection();

//     try {
//         // Begin transaction
//         await connection.beginTransaction();

//         // Step 1: Insert or find the author
//         const [authorResult] = await connection.query(
//             'INSERT INTO author (Name) VALUES (?) ON DUPLICATE KEY UPDATE Name=VALUES(Name)',
//             [author]
//         );
//         const authorId = authorResult.insertId;

//         // Step 2: Insert or find the category
//         const [categoryResult] = await connection.query(
//             'INSERT INTO category (Category_name) VALUES (?) ON DUPLICATE KEY UPDATE Category_name=VALUES(Category_name)',
//             [category]
//         );
//         const categoryId = categoryResult.insertId;

//         // Step 3: Insert or find the publisher
//         const [publisherResult] = await connection.query(
//             'INSERT INTO publisher (Name) VALUES (?) ON DUPLICATE KEY UPDATE Name=VALUES(Name)',
//             [publisher]
//         );
//         const publisherId = publisherResult.insertId;

//         // Step 4: Insert the book into the `book_title` table
//         const bookSql = 'INSERT INTO book_title (Category_ID, Author_ID, Publisher_ID, Title_name, No_of_copies, ISBN_Number, NoOfPages, Status, Img_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
//         const [bookResult] = await connection.query(bookSql, [
//             categoryId,
//             authorId,
//             publisherId,
//             bookName,
//             copies,
//             isbn,
//             pages,
//             1, // Status for available book
//             Img_url,
//         ]);
//         const titleId = bookResult.insertId;

//         // Step 5: Insert into the `book` table to track copies
//         const inventorySql = 'INSERT INTO book (Title_ID) VALUES (?)';
//         await connection.query(inventorySql, [titleId]);

//         // Commit the transaction
//         await connection.commit();

//         // Respond with success
//         res.status(201).json({ message: "success", bookId: titleId });

//     } catch (err) {
//         // Rollback the transaction in case of error
//         await connection.rollback();
//         console.error("Error adding book:", err.message);
//         res.status(500).json({ error: "Failed to add book" });
//     } finally {
//         // Release the connection
//         connection.release();
//     }
// });

// app.get('/getBooks', async (req, res) => {
//     const connection = await pool.promise().getConnection();

//     try {
//         const sql = `
//             SELECT

//                 a.Title_name,
//                 b.Name AS Author,
//                a.Title_ID,
//                 a.Img_url
//             FROM book_title a
//             JOIN author b ON b.Author_ID = a.Author_ID
//             order by a.Title_ID
//         `;

//         const [books] = await connection.query(sql);

//         if (books.length === 0) {
//             return res.status(404).json({ message: "No books found." });
//         }

//         res.status(200).json(books);

//     } catch (err) {
//         console.error("Error fetching books:", err.message);
//         res.status(500).json({ error: "Failed to fetch books." });
//     } finally {
//         connection.release();
//     }
// });

// app.get('/getBook/:id', async (req, res) => {
//     const { id } = req.params; // Extract the Title_ID from the route parameters
//     const connection = await pool.promise().getConnection();

//     try {
//         const sql = `
//            SELECT
//                 a.Title_name,
//                 b.Name AS Author,
//                 c.Category_name,
//                 d.Name AS Publisher_name,
//                 a.ISBN_Number,
//                 a.NoOfPages,
//                 a.No_of_copies,
//                 a.Img_url,
//                 a.Status

//             FROM
//                 book_title a
//             JOIN
//                 author b ON b.Author_ID = a.Author_ID
//             JOIN
//                 category c ON c.Category_ID = a.Category_ID -- Join with the category table
//             JOIN
//                 publisher d ON d.Publisher_ID = a.Publisher_ID -- Join with the publisher table
//             WHERE
//                 a.Title_ID = ?

//         `;

//         const [book] = await connection.query(sql, [id]);

//         if (book.length === 0) {
//             return res.status(404).json({ message: "Book not found." });
//         }

//         res.status(200).json(book[0]); // Return the single book object

//     } catch (err) {
//         console.error("Error fetching book:", err.message);
//         res.status(500).json({ error: "Failed to fetch book." });
//     } finally {
//         connection.release();
//     }
// });

// // Express route to edit a book
// app.put('/editBook/:id', async (req, res) => {
//     const connection = await pool.promise().getConnection();
//     const { id } = req.params; // Title_ID
//     const {
//         bookName,   // New book title
//         author,    // New author ID
//         category,  // New category ID
//         isbn, // New publisher ID
//         publisher,
//         pages,
//         copies,
//         Img_url      // New image URL
//     } = req.body;    // Assume these details come from the frontend

//     try {
//         // SQL query to update book details
//         const sql = `
//             UPDATE book_title
//             SET
//                 Title_name = ?,
//                 Author_ID = (SELECT Author_ID FROM author WHERE Name = ?),
//                 Category_ID = (SELECT Category_ID FROM category WHERE Category_name = ?),
//                 Publisher_ID = (SELECT Publisher_ID FROM publisher WHERE Name = ?),
//                 ISBN_Number = ?,
//                 NoOfPages = ?,
//                 No_of_copies = ?,
//                 Img_url = ?
//             WHERE
//                 Title_ID = ?
//         `;

//         const values = [bookName, author, category, publisher, isbn, pages,copies,Img_url,id];

//         const [result] = await connection.query(sql, values);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Book not found." });
//         }

//         res.status(200).json({ message: "Book updated successfully." });

//     } catch (err) {
//         console.error("Error updating book:", err.message);
//         res.status(500).json({ error: "Failed to update book." });
//     } finally {
//         connection.release();
//     }
// });

// app.delete('/deleteBook/:id', async (req, res) => {
//     const { id } = req.params; // Book Title ID

//     const connection = await pool.promise().getConnection();

//     try {
//         // Begin transaction
//         await connection.beginTransaction();

//         // Step 1: Delete the record from the `book_title` table
//         const deleteBookTitleSql = 'DELETE FROM book_title WHERE Title_ID = ?';
//         const [deleteResult] = await connection.query(deleteBookTitleSql, [id]);

//         // Step 2: Delete the records from the `book` table where the Title_ID matches
//         const deleteBooksSql = 'DELETE FROM book WHERE Title_ID = ?';
//         await connection.query(deleteBooksSql, [id]);

//         if (deleteResult.affectedRows === 0) {
//             // If no rows were affected, the book was not found
//             await connection.rollback();
//             return res.status(404).json({ message: "Book not found." });
//         }

//         // Commit the transaction
//         await connection.commit();

//         // Respond with success
//         res.status(200).json({ message: "Book deleted successfully." });

//     } catch (err) {
//         // Rollback the transaction in case of error
//         await connection.rollback();
//         console.error("Error deleting book:", err.message);
//         res.status(500).json({ error: "Failed to delete book." });
//     } finally {
//         // Release the connection
//         connection.release();
//     }
// });

// //app.use('/books',booksRout)
// //app.use('/authors',authorsRout)
// //app.use('/publishers',publishersRout)

// app.post('/addAuthor', async (req, res) => {
//     const { authorName ,country,Img_url } = req.body;  // Assuming you get the author's name from the request body

//     const connection = await pool.promise().getConnection();

//     try {
//         // Begin transaction
//         await connection.beginTransaction();

//         // Step 1: Insert the author or update if it already exists
//         const [authorResult] = await connection.query(
//             'INSERT INTO author (Name,Country,Img_url) VALUES (?,?,?) ON DUPLICATE KEY UPDATE Name=VALUES(Name)',
//             [authorName,country,Img_url]
//         );
//         const authorId = authorResult.insertId || authorResult.Author_ID;

//         // Commit the transaction
//         await connection.commit();

//         // Respond with success
//         res.status(201).json({ message: "Author added successfully", authorId });

//     } catch (err) {
//         // Rollback the transaction in case of error
//         await connection.rollback();
//         console.error("Error adding author:", err.message);
//         res.status(500).json({ error: "Failed to add author" });
//     } finally {
//         // Release the connection
//         connection.release();
//     }
// });

// app.delete('/deleteAuthor/:id', async (req, res) => {
//     const { id } = req.params; // Author ID

//     const connection = await pool.promise().getConnection();

//     try {
//         // Begin transaction
//         await connection.beginTransaction();

//         // Step 1: Delete the record from the `author` table
//         const deleteAuthorSql = 'DELETE FROM author WHERE Author_ID = ?';
//         const [deleteResult] = await connection.query(deleteAuthorSql, [id]);

//         if (deleteResult.affectedRows === 0) {
//             // If no rows were affected, the author was not found
//             await connection.rollback();
//             return res.status(404).json({ message: "Author not found." });
//         }

//         // Commit the transaction
//         await connection.commit();

//         // Respond with success
//         res.status(200).json({ message: "Author deleted successfully." });

//     } catch (err) {
//         // Rollback the transaction in case of error
//         await connection.rollback();
//         console.error("Error deleting author:", err.message);
//         res.status(500).json({ error: "Failed to delete author." });
//     } finally {
//         // Release the connection
//         connection.release();
//     }
// });

// app.get('/getAuthors', async (req, res) => {
//     const connection = await pool.promise().getConnection();

//     try {
//         const sql = `
//             SELECT
//                 Img_url,
//                 Author_ID,
//                 Country,
//                 Name
//             FROM author
//         `;

//         const [authors] = await connection.query(sql);

//         if (authors.length === 0) {
//             return res.status(404).json({ message: "No authors found." });
//         }

//         res.status(200).json(authors);

//     } catch (err) {
//         console.error("Error fetching authors:", err.message);
//         res.status(500).json({ error: "Failed to fetch authors." });
//     } finally {
//         connection.release();
//     }
// });

// app.get('/getAuthor/:id', async (req, res) => {
//     const { id } = req.params; // Extract the Title_ID from the route parameters
//     const connection = await pool.promise().getConnection();

//     try {
//         const sql = `
//            SELECT
//                 Author_ID,
//                 Name,
//                 Country,
//                 Img_url

//             FROM
//                 author
//             WHERE
//                 Author_ID = ?

//         `;

//         const [author] = await connection.query(sql, [id]);

//         if (author.length === 0) {
//             return res.status(404).json({ message: "Author not found." });
//         }

//         res.status(200).json(author[0]); // Return the single book object

//     } catch (err) {
//         console.error("Error fetching author:", err.message);
//         res.status(500).json({ error: "Failed to fetch author." });
//     } finally {
//         connection.release();
//     }
// });

// // Express route to edit an author
// app.put('/editAuthor/:id', async (req, res) => {
//     const connection = await pool.promise().getConnection();
//     const { id } = req.params; // Author_ID
//     const { authorName, country,Img_url } = req.body; // New author name and country from frontend

//     try {
//         // SQL query to update author details
//         const sql = `
//             UPDATE author
//             SET
//                 Name = ?,
//                 Country = ?,
//                 Img_url = ?
//             WHERE
//                 Author_ID = ?
//         `;

//         const values = [authorName, country,Img_url, id];

//         const [result] = await connection.query(sql, values);

//         // Check if any rows were affected
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Author not found." });
//         }

//         // If author updated successfully
//         res.status(200).json({ message: "Author updated successfully." });

//     } catch (err) {
//         // Handle any errors during the update process
//         console.error("Error updating author:", err.message);
//         res.status(500).json({ error: "Failed to update author." });
//     } finally {
//         // Release the connection back to the pool
//         connection.release();
//     }
// });

// app.post('/addPublisher', async (req, res) => {
//     const { publisherName,location } = req.body;  // Assuming you get the publisher's name from the request body

//     const connection = await pool.promise().getConnection();

//     try {
//         // Begin transaction
//         await connection.beginTransaction();

//         // Step 1: Insert the publisher or update if it already exists
//         const [publisherResult] = await connection.query(
//             'INSERT INTO publisher (Name,Location) VALUES (?,?) ON DUPLICATE KEY UPDATE Name=VALUES(Name)',
//             [publisherName,location]
//         );
//         const publisherId = publisherResult.insertId || publisherResult.Publisher_ID;

//         // Commit the transaction
//         await connection.commit();

//         // Respond with success
//         res.status(201).json({ message: "Publisher added successfully", publisherId });

//     } catch (err) {
//         // Rollback the transaction in case of error
//         await connection.rollback();
//         console.error("Error adding publisher:", err.message);
//         res.status(500).json({ error: "Failed to add publisher" });
//     } finally {
//         // Release the connection
//         connection.release();
//     }
// });

// app.delete('/deletePublisher/:id', async (req, res) => {
//     const { id } = req.params; // Publisher ID

//     const connection = await pool.promise().getConnection();

//     try {
//         // Begin transaction
//         await connection.beginTransaction();

//         // Step 1: Delete the record from the `publisher` table
//         const deletePublisherSql = 'DELETE FROM publisher WHERE Publisher_ID = ?';
//         const [deleteResult] = await connection.query(deletePublisherSql, [id]);

//         if (deleteResult.affectedRows === 0) {
//             // If no rows were affected, the publisher was not found
//             await connection.rollback();
//             return res.status(404).json({ message: "Publisher not found." });
//         }

//         // Commit the transaction
//         await connection.commit();

//         // Respond with success
//         res.status(200).json({ message: "Publisher deleted successfully." });

//     } catch (err) {
//         // Rollback the transaction in case of error
//         await connection.rollback();
//         console.error("Error deleting publisher:", err.message);
//         res.status(500).json({ error: "Failed to delete publisher." });
//     } finally {
//         // Release the connection
//         connection.release();
//     }
// });

// app.get('/getPublishers', async (req, res) => {
//     const connection = await pool.promise().getConnection();

//     try {
//         const sql = `
//             SELECT
//                 Publisher_ID,
//                 Location,
//                 Name
//             FROM publisher
//         `;

//         const [publishers] = await connection.query(sql);

//         if (publishers.length === 0) {
//             return res.status(404).json({ message: "No publishers found." });
//         }

//         res.status(200).json(publishers);

//     } catch (err) {
//         console.error("Error fetching publishers:", err.message);
//         res.status(500).json({ error: "Failed to fetch publishers." });
//     } finally {
//         connection.release();
//     }
// });

// app.get('/getPublisher/:id', async (req, res) => {
//     const { id } = req.params; // Extract the Title_ID from the route parameters
//     const connection = await pool.promise().getConnection();

//     try {
//         const sql = `
//            SELECT
//                 Publisher_ID,
//                 Name,
//                 Location
//             FROM
//                 publisher
//             WHERE
//                 Publisher_ID = ?

//         `;

//         const [publisher] = await connection.query(sql, [id]);

//         if (publisher.length === 0) {
//             return res.status(404).json({ message: "Publisher not found." });
//         }

//         res.status(200).json(publisher[0]); // Return the single book object

//     } catch (err) {
//         console.error("Error fetching publisher:", err.message);
//         res.status(500).json({ error: "Failed to fetch publisher." });
//     } finally {
//         connection.release();
//     }
// });

// app.put('/editPublisher/:id', async (req, res) => {
//     const connection = await pool.promise().getConnection();
//     const { id } = req.params; // Publisher_ID
//     const { publisherName, location} = req.body; // New publisher details from frontend

//     try {
//         // SQL query to update publisher details
//         const sql = `
//             UPDATE publisher
//             SET
//                 Name = ?,
//                 Location = ?
//             WHERE
//                 Publisher_ID = ?
//         `;

//         const values = [publisherName, location, id];

//         const [result] = await connection.query(sql, values);

//         // Check if any rows were affected
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Publisher not found." });
//         }

//         // If publisher updated successfully
//         res.status(200).json({ message: "Publisher updated successfully." });

//     } catch (err) {
//         // Handle any errors during the update process
//         console.error("Error updating publisher:", err.message);
//         res.status(500).json({ error: "Failed to update publisher." });
//     } finally {
//         // Release the connection back to the pool
//         connection.release();
//     }
// });

app.post("/logout", (req, res) => {
  // Clear HttpOnly cookies by setting them to expire in the past
  res.cookie("refreshtoken", "", {
    expires: new Date(0),
    httpOnly: true,
    path: "/",
  });
  // Send a response indicating successful logout
  res.json({ message: "Logged out successfully" });
  // .status(200)
});

app.get("/issueDetails", async (req, res) => {
  const connection = await pool.promise().getConnection();
  try {
    const sql =
      "SELECT * FROM issuebook WHERE Member_ID = ? AND Book_ID = ? AND Returned_Date IS NULL";
    const customerId = req.query.customerId;
    const bookId = req.query.bookId;
    const [result] = await connection.query(sql, [customerId, bookId]);
    res.json(result[0]);
  } catch (err) {
    console.error("Error fetching issued books:", err.message);
    res.status(500).json({ error: "Failed to fetch issued books." });
  } finally {
    connection.release();
  }
});

app.post("/issue", async (req, res) => {
  const connection = await pool.promise().getConnection();
  try {
    const { Admin_ID, userId, bookId } = req.body;
    const sql =
      "INSERT INTO issuebook (`Admin_ID`, `Member_ID`, `Book_ID`) VALUES (?, ?, ?)";
    const [result] = await connection.query(sql, [Admin_ID, userId, bookId]);
    res.json({ Message: "Book issued", data: result });
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).json({ error: "Failed to fetch user." });
  } finally {
    connection.release();
  }
});

app.post("/returnbook", async (req, res) => {
  const connection = await pool.promise().getConnection();
  try {
    const { bookId, userId } = req.body;
    const sql = "CALL UpdateReturnedDate(?, ?)";
    const [result] = await connection.query(sql, [bookId, userId]);
    res.json({ Message: "Book returned", data: result });
  } catch (err) {
    console.error("Error returning book", err.message);
    res.status(500).json({ error: "Failed to return book" });
  } finally {
    connection.release();
  }
});

// app.get("/book/:id", (req, res) => {
//   const sql =
//     "SELECT * FROM `book` INNER JOIN `book title` ON `book`.Title_ID = `book title`.Title_ID INNER JOIN author ON `book title`.Author_ID = author.Author_ID WHERE `book`.Book_ID = ?";
//   const id = req.params.id;

//   db.query(sql, [id], (err, result) => {
//     if (err) return res.json({ Message: "Error inside server" });
//     return res.json(result);
//   });
// });

app.get("/book/:id", (req, res) => {
  // get the title id from the request
  const bookId = req.params.id;
  // sql query to get the book details
  const sql =
    "SELECT book.Book_ID, book_title.Title_name, author.Name AS Author_name, publisher.Name AS Publisher_name, publisher.Location, category.Category_name, book_title.NoOfPages, book_title.ISBN_Number, book_title.Des, book.Status, book_title.Img_url FROM book INNER JOIN book_title ON book.Title_ID = book_title.Title_ID INNER JOIN author ON book_title.Author_ID = author.Author_ID INNER JOIN category ON book_title.Category_ID = category.Category_ID INNER JOIN publisher ON book_title.Publisher_ID = publisher.Publisher_ID WHERE book.Book_ID = ?";

  // execute the sql query
  pool.query(sql, [bookId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      console.log("Book not found");
      return res.status(404).json({ message: "Book not found" });
    }
    // console.log(result);

    return res.status(200).json(result);
  });
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

////////////////////////////////////////

//getting book through title_id
app.get("/books/:id", (req, res) => {
  // get the title id from the request
  const titleId = req.params.id;
  // sql query to get the book details
  const sql = `SELECT bt.Title_name AS 'book_title',
              a.Name AS 'AuthorName',
              c.Category_name AS 'CategoryName',
              p.Name AS 'PublisherName',
              bt.ISBN_Number AS 'ISBNNumber',
              bt.Status AS 'Status',
              bt.NoOfPages AS 'NoOfPages',
              bt.Ave_Rate AS 'AverageRating',
              bt.Des AS 'Description',
              bt.Img_url AS 'ImageURL', 
              bt.im1 AS 'Image1',
              bt.im2 as 'Image2',
                bt.im3 as 'Image3',
                bt.im4 as 'Image4',
                bt.im5 as 'Image5'
          FROM 
              book_title bt
          JOIN 
              author a ON bt.Author_ID = a.Author_ID
          JOIN 
              category c ON bt.category_ID = c.category_ID
          JOIN 
              publisher p ON bt.Publisher_ID = p.Publisher_ID
          WHERE 
              bt.Title_ID = ?`;

  // execute the sql query
  pool.query(sql, [titleId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      console.log("Book not found");
      return res.status(404).json({ message: "Book not found" });
    }
    console.log(result);

    return res.status(200).json(result);
  });
});
// getting user details according to the id
app.get("/user/:id", async (req, res) => {
  const { id } = req.params; // Extract the user ID from the route parameters
  const connection = await pool.promise().getConnection();

  try {
    const sql = `
            SELECT 
                Member_ID,
                First_name,
                Last_name,
                Email,
                Contact_No,
                Role,
                Img_url
            FROM 
                member
            WHERE 
                Member_ID = ?
        `;

    const [user] = await connection.query(sql, [id]);
    // console.log(user);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Return the single user object
  } catch (err) {
    console.error("Error fetching user details:", err.message);
    res.status(500).json({ error: "Failed to fetch user details" });
  } finally {
    connection.release();
  }
});

//getting all the reviews
app.get("/reviews", (req, res) => {
  pool.query("SELECT * FROM review", (err, result) => {
    if (err) {
      console.error("Error getting reviews:", err.message);
      res.status(500).send("Error getting reviews");
      return;
    }
    res.json(result);
  });
});

// getting review with title id
app.get("/reviews/:title_id", (req, res) => {
  pool.query(
    `SELECT review.*, member.First_Name, member.Last_Name,
       DATE_FORMAT(review.Review_Date, '%Y-%m-%d') AS Review_date
       FROM review
       JOIN member ON review.Member_ID = member.Member_ID
       WHERE review.Title_ID = ?`,
    [req.params.title_id],
    (err, result) => {
      if (err) {
        console.error("Error getting reviews:", err.message);
        res.status(500).send("Error getting reviews");
        return;
      }
      res.json(result);
    }
  );
});

// POST endpoint to add a review
app.post("/reviews", (req, res) => {
  const { Title_ID, Member_ID, Rating, Review_Text, Review_Date } = req.body;

  const query = `INSERT INTO review (Title_ID, Member_ID, Rating, Review_Text, Review_Date) 
                   VALUES (?, ?, ?, ?, ?)`;
  console.log(query);

  const values = [Title_ID, Member_ID, Rating, Review_Text, Review_Date];

  pool.execute(query, values, (err, result) => {
    if (err) {
      console.error("Error adding review:", err);
      return res.status(500).json({ message: "Error adding review" });
    }

    // Return success response
    console.log("Review added successfully");
    res.status(201).json({
      message: "Review added successfully",
      reviewId: result.insertId,
    });
  });
});

//deleting a review
app.delete("/reviews/:review_id", (req, res) => {
  pool.query(
    "DELETE FROM review WHERE review_id = ?",
    [req.params.review_id],
    (err, result) => {
      if (err) {
        console.error("Error deleting review:", err.message);
        res.status(500).send("Error deleting review");
        return;
      }
      res.json(result);
    }
  );
});

// Endpoint to get all reviews for a specific user
app.get("/review/:id", async (req, res) => {
  const { id } = req.params;
  const connection = await pool.promise().getConnection();
  try {
    const sql = `SELECT 
        review.Review_ID,
        review.Rating,
        review.Review_Text,
        DATE_FORMAT(review.Review_Date, '%Y-%m-%d') AS Review_Date,
         book_title.Title_name
       FROM review
       JOIN book_title ON review.Title_ID = book_title.Title_ID
       WHERE review.Member_ID = ?`;
    const [result] = await connection.query(sql, [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No reviews found." });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching reviews:", err.message);
    res.status(500).json({ error: "Failed to fetch reviews." });
  } finally {
    connection.release();
  }
});

// Endpoint to update a review
app.put("/reviews/:id", (req, res) => {
  const { id } = req.params;
  const { Rating, Review_Text, Review_Date } = req.body;

  const query = `
          UPDATE review
          SET 
            Rating = ?,
            Review_Text = ?,
            Review_Date = ?
          WHERE Review_ID = ?`;

  const values = [Rating, Review_Text, Review_Date, id];

  pool.execute(query, values, (err, result) => {
    if (err) {
      console.error("Error updating review:", err);
      return res.status(500).json({ message: "Error updating review" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review updated successfully" });
  });
});

// Endpoint to get book borrowed details for a specific user
app.get("/borrowed/:id", async (req, res) => {
  const { id } = req.params;
  const connection = await pool.promise().getConnection();
  try {
    const sql = `SELECT 
        book_title.Title_name,
        author.Name AS Author,
        DATE_FORMAT(issuebook.Issued_Date, '%Y-%m-%d') AS Issued_Date,
        DATE_FORMAT(issuebook.Returned_Date, '%Y-%m-%d') AS Returned_Date
       FROM issuebook
       JOIN book ON issuebook.Book_ID = book.Book_ID
       JOIN book_title ON book.Title_ID = book_title.Title_ID
       JOIN author ON book_title.Author_ID = author.Author_ID
       WHERE issuebook.Member_ID = ?`;
    const [result] = await connection.query(sql, [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No books borrowed." });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching borrowed books:", err.message);
    res.status(500).json({ error: "Failed to fetch borrowed books." });
  } finally {
    connection.release();
  }
});

// Endpoint to get the number of books in each category
app.get("/categories/book-count", (req, res) => {
  const query = `
      SELECT c.Category_name AS CategoryName, SUM(bt.No_of_copies) AS BookCount
      FROM category c
      LEFT JOIN book_title bt ON c.Category_ID = bt.Category_ID
      GROUP BY c.Category_name
    `;

  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error getting book count by category:", err.message);
      res.status(500).send("Error getting book count by category");
      return;
    }
    res.json(result);
  });
});

// Endpoint to get overdue books
app.get("/overdue-books", (req, res) => {
  const query = `
        SELECT 
          m.First_Name AS MemberFirstName,
          m.Last_Name AS MemberLastName,
          bt.Title_name AS BookTitle,
          c.Category_name AS BookCategory,
          ib.Issued_Date AS IssuedDate,
          DATEDIFF(CURDATE(), ib.Issued_Date) - 14 AS OverdueDays
        FROM 
          issuebook ib
        JOIN 
          member m ON ib.Member_ID = m.Member_ID
        JOIN 
          book b ON ib.Book_ID = b.Book_ID
        JOIN 
          book_title bt ON b.Title_ID = bt.Title_ID
        JOIN 
          category c ON bt.Category_ID = c.Category_ID
        WHERE 
          ib.Returned_Date IS NULL
          AND DATEDIFF(CURDATE(), ib.Issued_Date) > 14
      `;

  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error getting overdue books:", err.message);
      res.status(500).send("Error getting overdue books");
      return;
    }
    res.json(result);
  });
});

// Endpoint to get the total number of books issued according to year
app.get("/book-acquisition", (req, res) => {
  const { year } = req.query;

  const query = `
      SELECT MONTH(Issued_Date) AS month, COUNT(*) AS total
      FROM issuebook
      WHERE YEAR(Issued_Date) = ?
      GROUP BY MONTH(Issued_Date)
      ORDER BY MONTH(Issued_Date)
    `;

  pool.query(query, [year], (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Error executing query");
      return;
    }
    res.json(results);
  });
});

// Endpoint to get the total number of books in the library
app.get("/total-books", (req, res) => {
  const query = `
      SELECT SUM(No_of_copies) AS totalBooks
      FROM book_title
    `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Error executing query");
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint to get the total number of members where role is equal to user
app.get("/total-members", (req, res) => {
  const query = `
      SELECT COUNT(*) AS totalMembers
      FROM member
      WHERE Role = 'user'
    `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Error executing query");
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint to get the most popular categories within the nearest year
app.get("/popular-categories/year", (req, res) => {
  const query = `
      SELECT c.Category_name, COUNT(*) AS borrowCount
      FROM issuebook ib
      JOIN book b ON ib.Book_ID = b.Book_ID
      JOIN book_title bt ON b.Title_ID = bt.Title_ID
      JOIN category c ON bt.Category_ID = c.Category_ID
      WHERE ib.Issued_Date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
      GROUP BY c.Category_name
      ORDER BY borrowCount DESC
      LIMIT 10
    `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Error executing query");
      return;
    }
    res.json(results);
  });
});

// Endpoint to get the most popular categories within the nearest month
app.get("/popular-categories/month", (req, res) => {
  const query = `
      SELECT c.Category_name, COUNT(*) AS borrowCount
      FROM issuebook ib
      JOIN book b ON ib.Book_ID = b.Book_ID
      JOIN book_title bt ON b.Title_ID = bt.Title_ID
      JOIN category c ON bt.Category_ID = c.Category_ID
      WHERE ib.Issued_Date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
      GROUP BY c.Category_name
      ORDER BY borrowCount DESC
      LIMIT 10
    `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Error executing query");
      return;
    }
    res.json(results);
  });
});

// Endpoint to get the most popular categories within the nearest week
app.get("/popular-categories/week", (req, res) => {
  const query = `
      SELECT c.Category_name, COUNT(*) AS borrowCount
      FROM issuebook ib
      JOIN book b ON ib.Book_ID = b.Book_ID
      JOIN book_title bt ON b.Title_ID = bt.Title_ID
      JOIN category c ON bt.Category_ID = c.Category_ID
      WHERE ib.Issued_Date >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)
      GROUP BY c.Category_name
      ORDER BY borrowCount DESC
      LIMIT 10
    `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Error executing query");
      return;
    }
    res.json(results);
  });
});

// Endpoint to get the top 6 popular authors within the nearest year
app.get("/popular-authors/year", (req, res) => {
  const query = `
      SELECT 
        a.Name AS AuthorName,
        COUNT(DISTINCT ib.Issue_ID) AS IssuedBooks,
        COUNT(DISTINCT rb.Reservation_ID) AS ReservedBooks
      FROM author a
      LEFT JOIN book_title bt ON a.Author_ID = bt.Author_ID
      LEFT JOIN book b ON bt.Title_ID = b.Title_ID
      LEFT JOIN issuebook ib ON b.Book_ID = ib.Book_ID AND ib.Issued_Date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
      LEFT JOIN reservedbook rb ON b.Book_ID = rb.Book_ID AND rb.Reserved_Date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
      GROUP BY a.Name
      ORDER BY IssuedBooks DESC, ReservedBooks DESC
      LIMIT 6
    `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Error executing query");
      return;
    }
    res.json(results);
  });
});

// Endpoint to get the top 6 popular authors within the nearest month
app.get("/popular-authors/month", (req, res) => {
  const query = `
      SELECT 
        a.Name AS AuthorName,
        COUNT(DISTINCT ib.Issue_ID) AS IssuedBooks,
        COUNT(DISTINCT rb.Reservation_ID) AS ReservedBooks
      FROM author a
      LEFT JOIN book_title bt ON a.Author_ID = bt.Author_ID
      LEFT JOIN book b ON bt.Title_ID = b.Title_ID
      LEFT JOIN issuebook ib ON b.Book_ID = ib.Book_ID AND ib.Issued_Date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
      LEFT JOIN reservedbook rb ON b.Book_ID = rb.Book_ID AND rb.Reserved_Date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
      GROUP BY a.Name
      ORDER BY IssuedBooks DESC, ReservedBooks DESC
      LIMIT 6
    `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Error executing query");
      return;
    }
    res.json(results);
  });
});

// Endpoint to get the top 6 popular authors within the nearest week
app.get("/popular-authors/week", (req, res) => {
  const query = `
      SELECT 
        a.Name AS AuthorName,
        COUNT(DISTINCT ib.Issue_ID) AS IssuedBooks,
        COUNT(DISTINCT rb.Reservation_ID) AS ReservedBooks
      FROM author a
      LEFT JOIN book_title bt ON a.Author_ID = bt.Author_ID
      LEFT JOIN book b ON bt.Title_ID = b.Title_ID
      LEFT JOIN issuebook ib ON b.Book_ID = ib.Book_ID AND ib.Issued_Date >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)
      LEFT JOIN reservedbook rb ON b.Book_ID = rb.Book_ID AND rb.Reserved_Date >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)
      GROUP BY a.Name
      ORDER BY IssuedBooks DESC, ReservedBooks DESC
      LIMIT 6
    `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Error executing query");
      return;
    }
    res.json(results);
  });
});

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
