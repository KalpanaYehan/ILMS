import React, { useState } from 'react';
import axios from 'axios';

function AddReview({ titleId, memberName, onClose, onReviewSubmit }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Title_ID: titleId,
      Member_ID: memberName,
      Rating: rating,
      Review_Text: reviewText,
      Review_Date: new Date().toLocaleDateString('en-CA'),
    };
    console.log(data);
    axios.post(`http://localhost:8081/reviews`, data)
      .then((response) => {
        onReviewSubmit();
        console.log("Review added successfully", response.data);
        onClose();
      })
      .catch((err) => {
        console.error("Error adding review:", err.message);
      });
  };

  return (
    <div data-testid="modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">Enter Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="reviewText" className="block font-medium">Review:</label>
            <textarea
              id="reviewText"
              data-testid="review-text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block font-medium">Rating:</label>
            <input
              type="number"
              id="rating"
              data-testid="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="0.5"
              max="5"
              step="0.5"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              data-testid="cancel-button"
              onClick={onClose}
              className="px-4 py-2 text-white transition duration-200 bg-blue-400 rounded hover:bg-blue-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="submit-button"
              className="px-4 py-2 text-white transition duration-200 bg-blue-400 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReview;

