import { pool } from "../index.js";

export const addBook = async (req, res) => {
    const { bookName, author, category, publisher, isbn, pages, copies, Img_url } = req.body;

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
        const bookSql = 'INSERT INTO book_title (Category_ID, Author_ID, Publisher_ID, Title_name, No_of_copies, ISBN_Number, NoOfPages, Status, Img_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [bookResult] = await connection.query(bookSql, [
            categoryId,
            authorId,
            publisherId,
            bookName,
            copies,
            isbn,
            pages,
            1, // Status for available book
            Img_url,
        ]);
        const titleId = bookResult.insertId;

        // Step 5: Insert into the `book` table to track copies
        // const inventorySql = 'INSERT INTO book (Title_ID) VALUES (?)';
        // await connection.query(inventorySql, [titleId]);

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
}
export const getBooks = async (req, res) => {
    const connection = await pool.promise().getConnection();

    try {
        const sql = `
            SELECT 
            
                a.Title_name,
                b.Name AS Author,
                a.Title_ID,
                a.Img_url,
                a.Status
            FROM book_title a
            JOIN author b ON b.Author_ID = a.Author_ID
            order by a.Title_ID
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
}
export const getBookById = async (req, res) => {
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
}
export const editBook = async (req, res) => {
    const connection = await pool.promise().getConnection();
    const { id } = req.params; // Title_ID
    const {
        bookName,   // New book title
        author,    // New author ID
        category,  // New category ID
        isbn, // New publisher ID
        publisher,
        pages,
        copies,
        Img_url      // New image URL
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
                No_of_copies = ?,
                Img_url = ?
            WHERE 
                Title_ID = ?
        `;

        const values = [bookName, author, category, publisher, isbn, pages,copies,Img_url,id];

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
}
export const deleteBook = async (req, res) => {
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
}