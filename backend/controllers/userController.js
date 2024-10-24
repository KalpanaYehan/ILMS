import { pool } from "../index.js";

// Function to get user details by ID
export const getUserById = async (req, res) => {
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
};

export const getBookById = (req, res) => {
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
};

export const getIssueDetails = async (req, res) => {
  const connection = await pool.promise().getConnection();
  try {
    const sql =
      "SELECT * FROM issuebook WHERE Member_ID = ? AND Book_ID = ? AND Returned_Date IS NULL";
    const userId = req.query.userId; // Get userId from query parameters
    const bookId = req.query.bookId; // Get bookId from query parameters
    const [result] = await connection.query(sql, [userId, bookId]);
    res.json(result);
  } catch (err) {
    console.error("Error fetching issued books:", err.message);
    res.status(500).json({ error: "Failed to fetch issued books." });
  } finally {
    connection.release();
  }
};

export const postIssueDetails = async (req, res) => {
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
};

export const returnBook = async (req, res) => {
  const connection = await pool.promise().getConnection();
  try {
    const { bookId, userId } = req.body;
    // console.log(req.body);
    const sql = "CALL UpdateReturnedDate(?, ?)";
    const [result] = await connection.query(sql, [bookId, userId]);
    res.json({ Message: "Book returned", data: result });
  } catch (err) {
    console.error("Error returning book", err.message);
    res.status(500).json({ error: "Failed to return book" });
  } finally {
    connection.release();
  }
};
