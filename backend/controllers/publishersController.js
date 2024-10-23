import { pool } from "../index.js";

export const addPublisher = async (req, res) => {
    const { publisherName,location } = req.body;  // Assuming you get the publisher's name from the request body

    const connection = await pool.promise().getConnection();

    try {
        // Begin transaction
        await connection.beginTransaction();

        // Step 1: Insert the publisher or update if it already exists
        const [publisherResult] = await connection.query(
            'INSERT INTO publisher (Name,Location) VALUES (?,?) ON DUPLICATE KEY UPDATE Name=VALUES(Name)',
            [publisherName,location]
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
}
export const getPublishers = async (req, res) => {
    const connection = await pool.promise().getConnection();

    try {
        const sql = `
            SELECT 
                Publisher_ID,
                Location,
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
}
export const getPublisherById = async (req, res) => {
    const { id } = req.params; // Extract the Title_ID from the route parameters
    const connection = await pool.promise().getConnection();

    try {
        const sql = `
           SELECT 
                Publisher_ID,
                Name,
                Location
            FROM 
                publisher
            WHERE 
                Publisher_ID = ?

        `;

        const [publisher] = await connection.query(sql, [id]);

        if (publisher.length === 0) {
            return res.status(404).json({ message: "Publisher not found." });
        }

        res.status(200).json(publisher[0]); // Return the single book object

    } catch (err) {
        console.error("Error fetching publisher:", err.message);
        res.status(500).json({ error: "Failed to fetch publisher." });
    } finally {
        connection.release();
    }
}
export const editPublisher = async (req, res) => { 
    const connection = await pool.promise().getConnection();
    const { id } = req.params; // Publisher_ID
    const { publisherName, location} = req.body; // New publisher details from frontend

    try {
        // SQL query to update publisher details
        const sql = `
            UPDATE publisher
            SET 
                Name = ?, 
                Location = ?
            WHERE 
                Publisher_ID = ?
        `;

        const values = [publisherName, location, id];

        const [result] = await connection.query(sql, values);

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Publisher not found." });
        }

        // If publisher updated successfully
        res.status(200).json({ message: "Publisher updated successfully." });

    } catch (err) {
        // Handle any errors during the update process
        console.error("Error updating publisher:", err.message);
        res.status(500).json({ error: "Failed to update publisher." });
    } finally {
        // Release the connection back to the pool
        connection.release();
    }
}
export const deletePublisher = async (req, res) => {
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
}