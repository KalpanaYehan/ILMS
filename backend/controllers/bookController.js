import { pool } from "../index.js";

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
