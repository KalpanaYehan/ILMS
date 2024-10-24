import { pool } from "../index.js";

// Endpoint to get the most popular categories within the nearest year
export const getPopularCategoriesByYear = async (req, res) => {
  const connection = await pool.promise().getConnection();

  try {
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

    const [results] = await connection.query(query);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).send("Error executing query");
  } finally {
    connection.release();
  }
};

// Endpoint to get the most popular categories within the nearest month
export const getPopularCategoriesByMonth = async (req, res) => {
  const connection = await pool.promise().getConnection();

  try {
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

    const [results] = await connection.query(query);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).send("Error executing query");
  } finally {
    connection.release();
  }
};

// Endpoint to get the most popular categories within the nearest week
export const getPopularCategoriesByWeek = async (req, res) => {
  const connection = await pool.promise().getConnection();

  try {
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

    const [results] = await connection.query(query);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).send("Error executing query");
  } finally {
    connection.release();
  }
};

// Endpoint to get the top 6 popular authors within the nearest year
export const getPopularAuthorsByYear = async (req, res) => {
  const connection = await pool.promise().getConnection();

  try {
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

    const [results] = await connection.query(query);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).send("Error executing query");
  } finally {
    connection.release();
  }
};

// Endpoint to get the top 6 popular authors within the nearest month
export const getPopularAuthorsByMonth = async (req, res) => {
  const connection = await pool.promise().getConnection();

  try {
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

    const [results] = await connection.query(query);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).send("Error executing query");
  } finally {
    connection.release();
  }
};

// Endpoint to get the top 6 popular authors within the nearest week
export const getPopularAuthorsByWeek = async (req, res) => {
  const connection = await pool.promise().getConnection();

  try {
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

    const [results] = await connection.query(query);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).send("Error executing query");
  } finally {
    connection.release();
  }
};
