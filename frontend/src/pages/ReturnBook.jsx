import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import UserCard from "../components/UserCard/UserCard";
import BookCard from "../components/BookCard/BookCard";
import RecordCard from "../components/RecordCard/RecordCard";
import { useSnackbar } from "notistack";

function ReturnBook() {
  const location = useLocation();
  const { userType, userData } = location.state || {};

  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const [bookId, setBookId] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);

  const [recordDetails, setRecordDetails] = useState(null);
  const [error, setError] = useState(null);

  // Reference for the details section
  const detailsRef = useRef(null);

  const { enqueueSnackbar } = useSnackbar();

  // const Admin_ID = userData.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUserDetails(null);
    setBookDetails(null);
    setRecordDetails(null);
    setError(null);

    await axios
      .get("http://localhost:8081/user/" + userId)
      .then((res) => {
        if (res.data.length > 0) {
          setUserDetails(res.data[0]);
        } else {
          setError("User not found");
        }
      })
      .catch((err) => console.log(err));

    await axios
      .get("http://localhost:8081/book/" + bookId)
      .then((res) => {
        if (res.data.length > 0) {
          setBookDetails(res.data[0]);
        } else {
          setError("Book not found");
        }
      })
      .catch((err) => console.log(err));

    await axios
      .get("http://localhost:8081/issueDetails", {
        params: {
          userId, // Replace with the actual userId
          bookId, // Replace with the actual bookId
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setRecordDetails(res.data[0]);
        } else {
          setError("Record not found");
        }
      })
      .catch((err) => console.log(err));

    // Scroll to details section if all details are found
    if (recordDetails) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8081/returnbook/", { bookId, userId })
      .then((res) => {
        // window.alert(res.data.Message);
        enqueueSnackbar(res.data.Message, { variant: "success" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar type={userType} data={userData} />

      <div className="relative mx-auto max-w-5xl text-center my-5">
        <span className="bg-clip-text bg-gradient-to-r from-secondary to-gray-900 font-extrabold text-transparent text-4xl sm:text-4xl">
          Return a Book
        </span>
      </div>
      <img
        src="https://cassandraolearyauthor.com/wp-content/uploads/2023/11/Depositphotos_76847815_S.jpg"
        className="w-full max-w-2xl mx-auto rounded-xl h-auto"
        alt="Books"
      />
      <div className="min-h-screen flex justify-center bg-white pt-5">
        <div className="w-full max-w-2xl p-6">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-between"
          >
            {" "}
            {/* Flex container for alignment */}
            <div className="flex items-center">
              {" "}
              {/* User ID */}
              <label
                className="text-gray-700 text-xl font-semibold mr-2" // Increased label size
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
                className="shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Adjusted input width
                required
              />
            </div>
            <div className="flex items-center mx-4">
              {" "}
              {/* Book ID */}
              <label
                className="text-gray-700 text-xl font-semibold mr-2" // Increased label size
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
                className="shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Adjusted input width
                required
              />
            </div>
            <button
              type="submit"
              className="flex justify-center rounded-md bg-gradient-to-r from-secondary to-secondary/90 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm transition-transform transform hover:scale-110" // Increased hover scale effect
            >
              Submit
            </button>
          </form>

          {error && (
            <div className="my-5 mx-2 block text-red-600 text-md font-semibold mb-2">
              {error}
            </div>
          )}

          {recordDetails && (
            <div ref={detailsRef}>
              <RecordCard recordDetails={recordDetails} />
              <UserCard userDetails={userDetails} />
              <BookCard bookDetails={bookDetails} />
              <div className="flex justify-center my-5">
                {" "}
                {/* Flex container for Return Book button */}
                <button
                  type="button"
                  onClick={handleClick}
                  className="w-full flex justify-center rounded-md bg-gradient-to-r from-secondary to-secondary/90 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm transition-transform transform hover:scale-110" // Increased hover scale effect
                >
                  Return Book
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ReturnBook;
