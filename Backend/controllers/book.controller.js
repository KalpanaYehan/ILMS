import mysql from 'mysql2';
import db from '../index.js';


// Get all books
export const getBooks = (req, res) => { 
    const sql = 'SELECT * FROM BookTitle';

    db.query(sql, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Internal server error' });
        } 
          return res.status(200).json(result);
      } ); 

};

// Get a book by Title_ID
export const getBook = (req, res) => { 
  const titleId = req.params.id;  
  const sql = `SELECT bt.Title_name AS 'Book Title',
            a.Name AS 'Author Name',
            c.Category_name AS 'Category Name',
            p.Name AS 'Publisher Name',
            bt.ISBN_Number AS 'ISBN Number',
            bt.Status AS 'Status'
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

  db.query(sql, [titleId], (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Internal server error' });
      } 

      if (result.length === 0) {
          return res.status(404).json({ message: 'Book not found' });
      }

      return res.status(200).json(result);
  }); 
};