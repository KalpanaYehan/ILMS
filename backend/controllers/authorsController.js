import { pool } from "../index.js";

export const addAuthor = async (req, res) => {
    const { authorName ,country,Img_url } = req.body;  // Assuming you get the author's name from the request body

    const connection = await pool.promise().getConnection();

    try {
        // Begin transaction
        await connection.beginTransaction();

        // Step 1: Insert the author or update if it already exists
        const [authorResult] = await connection.query(
            'INSERT INTO author (Name,Country,Img_url) VALUES (?,?,?) ON DUPLICATE KEY UPDATE Name=VALUES(Name)',
            [authorName,country,Img_url]
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
}
export const getAuthors = async (req, res) => {
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
}
export const getAuthorById = async (req, res) => {
    const { id } = req.params; // Extract the Title_ID from the route parameters
    const connection = await pool.promise().getConnection();

    try {
        const sql = `
           SELECT 
                Author_ID,
                Name,
                Country,
                Img_url

            FROM 
                author
            WHERE 
                Author_ID = ?

        `;

        const [author] = await connection.query(sql, [id]);

        if (author.length === 0) {
            return res.status(404).json({ message: "Author not found." });
        }

        res.status(200).json(author[0]); // Return the single book object

    } catch (err) {
        console.error("Error fetching author:", err.message);
        res.status(500).json({ error: "Failed to fetch author." });
    } finally {
        connection.release();
    }
}
export const editAuthor = async (req, res) => { 
    const connection = await pool.promise().getConnection();
    const { id } = req.params; // Author_ID
    const { authorName, country,Img_url } = req.body; // New author name and country from frontend

    try {
        // SQL query to update author details
        const sql = `
            UPDATE author
            SET 
                Name = ?, 
                Country = ?,
                Img_url = ?
            WHERE 
                Author_ID = ?
        `;

        const values = [authorName, country,Img_url, id];

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
}
export const deleteAuthor = async (req, res) => {
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
}