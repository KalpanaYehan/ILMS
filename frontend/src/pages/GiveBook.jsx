import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import UserCard from "../components/UserCard/UserCard";
import BookCard from "../components/BookCard/BookCard";

function GiveBook() {
  const location = useLocation();
  const { userType, userData } = location.state || {};

  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const [bookId, setBookId] = useState("");
  const [bookDetails, setBookDetails] = useState(null);

  const [error, setError] = useState(null);

  //   const Admin_ID = userData.id;

  // Create a reference for the details section
  const detailsRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUserDetails(null);
    setBookDetails(null);
    setError(null);

    try {
      await axios
        .get("http://localhost:8081/book/" + bookId)
        .then((res) => {
          if (res.data.length > 0) {
            setBookDetails(res.data[0]);
          } else {
            setError("Book not found");
          }
        })
        .catch((err) => {
          console.error(err); // Log the error for debugging
          setError("An error occurred while fetching user details."); // Set a user-friendly error message
        });
    } catch {
      (err) => console.log(err);
    }

    try {
      await axios
        .get("http://localhost:8081/user/" + userId)
        .then((res) => {
          if (res.data.length > 0) {
            setUserDetails(res.data[0]);
          } else {
            setError("User not found");
          }
        })
        .catch((err) => {
          console.error(err); // Log the error for debugging
          setError("An error occurred while fetching user details."); // Set a user-friendly error message
        });
    } catch {
      (err) => console.log(err);
    }

    // Scroll to details section if both user and book are found
    if (userDetails && bookDetails) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8081/issue", {
        Admin_ID,
        userId,
        bookId,
      })
      .then((res) => window.alert(res.data.Message))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar type={userType} data={userData} />
      <div className="relative mx-auto max-w-5xl text-center my-5">
        <span className="bg-clip-text bg-gradient-to-r from-secondary to-gray-900 font-extrabold text-transparent text-4xl sm:text-4xl">
          Issue a Book
        </span>
      </div>

      <img
        src="https://img.freepik.com/premium-photo/serious-students-using-laptop-library_107420-1926.jpg"
        className="w-full max-w-2xl mx-auto rounded-xl h-auto"
        alt="Books"
      />

      <div className="min-h-screen flex justify-center bg-white">
        <div className="w-full max-w-2xl p-6">
          {" "}
          {/* Increased max width and added padding */}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center my-5">
              {" "}
              {/* Flex container for all elements on the same line */}
              {/* User ID Input */}
              <div className="flex items-center flex-1 px-2">
                <label
                  className="text-gray-700 text-lg font-bold mr-2" // Larger label
                  htmlFor="userId"
                >
                  User ID:
                </label>
                <input
                  type="text"
                  id="userId"
                  placeholder="Enter user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Smaller input
                  required
                />
              </div>
              {/* Book ID Input */}
              <div className="flex items-center flex-1 px-2">
                <label
                  className="text-gray-700 text-lg font-bold mr-2" // Larger label
                  htmlFor="bookId"
                >
                  Book ID:
                </label>
                <input
                  type="text"
                  id="bookId"
                  placeholder="Enter book ID"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                  className="shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Smaller input
                  required
                />
              </div>
              {/* Submit Button */}
              <div className="flex-shrink-0 px-2">
                <button
                  type="submit"
                  className="rounded-md bg-gradient-to-r from-secondary to-secondary/90 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm transition-transform transform hover:scale-105" // Added hover effect
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div ref={detailsRef}>
            {error && (
              <div className="my-5 mx-2 text-red-600 text-md font-semibold">
                {error}
              </div>
            )}

            {userDetails && <UserCard userDetails={userDetails} />}
            {bookDetails && <BookCard bookDetails={bookDetails} />}

            {bookDetails && userDetails && bookDetails.Status === 1 && (
              <button
                type="button"
                onClick={handleClick}
                className="w-full mx-2 my-5 flex justify-center rounded-md bg-gradient-to-r from-secondary to-secondary/90 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm transition-transform transform hover:scale-105"
              >
                Add to waiting list
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default GiveBook;
