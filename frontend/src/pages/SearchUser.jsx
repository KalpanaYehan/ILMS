import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import BackButton from "../components/BackButton";

function SearchUser() {
  const location = useLocation();
  const { userType, userData } = location.state || {};
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const userDetailsRef = useRef(null); // Create a reference

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous user details and error messages
    setUserDetails(null);
    setError(null);

    try {
      const res = await axios.get("http://localhost:8081/users/user/" + userId);

      // Check if user data is returned
      if (res.data.length > 0) {
        const user = res.data[0]; // Get the first user from the response

        setUserDetails(user); // Update the state with user details

        // Scroll to user details after a short delay
        setTimeout(() => {
          userDetailsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        setError("User not found");
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError("User not found"); // Set a user-friendly error message
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative mx-auto max-w-5xl text-center my-5">
        <span className="bg-clip-text bg-gradient-to-r from-secondary to-gray-900 font-extrabold text-transparent text-4xl sm:text-4xl">
          Search a User
        </span>
      </div>
      <img
        src="https://img.freepik.com/free-photo/smiling-asian-woman-posing-public-library_74855-1621.jpg"
        className="w-full max-w-2xl mx-auto rounded-xl h-auto"
        alt="Books"
      />
      <div className="min-h-screen flex justify-center bg-white">
        <div className="w-full max-w-2xl p-6">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-between mb-5"
          >
            <div className="flex items-center mr-4">
              {" "}
              {/* User ID */}
              <label
                className="text-gray-700 text-lg font-semibold mr-2"
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
                className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Increased width
                required
              />
            </div>
            <button
              type="submit"
              className="flex justify-center items-center rounded-md bg-gradient-to-r from-secondary to-secondary/90 w-64 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm transition-transform transform hover:scale-110" // Increased width
            >
              Get User Details
            </button>
          </form>

          {error && (
            <div className="my-5 mx-2 block text-red-600 text-md font-semibold mb-2">
              {error}
            </div>
          )}

          {userDetails && (
            <>
              {/* <div
                className="flex justify-center mb-6 mt-10"
                ref={userDetailsRef}
              >
                <img
                  src={userDetails.img}
                  alt={`${userDetails.First_name} ${userDetails.Last_name}`}
                  className="w-32 h-32 rounded-full shadow-lg"
                />
              </div> */}
              <div
                className="my-5 mx-2 pt-5 text-gray-700 text-md font-semibold mb-2 grid grid-cols-1 gap-4"
                ref={userDetailsRef}
              >
                {/* Data Fields with Aligned Layout */}
                <h1 className="text-3xl text-center font-bold text-gray-900 mt-5 mb-5">
                  {userDetails.Role === "user"
                    ? "User Details"
                    : "Admin Details"}
                </h1>
                <div className="flex justify-between bg-white shadow-md rounded-lg p-4">
                  <p className="font-semibold text-gray-900 text-lg mb-1">
                    <strong>User ID:</strong>
                  </p>
                  <p className="text-gray-800">{userDetails.Member_ID}</p>
                </div>

                <div className="flex justify-between bg-white shadow-md rounded-lg p-4">
                  <p className="font-semibold text-gray-900 text-lg mb-1">
                    <strong>First Name:</strong>
                  </p>
                  <p className="text-gray-800">{userDetails.First_name}</p>
                </div>
                <div className="flex justify-between bg-white shadow-md rounded-lg p-4">
                  <p className="font-semibold text-gray-900 text-lg mb-1">
                    <strong>Last Name:</strong>
                  </p>
                  <p className="text-gray-800">{userDetails.Last_name}</p>
                </div>
                {/* <div className="flex justify-between bg-white shadow-md rounded-lg p-4">
                  <p className="font-semibold text-gray-900 text-lg mb-1">
                    <strong>NIC:</strong>
                  </p>
                  <p className="text-gray-800">{userDetails.nic}</p>
                </div> */}
                <div className="flex justify-between bg-white shadow-md rounded-lg p-4">
                  <p className="font-semibold text-gray-900 text-lg mb-1">
                    <strong>Phone Number:</strong>
                  </p>
                  <p className="text-gray-800">{userDetails.Contact_No}</p>
                </div>
                <div className="flex justify-between bg-white shadow-md rounded-lg p-4">
                  <p className="font-semibold text-gray-900 text-lg mb-1">
                    <strong>E-mail:</strong>
                  </p>
                  <p className="text-gray-800">{userDetails.Email}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SearchUser;
