import { pool } from "../index.js";

// Get all reviews
export const getReviews = async (req, res) => {
  // get a connection to the database
  const connection = await pool.promise().getConnection();  

  try {
    // SQL query to get all reviews
    const sql = "SELECT * FROM review";  
    
    // execute the query
    const [reviews] = await connection.query(sql);  

    // if no reviews are found, return a 404 error
    if (reviews.length === 0) {                 
      return res.status(404).json({ message: "No reviews found." });
    }
    // if reviews are found, return them
    res.status(200).json(reviews);

    // if an error occurs, log the error and return a 500 error
  } catch (err) {
    console.error("Error getting reviews:", err.message);
    res.status(500).json({ error: "Error getting reviews" });

    // release the connection back to the pool
  } finally {
    connection.release();
  }
};

// Get reviews by title id
export const getReviewsByTitleId = async (req, res) => {
  const connection = await pool.promise().getConnection();
  const { title_id } = req.params;

  try {
    const sql = `
            SELECT review.*, member.First_Name, member.Last_Name,
                   DATE_FORMAT(review.Review_Date, '%Y-%m-%d') AS Review_date
            FROM review
            JOIN member ON review.Member_ID = member.Member_ID
            WHERE review.Title_ID = ?
        `;
    const [reviews] = await connection.query(sql, [title_id]);

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this title." });
    }

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error getting reviews:", err.message);
    res.status(500).json({ error: "Error getting reviews" });
  } finally {
    connection.release();
  }
};

// Add a review
export const addReview = async (req, res) => {
  const { Title_ID, Member_ID, Rating, Review_Text, Review_Date } = req.body;
  const connection = await pool.promise().getConnection();

  try {
    const query = `INSERT INTO review (Title_ID, Member_ID, Rating, Review_Text, Review_Date) 
                       VALUES (?, ?, ?, ?, ?)`;
    console.log(query);
    const values = [Title_ID, Member_ID, Rating, Review_Text, Review_Date];

    const [result] = await connection.query(query, values);

    res.status(201).json({
      message: "Review added successfully",
      reviewId: result.insertId,
    });
  } catch (err) {
    console.error("Error adding review:", err.message);
    res.status(500).json({ error: "Error adding review" });
  } finally {
    connection.release();
  }
};


// Delete a review
export const deleteReview = async (req,res) => {
    const { review_id } = req.params;
    const connection = await pool.promise().getConnection();

    try {
        const sql = `DELETE FROM review WHERE Review_ID = ?`;
        await connection.query(sql, [review_id]);

        res.status(200).json({ message: "Review deleted successfully" });  
    } catch (err) {
        console.error("Error deleting review:", err.message);
        res.status(500).json({ error: "Error deleting review" });
    } finally {
        connection.release();
    }
};

// Get reviews by user
export const getReviewsByUser = async (req, res) => {
    const { id } = req.params;
    const connection = await pool.promise().getConnection();
  
    try {
      const sql = `
          SELECT 
          review.Review_ID,
          review.Rating,
          review.Review_Text,
          DATE_FORMAT(review.Review_Date, '%Y-%m-%d') AS Review_Date,
          book_title.Title_name
          FROM review
          JOIN book_title ON review.Title_ID = book_title.Title_ID
          WHERE review.Member_ID = ?
      `;
      const [result] = await connection.query(sql, [id]);
  
      if (result.length === 0) {
        return res.status(200).json({ message: "No reviews found." });
      }
  
      res.status(200).json(result);
    } catch (err) {
      console.error("Error fetching reviews:", err.message);
      res.status(500).json({ error: "Failed to fetch reviews." });
    } finally {
      connection.release();
    }
  };

// Edit a review
export const editReview = async (req, res) => {
    const { id } = req.params;
    const { Rating, Review_Text, Review_Date } = req.body;
    const connection = await pool.promise().getConnection();
  
    try {
      const query = `
        UPDATE review
        SET 
          Rating = ?,
          Review_Text = ?,
          Review_Date = ?
        WHERE Review_ID = ?
      `;
      const values = [Rating, Review_Text, Review_Date, id];
  
      const [result] = await connection.query(query, values);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      res.status(200).json({ message: "Review updated successfully" });
    } catch (err) {
      console.error("Error updating review:", err.message);
      res.status(500).json({ error: "Error updating review" });
    } finally {
      connection.release();
    }
  };
