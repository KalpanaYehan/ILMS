
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar/Navbar';
// import Footer from '../components/Footer/Footer';
// import User2 from "../assets/website/member1.jpg";

// const Profile = () => {
//   const [userDetails, setUserDetails] = useState({});
//   const [reviews, setReviews] = useState([]);
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [currentReview, setCurrentReview] = useState(null); // State to store the review being edited
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState('');
//   const [showDeletePopup, setShowDeletePopup] = useState(false); // State to manage delete confirmation popup
//   const navigate = useNavigate();  // Hook to navigate to other pages 

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       fetchUserDetails(user.userId);
//       fetchUserReviews(user.userId);
//       fetchBorrowedBooks(user.userId);
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const fetchUserDetails = async (userId) => {
//     try {
//       const response = await axios.get(`http://localhost:8081/user/${userId}`, { withCredentials: true });
//       setUserDetails(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

// const storedUser = localStorage.getItem('user');
// const userID = storedUser ? JSON.parse(storedUser).userId: null;
// console.log(userID);

//   const fetchUserReviews = async (userId) => {
//     try {
//       const response = await axios.get(`http://localhost:8081/reviews/review/${userId}`, { withCredentials: true });
//       setReviews(response.data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const fetchBorrowedBooks = async (userId) => {
//     try {
//       const response = await axios.get(`http://localhost:8081/books/books/borrowed/${userId}`, { withCredentials: true });
//       setBorrowedBooks(response.data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     try {
//       await axios.delete(`http://localhost:8081/reviews/${reviewId}`, { withCredentials: true });
//       setShowDeletePopup(true); // Show delete confirmation popup
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleUpdateReview = (review) => {
//     setCurrentReview(review); // Set the review being edited
//     setRating(review.Rating);
//     setReviewText(review.Review_Text);
//     setShowReviewModal(true); // Show the review modal
//   };

//   const handleCloseReviewModal = () => {
//     setShowReviewModal(false);
//     setCurrentReview(null); // Clear the current review
//     setRating(0);
//     setReviewText('');
//   };

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     const data = {
//       //Title_ID: currentReview.Title_ID,
//       //Member_ID: userDetails.Member_ID,
//       Rating: rating,
//       Review_Text: reviewText,
//       Review_Date: new Date().toLocaleDateString('en-CA'), // Format the date as 'YYYY-MM-DD'
//     };

//     try {
//       if (currentReview) {
//         // Update existing review
//         await axios.put(`http://localhost:8081/reviews/${currentReview.Review_ID}`, data);
//         console.log("Review updated successfully");
        
//       } else {
//         // Add new review
//         await axios.post(`http://localhost:8081/reviews`, data);
//         console.log("Review added successfully");
//       }
      
//       fetchUserReviews(userID);
//       handleCloseReviewModal();
//     } catch (err) {
//       console.error("Error submitting review:", err.message);
//     }
//   };
  

//   const handleCloseDeletePopup = () => {
//     setShowDeletePopup(false);
//     fetchUserReviews(userID); // Refresh the reviews list
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100">
//         <div className="container p-4 mx-auto">
        
//           <div className="flex p-6 mb-6 bg-white rounded-lg shadow-md">
//             <img src={User2} alt="member" className='duration-200 rounded-full cursor-pointer w-60 hover:scale-105' />
//             <div className='px-20 py-10 text-xl '>
//               <p className="mb-2"><strong>Name:</strong> {userDetails.First_name} {userDetails.Last_name}</p>
//               <p className="mb-2"><strong>Email:</strong> {userDetails.Email}</p>
//               <p className="mb-2"><strong>Contact No:</strong> {userDetails.Contact_No}</p>
//             </div>
//           </div>

//           {reviews.length > 0 && (
//             <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
//               <h1 className="mb-4 text-2xl font-bold text-red-950">My Reviews</h1>
//               <table className="min-w-full bg-white">
//                 <thead>
//                   <tr>
//                     <th className="px-4 py-2 text-left border-b">Book Title</th>
//                     <th className="px-4 py-2 text-left border-b">Review</th>
//                     <th className="px-4 py-2 text-left border-b">Review Date</th>
//                     <th className="px-4 py-2 text-left border-b">Rating</th>
//                     <th className="px-4 py-2 text-left border-b">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reviews.map(review => (
//                     <tr key={review.Review_ID}>
//                       <td className="px-4 py-2 border-b">{review.Title_name}</td>
//                       <td className="px-4 py-2 border-b">{review.Review_Text}</td>
//                       <td className="px-4 py-2 border-b">{review.Review_Date}</td>
//                       <td className="px-4 py-2 border-b">{review.Rating}</td>
//                       <td className="flex px-4 py-2 border-b">
//                         <button
//                           onClick={() => handleDeleteReview(review.Review_ID)}
//                           className="px-3 py-1 mr-2 text-white bg-red-500 rounded"
//                         >
//                           Delete
//                         </button>
//                         <button
//                           onClick={() => handleUpdateReview(review)}
//                           className="px-3 py-1 text-white bg-blue-500 rounded"
//                         >
//                           Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {borrowedBooks.length > 0 && (
//             <div className="p-6 bg-white rounded-lg shadow-md">
//               <h1 className="mb-4 text-2xl font-bold text-red-950">My Borrowed Books</h1>
//               <table className="min-w-full bg-white">
//                 <thead>
//                   <tr>
//                     <th className="px-4 py-2 text-left border-b">Book Title</th>
//                     <th className="px-4 py-2 text-left border-b">Author</th>
//                     <th className="px-4 py-2 text-left border-b">Issued Date</th>
//                     <th className="px-4 py-2 text-left border-b">Return Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {borrowedBooks.map(book => (
//                     <tr key={book.Book_ID}>
//                       <td className="px-4 py-2 border-b">{book.Title_name}</td>
//                       <td className="px-4 py-2 border-b">{book.Author}</td>
//                       <td className="px-4 py-2 border-b">{book.Issued_Date}</td>
//                       <td className="px-4 py-2 border-b">{book.Returned_Date}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {showReviewModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//             <h2 className="mb-4 text-2xl font-bold text-center">{currentReview ? 'Update Review' : 'Enter Review'}</h2>
//             <form onSubmit={handleSubmitReview}>
//               <div className="mb-4">
//                 <label htmlFor="reviewText" className="block font-medium">Review:</label>
//                 <textarea
//                   id="reviewText"
//                   value={reviewText}
//                   onChange={(e) => setReviewText(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                   rows="4"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="rating" className="block font-medium">Rating:</label>
//                 <input
//                   type="number"
//                   id="rating"
//                   value={rating}
//                   onChange={(e) => setRating(e.target.value)}
//                   min="0.5"
//                   max="5"
//                   step="0.5"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   required
//                 />
//               </div>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={handleCloseReviewModal}
//                   className="px-4 py-2 text-white transition duration-200 bg-blue-400 rounded hover:bg-blue-700"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 text-white transition duration-200 bg-blue-400 rounded hover:bg-blue-700"
//                 >
//                   {currentReview ? 'Update' : 'Submit'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showDeletePopup && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//             <h2 className="mb-4 text-2xl font-bold text-center">Review Deleted Successfully</h2>
//             <div className="flex justify-end">
//               <button
//                 onClick={handleCloseDeletePopup}
//                 className="px-4 py-2 text-white transition duration-200 bg-blue-400 rounded hover:bg-blue-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import User2 from "../assets/website/member1.jpg";
//import AddAdmin from './AddAdmin';
import { useSnackbar } from 'notistack';


const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentReview, setCurrentReview] = useState(null); // State to store the review being edited
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State to manage delete confirmation popup
  const navigate = useNavigate();  // Hook to navigate to other pages 
  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      fetchUserDetails(user.userId);
      fetchUserReviews(user.userId);
      fetchBorrowedBooks(user.userId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8081/user/${userId}`, { withCredentials: true });
      setUserDetails(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

const storedUser = localStorage.getItem('user');
const userID = storedUser ? JSON.parse(storedUser).userId: null;
console.log(userID);

  const fetchUserReviews = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8081/reviews/review/${userId}`, { withCredentials: true });
      setReviews(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchBorrowedBooks = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8081/books/books/borrowed/${userId}`, { withCredentials: true });
      setBorrowedBooks(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8081/reviews/${reviewId}`, { withCredentials: true });
      // setShowDeletePopup(true); // Show delete confirmation popup
      enqueueSnackbar("Review deleted successfully",{variant : "success"})
      handleCloseDeletePopup()
    } catch (err) {
      setError(err.message);
      enqueueSnackbar("Unsuccess",{variant : "error"})
      handleCloseDeletePopup()
    }
  };

  const handleUpdateReview = (review) => {
    setCurrentReview(review); // Set the review being edited
    setRating(review.Rating);
    setReviewText(review.Review_Text);
    setShowReviewModal(true); // Show the review modal
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setCurrentReview(null); // Clear the current review
    setRating(0);
    setReviewText('');
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const data = {
      //Title_ID: currentReview.Title_ID,
      //Member_ID: userDetails.Member_ID,
      Rating: rating,
      Review_Text: reviewText,
      Review_Date: new Date().toLocaleDateString('en-CA'), // Format the date as 'YYYY-MM-DD'
    };

    try {
      if (currentReview) {
        // Update existing review
        await axios.put(`http://localhost:8081/reviews/${currentReview.Review_ID}`, data);
        console.log("Review updated successfully");
        
      } else {
        // Add new review
        await axios.post(`http://localhost:8081/reviews`, data);
        console.log("Review added successfully");
      }
      
      fetchUserReviews(userID);
      handleCloseReviewModal();
    } catch (err) {
      console.error("Error submitting review:", err.message);
    }
  };
  

  const handleCloseDeletePopup = () => {
    //setShowDeletePopup(false);
    fetchUserReviews(userID); // Refresh the reviews list
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 ">
        <div className="container p-4 mx-auto ">
        <h1 className="mt-5 mb-5 ml-32 text-2xl font-bold text-red-950 lg:ml-32">Personal Details</h1>
          {/* <div className="items-center p-6 mb-6 bg-white rounded-lg shadow-md"> */}
          <div className='flex mb-6 '>
          <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6KL23_akt_SZpwASF21jjgBbuHSV52G5E-uz2AVFuBWwOY2IRXadWB0XXBBupBkLUL1c&usqp=CAU"
          alt="member"
          className="mt-5 duration-200 rounded-full cursor-pointer hover:scale-105 h-60"
        />

          <div className='px-20 py-10 text-xl'> 
              <p className="mb-4 font-semibold"><strong>Member ID:</strong> {userID} </p>
              <p className="mb-4 font-semibold"><strong>First Name:</strong> {userDetails.First_name}</p>
              <p className="mb-4 font-semibold"><strong>Last Name:</strong> {userDetails.Last_name} </p>
              <p className="mb-4 font-semibold"><strong>Email:</strong> {userDetails.Email}</p>
              <p className="mb-4 font-semibold"><strong>Contact No:</strong> {userDetails.Contact_No}</p>
              {userDetails.Role === 'admin' && (
                <Link to={`/Admin`} className="p-2 font-bold text-white bg-yellow-950 hover:bg-yellow-900 rounded-2xl">
                  Add Admin
                </Link>
              )}
            </div>
</div>
           
                   
          {/* </div> */}

          {reviews.length > 0 && (
            <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
              <h1 className="mb-4 text-2xl font-bold text-red-950">My Reviews</h1>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Book Title</th>
                    <th className="px-4 py-2 text-left border-b">Review</th>
                    <th className="px-4 py-2 text-left border-b">Review Date</th>
                    <th className="px-4 py-2 text-left border-b">Rating</th>
                    <th className="px-4 py-2 text-left border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(review => (
                    <tr key={review.Review_ID}>
                      <td className="px-4 py-2 border-b">{review.Title_name}</td>
                      <td className="px-4 py-2 border-b">{review.Review_Text}</td>
                      <td className="px-4 py-2 border-b">{review.Review_Date}</td>
                      <td className="px-4 py-2 border-b">{review.Rating}</td>
                      <td className="flex px-4 py-2 border-b">
                        <button
                          onClick={() => handleDeleteReview(review.Review_ID)}
                          className="px-4 py-2 mx-1 mt-2 text-xs text-white bg-red-700 rounded-lg hover:bg-red-800 hover:scale-105"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleUpdateReview(review)}
                          className="px-4 py-2 mt-2 text-xs text-white bg-green-700 rounded-lg hover:bg-green-800 hover:scale-105"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {borrowedBooks.length > 0 && (
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h1 className="mb-4 text-2xl font-bold text-red-950">My Borrowed Books</h1>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Book Title</th>
                    <th className="px-4 py-2 text-left border-b">Author</th>
                    <th className="px-4 py-2 text-left border-b">Issued Date</th>
                    <th className="px-4 py-2 text-left border-b">Return Date</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedBooks.map(book => (
                    <tr key={book.Book_ID}>
                      <td className="px-4 py-2 border-b">{book.Title_name}</td>
                      <td className="px-4 py-2 border-b">{book.Author}</td>
                      <td className="px-4 py-2 border-b">{book.Issued_Date}</td>
                      <td className="px-4 py-2 border-b">{book.Returned_Date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-center">{currentReview ? 'Update Review' : 'Enter Review'}</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label htmlFor="reviewText" className="block font-medium">Review:</label>
                <textarea
                  id="reviewText"
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
                  onClick={handleCloseReviewModal}
                  className="px-4 py-2 text-white transition duration-200 bg-blue-400 rounded hover:bg-blue-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white transition duration-200 bg-blue-400 rounded hover:bg-blue-700"
                >
                  {currentReview ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-center">Review Deleted Successfully</h2>
            <div className="flex justify-end">
              <button
                onClick={handleCloseDeletePopup}
                className="px-4 py-2 text-white transition duration-200 bg-blue-400 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Profile;
