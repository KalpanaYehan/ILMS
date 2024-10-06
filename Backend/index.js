import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express(); // create express app
app.use(cors()); // enable cors.

//middleware
app.use(express.json()); // enable json data in request body

// create connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "praboJ1026",
  database: "librarysystem",
});

// connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database.");
});

//getting book through title_id
app.get("/books/:id", (req, res) => {
  // get the title id from the request
  const titleId = req.params.id;
  // sql query to get the book details
  const sql = `SELECT bt.Title_name AS 'BookTitle',
            a.Name AS 'AuthorName',
            c.Category_name AS 'CategoryName',
            p.Name AS 'PublisherName',
            bt.ISBN_Number AS 'ISBNNumber',
            bt.Status AS 'Status',
            bt.NoOfPages AS 'NoOfPages',
            bt.Ave_Rate AS 'AverageRating'
        FROM 
            BookTitle bt
        JOIN 
            Author a ON bt.Author_ID = a.Author_ID
        JOIN 
            Category c ON bt.Category_ID = c.Category_ID
        JOIN 
            Publisher p ON bt.Publisher_ID = p.Publisher_ID
        WHERE 
            bt.Title_ID = ?`;

  // execute the sql query
  db.query(sql, [titleId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(result);
  });
});

//getting all the reviews
app.get("/reviews", (req, res) => {
  db.query("SELECT * FROM Review", (err, result) => {
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
  db.query(
    `SELECT Review.*, Member.First_Name, Member.Last_Name
     FROM Review
     JOIN Member ON Review.Member_ID = Member.Member_ID
     WHERE Review.Title_ID = ?`,
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

  const query = `INSERT INTO Review (Title_ID, Member_ID, Rating, Review_Text, Review_Date) 
                 VALUES (?, ?, ?, ?, ?)`;
  console.log(query);

  const values = [Title_ID, Member_ID, Rating, Review_Text, Review_Date];

  db.execute(query, values, (err, result) => {
    if (err) {
      console.error("Error adding review:", err);
      return res.status(500).json({ message: "Error adding review" });
    }

    // Return success response
    console.log("Review added successfully");
    res
      .status(201)
      .json({
        message: "Review added successfully",
        reviewId: result.insertId,
      });
  });
});

//deleting a review
app.delete("/reviews/:review_id", (req, res) => {
  db.query(
    "DELETE FROM Review WHERE review_id = ?",
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

// Endpoint to get the number of books in each category
app.get("/categories/book-count", (req, res) => {
  const query = `
    SELECT c.Category_name AS CategoryName, COUNT(bt.Title_ID) AS BookCount
    FROM Category c
    LEFT JOIN BookTitle bt ON c.Category_ID = bt.Category_ID
    GROUP BY c.Category_name
  `;

  db.query(query, (err, result) => {
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
      IssueBook ib
    JOIN 
      Member m ON ib.Member_ID = m.Member_ID
    JOIN 
      BookTitle bt ON ib.Title_ID = bt.Title_ID
    JOIN 
      Category c ON bt.Category_ID = c.Category_ID
    WHERE 
      ib.Returned_Date IS NULL
      AND DATEDIFF(CURDATE(), ib.Issued_Date) > 14
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error getting overdue books:", err.message);
      res.status(500).send("Error getting overdue books");
      return;
    }
    res.json(result);
  });
});

// Endpoint to get the total number of books issued according to year
app.get('/book-acquisition', (req, res) => {
  const { year } = req.query;

  const query = `
    SELECT MONTH(Issued_Date) AS month, COUNT(*) AS total
    FROM IssueBook
    WHERE YEAR(Issued_Date) = ?
    GROUP BY MONTH(Issued_Date)
    ORDER BY MONTH(Issued_Date)
  `;

  db.query(query, [year], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

// Endpoint to get the total number of books in the library
app.get('/total-books', (req, res) => {
  const query = `
    SELECT SUM(No_of_copies) AS totalBooks
    FROM BookTitle
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results[0]);
  });
}); 

// Endpoint to get the total number of members
app.get('/total-members', (req, res) => {
  const query = `
    SELECT COUNT(*) AS totalMembers
    FROM Member
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint to get the most popular categories within the nearest year
app.get('/popular-categories/year', (req, res) => {
  const query = `
    SELECT c.Category_name, COUNT(*) AS borrowCount
    FROM IssueBook ib
    JOIN BookTitle bt ON ib.Title_ID = bt.Title_ID
    JOIN Category c ON bt.Category_ID = c.Category_ID
    WHERE ib.Issued_Date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
    GROUP BY c.Category_name
    ORDER BY borrowCount DESC
    LIMIT 10
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

// Endpoint to get the most popular categories within the nearest month
app.get('/popular-categories/month', (req, res) => {
  const query = `
    SELECT c.Category_name, COUNT(*) AS borrowCount
    FROM IssueBook ib
    JOIN BookTitle bt ON ib.Title_ID = bt.Title_ID
    JOIN Category c ON bt.Category_ID = c.Category_ID
    WHERE ib.Issued_Date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
    GROUP BY c.Category_name
    ORDER BY borrowCount DESC
    LIMIT 10
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

// Endpoint to get the most popular categories within the nearest week
app.get('/popular-categories/week', (req, res) => {
  const query = `
    SELECT c.Category_name, COUNT(*) AS borrowCount
    FROM IssueBook ib
    JOIN BookTitle bt ON ib.Title_ID = bt.Title_ID
    JOIN Category c ON bt.Category_ID = c.Category_ID
    WHERE ib.Issued_Date >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)
    GROUP BY c.Category_name
    ORDER BY borrowCount DESC
    LIMIT 10
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});



app.listen(8081, () => {
  console.log("Listning on port 8081");
});
