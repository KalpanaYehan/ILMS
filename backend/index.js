const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {verifyUser} = require('./middlewares/verifyUser.js');


const app = express();
app.use(cors({origin:"http://localhost:5173",
  credentials:true,
  methods:["GET","POST","DELETE","PUT"]}

))
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kalpana@1e2",
    database: 'library_system'
});

// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
  
//     if (!token) {
//       return res.status(401).json({ message: "Token is not available" });
//     }
  
//     jwt.verify(token, 'default-secret', (err, decoded) => {
//       if (err) {
//         return res.status(403).json({ message: "Token is invalid" });
//       }
//       req.user = decoded; // Optionally attach user data to the request object
//       next();
//     });
//   };
  

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to the MySQL database!");
});

app.post('/register', (req, res) => {
    const { firstName, lastName, email, phoneNumber, password, userType } = req.body;

    
    bcrypt.hash(password, 5)
        .then((hash) => {
            
            const sql = "INSERT INTO admin (First_name, Last_name, Email, Contact_No, Password) VALUES (?, ?, ?, ?, ?)";
            const values = [firstName, lastName, email, phoneNumber, hash];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error("Error inserting data: ", err.message);
                    return res.status(500).json({ error: err.message });
                }
                
                res.status(201).json({ message: "User registered successfully", userId: result.insertId });
            });
        })
        .catch((err) => {
            console.error("Error hashing password: ", err.message);
            res.status(500).json({ error: err.message });
        });
});

app.post('/login', (req, res) => {
    const { userEmail, password } = req.body;

    db.query('SELECT * FROM admin WHERE Email = ?', [userEmail], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length > 0) {
            const user = results[0];

            bcrypt.compare(password, user.Password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: "Error comparing passwords" });
                }
                if (isMatch) {
                    const accesstoken= jwt.sign({ userEmail: user.Email }, "default-secret", { expiresIn: '15m' });
                    const refreshtoken = jwt.sign({ userEmail: user.Email }, "default-secret", { expiresIn: '1d' });
                    res.cookie("accesstoken", accesstoken,{maxAge:900000});
                    res.cookie("refreshtoken", refreshtoken,{maxAge:86400000,secure:true,sameSite:'strict'})
                    res.status(200).json({ 
                        message: "success",
                        accesstoken: accesstoken,
                        user: { userId:user.Admin_ID, username: user.First_name, role: user.role, email: user.Email}
                    });
                } else {
                    res.status(401).json({ message: "The password is incorrect" });
                }
            });
        } else {
            res.status(404).json({ message: "No record found" });
        }
    });
});

app.get('/home',verifyUser,async(req,res)=>{
  try{
      return res.status(200).json({
          message:"success",
  })
  }catch(error){
      console.log(error.message);
      res.status(500).send({message:error.message})
  }
})

app.get('/', (req, res) => {
    return res.json("from the backend side");
});

// app.post('/addBook', (req, res) => {
//     const { bookName, author, category, publisher,isbn, pages,copies } = req.body;

//     // Start by inserting author, category, and book with related tables in a transaction
//     db.beginTransaction((err) => {
//         if (err) {
//             return res.status(500).json({ error: "Failed to start transaction" });
//         }

//         // Insert or find the author
//         const authorSql = 'INSERT INTO author (Author_ID) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)';
//         db.query(authorSql, [author], (err, authorResult) => {
//             if (err) {
//                 db.rollback(() => {
//                     return res.status(500).json({ error: "Error inserting or retrieving author" });
//                 });
//             }
//             const authorId = authorResult.insertId;

//             // Insert or find the category
//             const categorySql = 'INSERT INTO category (Category_name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)';
//             db.query(categorySql, [category], (err, categoryResult) => {
//                 if (err) {
//                     db.rollback(() => {
//                         return res.status(500).json({ error: "Error inserting or retrieving category" });
//                     });
//                 }
//                 const categoryId = categoryResult.insertId;

