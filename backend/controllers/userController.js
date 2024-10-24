import { pool } from "../index.js";

// Function to get user details by ID
export const getUserById = async (req, res) => {
  const { id } = req.params; // Extract the user ID from the route parameters
  const connection = await pool.promise().getConnection();

  try {
    const sql = `
      SELECT 
        First_name,
        Last_name,
        Email,
        Contact_No
      FROM 
        member
      WHERE 
        Member_ID = ?
    `;

    const [user] = await connection.query(sql, [id]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user[0]); // Return the single user object

  } catch (err) {
    console.error("Error fetching user details:", err.message);
    res.status(500).json({ error: "Failed to fetch user details" });
  } finally {
    connection.release();
  }
};