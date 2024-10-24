import { pool } from "../index.js";

// Endpoint to get the number of books in each category
export const getBookCountByCategory = async (req, res) => {
    const connection = await pool.promise().getConnection();
  
    try {
      const query = `
        SELECT c.Category_name AS CategoryName, SUM(bt.No_of_copies) AS BookCount
        FROM category c
        LEFT JOIN book_title bt ON c.Category_ID = bt.Category_ID
        GROUP BY c.Category_name
      `;
  
      const [result] = await connection.query(query);
  
      res.status(200).json(result);
    } catch (err) {
      console.error("Error getting book count by category:", err.message);
      res.status(500).send("Error getting book count by category");
    } finally {
      connection.release();
    }
  };

// Endpoint to get overdue books
export const getOverdueBooks = async (req, res) => {
    const connection = await pool.promise().getConnection();
  
    try {
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
  
      const [result] = await connection.query(query);
  
      res.status(200).json(result);
    } catch (err) {
      console.error("Error getting overdue books:", err.message);
      res.status(500).send("Error getting overdue books");
    } finally {
      connection.release();
    }
  };

  // Endpoint to get the total number of books issued according to year
  export const getBookAcquisitionByYear = async (req, res) => {
    const { year } = req.query;
    const connection = await pool.promise().getConnection();
  
    try {
      const query = `
        SELECT MONTH(Issued_Date) AS month, COUNT(*) AS total
        FROM issuebook
        WHERE YEAR(Issued_Date) = ?
        GROUP BY MONTH(Issued_Date)
        ORDER BY MONTH(Issued_Date)
      `;
  
      const [results] = await connection.query(query, [year]);
  
      res.status(200).json(results);
    } catch (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error executing query');
    } finally {
      connection.release();
    }
  };
  
// Endpoint to get the total number of books in the library
export const getTotalBooks = async (req, res) => {
    const connection = await pool.promise().getConnection();
  
    try {
      const query = `
        SELECT SUM(No_of_copies) AS totalBooks
        FROM book_title
      `;
  
      const [results] = await connection.query(query);
  
      res.status(200).json(results[0]);
    } catch (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error executing query');
    } finally {
      connection.release();
    }
  };
  
  // Endpoint to get the total number of members where role is equal to user
  export const getTotalUsers = async (req, res) => {
    const connection = await pool.promise().getConnection();
  
    try {
      const query = `
        SELECT COUNT(*) AS totalMembers
        FROM member
        WHERE Role = 'user'
      `;
  
      const [results] = await connection.query(query);
  
      res.status(200).json(results[0]);
    } catch (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error executing query');
    } finally {
      connection.release();
    }
  };
  