//                 // Insert the book into the `Books` table
//                 const bookSql = 'INSERT INTO book_title (Category_ID, Author_ID,Title_name,No_of_copies,ISBN_Number,NoOfPages,Status) VALUES (?, ?, ?, ?)';
//                 const bookValues = [categoryId,authorId,bookName,copies,isbn,pages,1];
//                 db.query(bookSql, bookValues, (err, bookResult) => {
//                     if (err) {
//                         db.rollback(() => {
//                             return res.status(500).json({ error: "Error inserting book" });
//                         });
//                     }
//                     const titleId = bookResult.insertId;

//                     // Insert into the `Inventory` table to track copies
//                     const inventorySql = 'INSERT INTO Inventory (Title_ID) VALUES (?)';
//                     const inventoryValues = [bookId];
//                     db.query(inventorySql, inventoryValues, (err, inventoryResult) => {
//                         if (err) {
//                             db.rollback(() => {
//                                 return res.status(500).json({ error: "Error inserting inventory" });
//                             });
//                         }

//                         const bookID = bookResult.insertId;

//                         // Commit the transaction
//                         db.commit((err) => {
//                             if (err) {
//                                 db.rollback(() => {
//                                     return res.status(500).json({ error: "Error committing transaction" });
//                                 });
//                             }

//                             res.status(201).json({ message: "Book added successfully", bookId: bookId });
//                         });
//                     });
//                 });
//             });
//         });
//     });
// });

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "Kalpana@1e2",
//     database: "library_system",
//   });

// // pool.query = util.promisify(pool.query);

// app.post('/addBook', async (req, res) => {
//     const { bookName, author, category, publisher, isbn, pages, copies } = req.body;
  
//     const connection = pool.getConnection();
  
//     try {
//       // Begin transaction
//       await connection.beginTransaction();
  
//       // Step 1: Insert or find the author
//       const [authorResult] = await connection.query(
//         'INSERT INTO author (Name) VALUES (?) ON DUPLICATE KEY UPDATE Author_ID=LAST_INSERT_ID(Author_ID)',
//         [author]
//       );
//       const authorId = authorResult.insertId;
  
//       // Step 2: Insert or find the category
//       const [categoryResult] = await connection.query(
//         'INSERT INTO category (Category_name) VALUES (?) ON DUPLICATE KEY UPDATE Category_ID=LAST_INSERT_ID(Category_ID)',
//         [category]
//       );
//       const categoryId = categoryResult.insertId;

//       // Step 3: Insert or find the category
//       const [publisherResult] = await connection.query(
//         'INSERT INTO publisher (Name) VALUES (?) ON DUPLICATE KEY UPDATE Publisher_ID=LAST_INSERT_ID(Publisher_ID)',
//         [publisher]
//       );
//       const publisherId = publisherResult.insertId;
  
//       // Step 4: Insert the book into the `Books` table
//       const bookSql = 'INSERT INTO book_title (Category_ID, Author_ID,Publisher_ID, Title_name, No_of_copies, ISBN_Number, NoOfPages, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
//       const [bookResult] = await connection.query(bookSql, [
//         categoryId,
//         authorId,
//         publisherId,
//         bookName,
//         copies,
//         isbn,
//         pages,
//         1,
//       ]);
//       const titleId = bookResult.insertId;
  
//       // Step 5: Insert into the `Inventory` table to track copies
//       const inventorySql = 'INSERT INTO book (Title_ID) VALUES (?)';
//       await connection.query(inventorySql, [titleId]);
  
//       // Commit the transaction
//       await connection.commit();
  
//       // Respond with success
//       res.status(201).json({ message: "success", bookId: titleId });
  
//     } catch (err) {
//       // Rollback the transaction in case of error
//       await connection.rollback();
//       console.error("Error adding book:", err.message);
//       res.status(500).json({ error: "Failed to add book" });
//     } finally {
//       // Release the connection
//       connection.release();
//     }
    
//   });

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Kalpana@1e2",
    database: "library_system",
});

app.post('/addBook', async (req, res) => {
    const { bookName, author, category, publisher, isbn, pages, copies } = req.body;

    const connection = await pool.promise().getConnection();
 
    try {
        // Begin transaction
        await connection.beginTransaction();

        // Step 1: Insert or find the author
        const [authorResult] = await connection.query(
            'INSERT INTO author (Name) VALUES (?) ON DUPLICATE KEY UPDATE Name=VALUES(Name)',
            [author]
        );
        const authorId = authorResult.insertId;

        // Step 2: Insert or find the category
        const [categoryResult] = await connection.query(
            'INSERT INTO category (Category_name) VALUES (?) ON DUPLICATE KEY UPDATE Category_name=VALUES(Category_name)',
            [category]
        );
        const categoryId = categoryResult.insertId;

        // Step 3: Insert or find the publisher
        const [publisherResult] = await connection.query(
            'INSERT INTO publisher (Name) VALUES (?) ON DUPLICATE KEY UPDATE Name=VALUES(Name)',
            [publisher]
        );
        const publisherId = publisherResult.insertId;

        // Step 4: Insert the book into the `book_title` table
        const bookSql = 'INSERT INTO book_title (Category_ID, Author_ID, Publisher_ID, Title_name, No_of_copies, ISBN_Number, NoOfPages, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [bookResult] = await connection.query(bookSql, [
            categoryId,
            authorId,
            publisherId,
            bookName,
            copies,
            isbn,
            pages,
            1, // Status for available book
        ]);
        const titleId = bookResult.insertId;

        // Step 5: Insert into the `book` table to track copies
        const inventorySql = 'INSERT INTO book (Title_ID) VALUES (?)';
        await connection.query(inventorySql, [titleId]);

        // Commit the transaction
        await connection.commit();

        // Respond with success
        res.status(201).json({ message: "success", bookId: titleId });

    } catch (err) {
        // Rollback the transaction in case of error
        await connection.rollback();
        console.error("Error adding book:", err.message);
        res.status(500).json({ error: "Failed to add book" });
    } finally {
        // Release the connection
        connection.release();
    }
});

app.get('/getBooks', async (req, res) => {
    const connection = await pool.promise().getConnection();

    try {
        const sql = `
            SELECT 
                a.Title_name,
                b.Name AS Author,
                a.Title_ID,
                a.Img_url
            FROM book_title a
            JOIN author b ON b.Author_ID = a.Author_ID
        `;

        const [books] = await connection.query(sql);

        if (books.length === 0) {
            return res.status(404).json({ message: "No books found." });
        }

        res.status(200).json(books);

    } catch (err) {
        console.error("Error fetching books:", err.message);
        res.status(500).json({ error: "Failed to fetch books." });
    } finally {
        connection.release();
    }
});

app.get('/getBook/:id', async (req, res) => {
    const { id } = req.params; // Extract the Title_ID from the route parameters
    const connection = await pool.promise().getConnection();

    try {
        const sql = `
           SELECT 
                a.Title_name,
                b.Name AS Author,
                c.Category_name,
                d.Name AS Publisher_name,
                a.ISBN_Number,
                a.NoOfPages,
                a.No_of_copies,
                a.Img_url,
                a.Status

            FROM 
                book_title a
            JOIN 
                author b ON b.Author_ID = a.Author_ID
            JOIN 
                category c ON c.Category_ID = a.Category_ID -- Join with the category table
            JOIN 
                publisher d ON d.Publisher_ID = a.Publisher_ID -- Join with the publisher table
            WHERE 
                a.Title_ID = ?

        `;

        const [book] = await connection.query(sql, [id]);

        if (book.length === 0) {
            return res.status(404).json({ message: "Book not found." });
        }

        res.status(200).json(book[0]); // Return the single book object

    } catch (err) {
        console.error("Error fetching book:", err.message);
        res.status(500).json({ error: "Failed to fetch book." });
    } finally {
        connection.release();
    }
});

// Express route to edit a book
app.put('/editBook/:id', async (req, res) => {
    const connection = await pool.promise().getConnection();
    const { id } = req.params; // Title_ID
    const {
        bookName,   // New book title
        author,    // New author ID
        category,  // New category ID
        isbn, // New publisher ID
        publisher,
        pages,
        copies      // New image URL
    } = req.body;    // Assume these details come from the frontend

    try {
        // SQL query to update book details
        const sql = `
            UPDATE book_title
            SET 
                Title_name = ?, 
                Author_ID = (SELECT Author_ID FROM author WHERE Name = ?), 
                Category_ID = (SELECT Category_ID FROM category WHERE Category_name = ?), 
                Publisher_ID = (SELECT Publisher_ID FROM publisher WHERE Name = ?),
                ISBN_Number = ?,
                NoOfPages = ?,
                No_of_copies = ?
            WHERE 
                Title_ID = ?
        `;

        const values = [bookName, author, category, publisher, isbn, pages,copies,id];

        const [result] = await connection.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found." });
        }

        res.status(200).json({ message: "Book updated successfully." });

    } catch (err) {
        console.error("Error updating book:", err.message);
        res.status(500).json({ error: "Failed to update book." });
    } finally {
        connection.release();
    }
});


app.delete('/deleteBook/:id', async (req, res) => {
    const { id } = req.params; // Book Title ID

    const connection = await pool.promise().getConnection();

    try {
        // Begin transaction
        await connection.beginTransaction();

        // Step 1: Delete the record from the `book_title` table
        const deleteBookTitleSql = 'DELETE FROM book_title WHERE Title_ID = ?';
        const [deleteResult] = await connection.query(deleteBookTitleSql, [id]);

        // Step 2: Delete the records from the `book` table where the Title_ID matches
        const deleteBooksSql = 'DELETE FROM book WHERE Title_ID = ?';
        await connection.query(deleteBooksSql, [id]);


        if (deleteResult.affectedRows === 0) {
            // If no rows were affected, the book was not found
            await connection.rollback();
            return res.status(404).json({ message: "Book not found." });
        }

        // Commit the transaction
        await connection.commit();

        // Respond with success
        res.status(200).json({ message: "Book deleted successfully." });

    } catch (err) {
        // Rollback the transaction in case of error
        await connection.rollback();
        console.error("Error deleting book:", err.message);
        res.status(500).json({ error: "Failed to delete book." });
    } finally {
        // Release the connection
        connection.release();
    }
});

app.post('/addAuthor', async (req, res) => {
    const { authorName ,county } = req.body;  // Assuming you get the author's name from the request body

    const connection = await pool.promise().getConnection();

    try {
        // Begin transaction
        await connection.beginTransaction();

        // Step 1: Insert the author or update if it already exists
        const [authorResult] = await connection.query(
            'INSERT INTO author (Name,Country) VALUES (?,?) ON DUPLICATE KEY UPDATE Name=VALUES(Name)',
            [authorName,county]
        );
        const authorId = authorResult.insertId || authorResult.Author_ID;

        // Commit the transaction
        await connection.commit();

        // Respond with success
        res.status(201).json({ message: "Author added successfully", authorId });

    } catch (err) {
        // Rollback the transaction in case of error
        await connection.rollback();
        console.error("Error adding author:", err.message);
        res.status(500).json({ error: "Failed to add author" });
    } finally {
        // Release the connection
        connection.release();
    }
});

app.delete('/deleteAuthor/:id', async (req, res) => {
    const { id } = req.params; // Author ID

    const connection = await pool.promise().getConnection();

    try {
        // Begin transaction
        await connection.beginTransaction();

        // Step 1: Delete the record from the `author` table
        const deleteAuthorSql = 'DELETE FROM author WHERE Author_ID = ?';
        const [deleteResult] = await connection.query(deleteAuthorSql, [id]);

        if (deleteResult.affectedRows === 0) {
            // If no rows were affected, the author was not found
            await connection.rollback();
            return res.status(404).json({ message: "Author not found." });
        }

        // Commit the transaction
        await connection.commit();

        // Respond with success
        res.status(200).json({ message: "Author deleted successfully." });

    } catch (err) {
        // Rollback the transaction in case of error
        await connection.rollback();
        console.error("Error deleting author:", err.message);
        res.status(500).json({ error: "Failed to delete author." });
    } finally {
        // Release the connection
        connection.release();
    }
});


app.get('/getAuthors', async (req, res) => {
    const connection = await pool.promise().getConnection();

    try {
        const sql = `
            SELECT 
                Img_url,
                Author_ID,
                Country,
                Name
            FROM author
        `;

        const [authors] = await connection.query(sql);

        if (authors.length === 0) {
            return res.status(404).json({ message: "No authors found." });
        }

        res.status(200).json(authors);

    } catch (err) {
        console.error("Error fetching authors:", err.message);
        res.status(500).json({ error: "Failed to fetch authors." });
    } finally {
        connection.release();
    }
});

// Express route to edit an author
app.put('/editAuthor/:id', async (req, res) => {
    const connection = await pool.promise().getConnection();
    const { id } = req.params; // Author_ID
    const { author_name, country } = req.body; // New author name and country from frontend

    try {
        // SQL query to update author details
        const sql = `
            UPDATE author
            SET 
                Name = ?, 
                Country = ?
            WHERE 
                Author_ID = ?
        `;

        const values = [author_name, country, id];

        const [result] = await connection.query(sql, values);

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Author not found." });
        }

        // If author updated successfully
        res.status(200).json({ message: "Author updated successfully." });

    } catch (err) {
        // Handle any errors during the update process
        console.error("Error updating author:", err.message);
        res.status(500).json({ error: "Failed to update author." });
    } finally {
        // Release the connection back to the pool
        connection.release();
    }
});


app.post('/addPublisher', async (req, res) => {
    const { publisherName,country } = req.body;  // Assuming you get the publisher's name from the request body

    const connection = await pool.promise().getConnection();

    try {
        // Begin transaction
        await connection.beginTransaction();

        // Step 1: Insert the publisher or update if it already exists
        const [publisherResult] = await connection.query(
            'INSERT INTO publisher (Name,country) VALUES (?) ON DUPLICATE KEY UPDATE Name=VALUES(Name)',
            [publisherName,country]
        );
        const publisherId = publisherResult.insertId || publisherResult.Publisher_ID;

        // Commit the transaction
        await connection.commit();

        // Respond with success
        res.status(201).json({ message: "Publisher added successfully", publisherId });

    } catch (err) {
        // Rollback the transaction in case of error
        await connection.rollback();
        console.error("Error adding publisher:", err.message);
        res.status(500).json({ error: "Failed to add publisher" });
    } finally {
        // Release the connection
        connection.release();
    }
});

app.delete('/deletePublisher/:id', async (req, res) => {
    const { id } = req.params; // Publisher ID

    const connection = await pool.promise().getConnection();

    try {
        // Begin transaction
        await connection.beginTransaction();

        // Step 1: Delete the record from the `publisher` table
        const deletePublisherSql = 'DELETE FROM publisher WHERE Publisher_ID = ?';
        const [deleteResult] = await connection.query(deletePublisherSql, [id]);

        if (deleteResult.affectedRows === 0) {
            // If no rows were affected, the publisher was not found
            await connection.rollback();
            return res.status(404).json({ message: "Publisher not found." });
        }

        // Commit the transaction
        await connection.commit();

        // Respond with success
        res.status(200).json({ message: "Publisher deleted successfully." });

    } catch (err) {
        // Rollback the transaction in case of error
        await connection.rollback();
        console.error("Error deleting publisher:", err.message);
        res.status(500).json({ error: "Failed to delete publisher." });
    } finally {
        // Release the connection
        connection.release();
    }
});

app.get('/getPublishers', async (req, res) => {
    const connection = await pool.promise().getConnection();

    try {
        const sql = `
            SELECT 
                Publisher_ID,
                Country,
                Name 
            FROM publisher
        `;

        const [publishers] = await connection.query(sql);

        if (publishers.length === 0) {
            return res.status(404).json({ message: "No publishers found." });
        }

        res.status(200).json(publishers);

    } catch (err) {
        console.error("Error fetching publishers:", err.message);
        res.status(500).json({ error: "Failed to fetch publishers." });
    } finally {
        connection.release();
    }
});

app.post('/logout', (req, res) => {
    // Clear HttpOnly cookies by setting them to expire in the past
    res.cookie('refreshtoken', '', { expires: new Date(0), httpOnly: true, path: '/' });
    // Send a response indicating successful logout
    res.json({ message: 'Logged out successfully' });
    // .status(200)
  });






  //sageeth's backend
// import express from 'express'
// import mysql from 'mysql2'
// import cors from 'cors'

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "ILMS",
//     database: "library_system"
// })

// // Check MySQL connection
// {/*
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to MySQL database');
// });
// */}

app.get('/user/:id', async(req, res) => {
    const connection = await pool.promise().getConnection();
    try{
        const sql = "SELECT * FROM admin WHERE Admin_ID = ? AND role = 'user'";
        const id = req.params.id;
        const [user] = await connection.query(sql,[id]);
    
    if (user.length === 0) {
        return res.status(404).json({ message: "No publishers found." });
    }

    res.status(200).json(user[0]);

    } catch (err) {
        console.error("Error fetching user:", err.message);
        res.status(500).json({ error: "Failed to fetch user." });
    } finally {
        connection.release();
    }
    
})

// app.get('/book/:id', (req, res) => {
//     const sql = "SELECT * FROM book title INNER JOIN author ON book title.Author_ID = author.Author_ID WHERE book title.Title_ID = ?";
//     const id = req.params.id;
    
//     db.query(sql, [id], (err, result) => {
//         if(err) return res.json({Message: "Error inside server"});
//         return res.json(result);
//     })
// })

app.get('/issueDetails', async(req, res) => {
    const connection = await pool.promise().getConnection();
    try{
        const sql = "SELECT * FROM issuebook WHERE Member_ID = ? AND Book_ID = ? AND Returned_Date IS NULL";
        const customerId = req.query.customerId;
        const bookId = req.query.bookId;
        const [result] = await connection.query(sql,[customerId, bookId])
        res.json(result[0])
    }catch (err) {
        console.error("Error fetching issued books:", err.message);
        res.status(500).json({ error: "Failed to fetch issued books."});
    } finally {
        connection.release();
    }
})


app.post('/issue', async(req, res) => {
    const connection = await pool.promise().getConnection();
    try{
        const { Admin_ID, customerId, bookId, Issued_Date } = req.body;
        const sql = "INSERT INTO issuebook (Admin_ID, Member_ID, Book_ID, Issued_Date) VALUES (?, ?, ?, ?)";
        const [result] = await connection.query(sql,[Admin_ID, customerId, bookId, Issued_Date])
        res.json({ Message: "Book issued", data: result })
    } catch (err) {
        console.error("Error fetching user:", err.message);
        res.status(500).json({ error: "Failed to fetch user."});
    } finally {
        connection.release();
    }
    
})

app.post('/returnbook', async(req, res) => {
    const connection = await pool.promise().getConnection();
    try{
        const { id, date,fine } = req.body;
        const sql = "UPDATE issuebook SET Returned_Date = ?,Fine = ? WHERE Issue_ID = ? AND Returned_Date IS NULL";
        const [result] = await connection.query(sql,[date,fine,id])
        res.json({ Message: "Book returned", data: result })
    }catch (err) {
        console.error("Error returning book", err.message);
        res.status(500).json({ error: "Failed to return book"});
    } finally {
        connection.release();
    }

})








app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
