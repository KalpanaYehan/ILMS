import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Posts } from "../assets/Content";
//import { Rating } from "@material-tailwind/react";
import Review from "../assets/Review";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons

import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import AddReview from "../components/AddReview/AddReview";
import { users } from "../assets/UserData";

// Function to display the rating of the book
// function ReadonlyRating({ value }) {
//   return <Rating value={value} readonly />;
// }
  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); 
    const hasHalfStar = rating % 1 !== 0; 
    const totalStars = 5; // Total stars
  
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          // Display full star icon 
          <FaStar key={index} className="text-3xl text-orange-400 " /> 
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-3xl text-orange-400 " />} 
        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          // Display empty star 
          <FaRegStar key={index} className="text-3xl text-orange-400 " /> 
        ))}
      </div>
    );
  };

  
function BookDetails() {
  
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  //const memberName = "ME001";
  const member = users[0].Member_ID;
  
  //const [reviewText, setReviewText] = useState('');

  const { id } = useParams();   
  
  const book = Posts.find((post) => post.id.toString() === id);

  // Fetch bookdetails for the book with the given id from the database
  useEffect(() => {
    const fetchBook = async (title_id) => {
      try {
        await axios.get(
          `http://localhost:8081/books/${title_id} `,
        ).then((response) => {
          setBookDetails(response.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchBook(id);
  },[id]);

  useEffect(()=>{
    console.log(bookDetails);
   
  },[bookDetails]);

  // Fetch reviews for the book with the given id from the database 
  useEffect(() => {
    const fetchReviews = async (title_id) => {
      try {
        await axios.get(
          `http://localhost:8081/reviews/${title_id} `,
        ).then((response) => {
          setReviews(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchReviews(id);
  },[id]);

  useEffect(()=>{
    console.log(reviews);
  },[reviews]);

  

  if (!book) {
    return <h2 className="text-center text-red-500">Book not found!</h2>;
  }

  const handleAddReviewClick = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  // const handleEditReview = () => {
  // };

  // const handleDeleteReview = () => {
  // };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-10 bg-white">
        <div className="container flex px-4 py-10 mx-auto">
          <div className="grid justify-center w-full grid-cols-3 gap-4 mx-10">
            <div className="grid justify-end w-full">
              <img
                src={book.img}
                alt={book.title}
                style={{ maxWidth: "300px" }}
                className="object-contain w-full"
              />
            </div>
            <div className="flex flex-col justify-between col-span-2 mt-5 ml-10">
              <div>
                <h1 className="mb-10 text-5xl font-bold">{bookDetails.BookTitle}</h1>
                <div className="flex items-center gap-2 align-middle">
                  <h2 className="m-0 text-2xl font-bold ">Author :</h2>{" "}
                  <h3 className="m-0 text-xl text-gray-700"> {bookDetails.AuthorName}</h3>
                </div>

                <div className="flex items-center gap-2 mt-2 align-middle">
                  <h2 className="m-0 text-2xl font-bold ">Category :</h2>{" "}
                  <h3 className="m-0 text-xl text-gray-700">
                    {" "}
                    {bookDetails.CategoryName }
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 mt-2 align-middle">
                  <h2 className="m-0 text-2xl font-bold ">ISBN :</h2>{" "}
                  <h3 className="m-0 text-xl text-gray-700"> {bookDetails.ISBNNumber}</h3>
                </div>

                <div className="flex items-center gap-2 mt-2 align-middle">
                  <h2 className="m-0 text-2xl font-bold ">No of pages :</h2>{" "}
                  <h3 className="m-0 text-xl text-gray-700">
                    {" "}
                    {bookDetails.NoOfPages}
                  </h3>
                </div>

                <div className="my-4">
                {renderStars(bookDetails?.AverageRating || 0)} {/* Pass the rating dynamically */}
                            </div>

                <div className="flex items-center gap-2 mt-2 mb-6">
                  <p className="m-0 text-md gray-700 text-">
                    {" "}
                    {book.description}
                  </p>
                </div>

                <div className="mt-2">
                  {bookDetails.Status === 1 ? (
                    <span className="px-4 py-2 text-white bg-green-600 rounded-full">
                      Available
                    </span>
                  ) : (
                    <span className="px-4 py-2 text-white bg-red-600 rounded-full">
                      Not available
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* image gallery modal  */}

        <ModalDialogScrollable
          showModal={showModal}
          setShowModal={setShowModal}
          image={image}
        />

        {book.subImages && book.subImages.length > 0 ? (
          <div className="container flex justify-center py-8">
            <div className="w-4/5">
              <div
                style={{ backgroundColor: "#ededede6" }}
                className="grid justify-center grid-cols-5 gap-5 px-5 py-10 rounded-lg shadow"
              >
                {book.subImages.map((image, index) => (
                  <div key={index}>
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setImage([image]);
                      }}
                      src={image}
                      alt=""
                      className="object-cover transition-transform duration-300 transform cursor-pointer w-96 hover:scale-110 h-72"
                    />
                  </div>
                ))}
              </div>
              <div className="grid justify-center mt-4">
                <button
                  className="px-10 py-2 mt-2 ml-auto text-white transition-transform duration-300 bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105"
                  onClick={() => {
                    setShowModal(true);
                    setImage(book.subImages);
                  }}
                >
                  Read Preview
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="container">
          <Review reviews={reviews} />
        </div>
        <div className="p-6 text-center">
          <button
            className="px-10 py-2 mt-2 ml-auto text-white transition-transform duration-300 bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105"
            onClick= {handleAddReviewClick}
          >
            Add review
          </button>
        </div>
      </div>

      {showReviewModal && (
        <AddReview
          titleId={id}
          memberName={member}
          onClose={handleCloseReviewModal}
        />
      )}

      <Footer />

    </>
  );
}

export default BookDetails;

// Modal dialog component for displaying images in a scrollable modal

function ModalDialogScrollable({ showModal, setShowModal, image }) {
  return (
    <div>
      {/* <!-- Modal --> */}
      <div>
        <TEModal show={showModal} setShow={setShowModal} scrollable>
          <TEModalDialog>
            <TEModalContent>
              {/* <!--Modal body--> */}
              <TEModalBody>
                {image &&
                  image.map((img, index) => {
                    return <img key={index} className="my-3 shadow" src={img} alt={`img-${index}`} />;
                  })}
              </TEModalBody>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
// import { Posts } from "../assets/Content";
// import Review from "../assets/Review";
// import axios from "axios";
// import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons

// import {
//   TERipple,
//   TEModal,
//   TEModalDialog,
//   TEModalContent,
//   TEModalBody,
//   TEModalFooter,
// } from "tw-elements-react";
// import AddReview from "../components/AddReview/AddReview";
// import { users } from "../assets/UserData";

// // Function to render stars based on the rating
// const renderStars = (rating) => {
//   const fullStars = Math.floor(rating); 
//   const hasHalfStar = rating % 1 !== 0; 
//   const totalStars = 5; // Total stars

//   return (
//     <div className="flex">
//       {[...Array(fullStars)].map((_, index) => (
//         // Display full star icon 
//         <FaStar key={index} className="text-3xl text-orange-400 " /> 
//       ))}
//       {hasHalfStar && <FaStarHalfAlt className="text-3xl text-orange-400 " />} 
//       {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
//         // Display empty star 
//         <FaRegStar key={index} className="text-3xl text-orange-400 " /> 
//       ))}
//     </div>
//   );
// };

// function BookDetails() {
//   const [showModal, setShowModal] = useState(false);
//   const [image, setImage] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [bookDetails, setBookDetails] = useState([]);
//   const [showReviewModal, setShowReviewModal] = useState(false);

//   const member = users[0].Member_ID;
//   const { id } = useParams();   
//   const book = Posts.find((post) => post.id.toString() === id);

//   // Fetch book details for the book with the given id from the database
//   useEffect(() => {
//     const fetchBook = async (title_id) => {
//       try {
//         await axios.get(
//           `http://localhost:8081/books/${title_id} `,
//         ).then((response) => {
//           setBookDetails(response.data[0]);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       } catch (error) {
//         console.log("Error fetching data:", error.message);
//       }
//     };
//     fetchBook(id);
//   },[id]);

//   useEffect(()=> {
//     console.log(bookDetails);
//   },[bookDetails]);

//   // Fetch reviews for the book with the given id from the database 
//   useEffect(() => {
//     const fetchReviews = async (title_id) => {
//       try {
//         await axios.get(
//           `http://localhost:8081/reviews/${title_id} `,
//         ).then((response) => {
//           setReviews(response.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       } catch (error) {
//         console.log("Error fetching data:", error.message);
//       }
//     };
//     fetchReviews(id);
//   },[id]);

//   useEffect(()=> {
//     console.log(reviews);
//   },[reviews]);

//   if (!book) {
//     return <h2 className="text-center text-red-500">Book not found!</h2>;
//   }

//   const handleAddReviewClick = () => {
//     setShowReviewModal(true);
//   };

//   const handleCloseReviewModal = () => {
//     setShowReviewModal(false);
//   };

//   const handleNewReview = (newReview) => {
//     setReviews((prevReviews) => [...prevReviews, newReview]);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen mt-10 bg-white">
//         <div className="container flex px-4 py-10 mx-auto">
//           <div className="grid justify-center w-full grid-cols-3 gap-4 mx-10">
//             <div className="grid justify-end w-full">
//               <img
//                 src={book.img}
//                 alt={book.title}
//                 style={{ maxWidth: "300px" }}
//                 className="object-contain w-full"
//               />
//             </div>
//             <div className="flex flex-col justify-between col-span-2 mt-5 ml-10">
//               <div>
//                 <h1 className="mb-10 text-5xl font-bold">{bookDetails.BookTitle}</h1>
//                 <div className="flex items-center gap-2 align-middle">
//                   <h2 className="m-0 text-2xl font-bold ">Author :</h2>{" "}
//                   <h3 className="m-0 text-xl text-gray-700"> {bookDetails.AuthorName}</h3>
//                 </div>

//                 <div className="flex items-center gap-2 mt-2 align-middle">
//                   <h2 className="m-0 text-2xl font-bold ">Category :</h2>{" "}
//                   <h3 className="m-0 text-xl text-gray-700">
//                     {" "}
//                     {bookDetails.CategoryName }
//                   </h3>
//                 </div>
                
//                 <div className="flex items-center gap-2 mt-2 align-middle">
//                   <h2 className="m-0 text-2xl font-bold ">ISBN :</h2>{" "}
//                   <h3 className="m-0 text-xl text-gray-700"> {bookDetails.ISBNNumber}</h3>
//                 </div>

//                 <div className="flex items-center gap-2 mt-2 align-middle">
//                   <h2 className="m-0 text-2xl font-bold ">No of pages :</h2>{" "}
//                   <h3 className="m-0 text-xl text-gray-700">
//                     {" "}
//                     {bookDetails.NoOfPages}
//                   </h3>
//                 </div>

//                 <div className="my-4">
//                 {renderStars(bookDetails?.AverageRating || 0)} {/* Pass the rating dynamically */}
//                             </div>

//                 <div className="flex items-center gap-2 mt-2 mb-6">
//                   <p className="m-0 text-md gray-700 text-">
//                     {" "}
//                     {book.description}
//                   </p>
//                 </div>

//                 <div className="mt-2">
//                   {bookDetails.Status === 1 ? (
//                     <span className="px-4 py-2 text-white bg-green-600 rounded-full">
//                       Available
//                     </span>
//                   ) : (
//                     <span className="px-4 py-2 text-white bg-red-600 rounded-full">
//                       Not available
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* image gallery modal  */}

//         <ModalDialogScrollable
//           showModal={showModal}
//           setShowModal={setShowModal}
//           image={image}
//         />

//         {book.subImages && book.subImages.length > 0 ? (
//           <div className="container flex justify-center py-8">
//             <div className="w-4/5">
//               <div
//                 style={{ backgroundColor: "#ededede6" }}
//                 className="grid justify-center grid-cols-5 gap-5 px-5 py-10 rounded-lg shadow"
//               >
//                 {book.subImages.map((image, index) => (
//                   <div key={index}>
//                     <img
//                       onClick={() => {
//                         setShowModal(true);
//                         setImage([image]);
//                       }}
//                       src={image}
//                       alt=""
//                       className="object-cover transition-transform duration-300 transform cursor-pointer w-96 hover:scale-110 h-72"
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className="grid justify-center mt-4">
//                 <button
//                   className="px-10 py-2 mt-2 ml-auto text-white transition-transform duration-300 bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105"
//                   onClick={() => {
//                     setShowModal(true);
//                     setImage(book.subImages);
//                   }}
//                 >
//                   Read Preview
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : null}

//         <div className="container">
//           <Review reviews={reviews} />
//         </div>
//         <div className="p-6 text-center">
//           <button
//             className="px-10 py-2 mt-2 ml-auto text-white transition-transform duration-300 bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105"
//             onClick= {handleAddReviewClick}
//           >
//             Add review
//           </button>
//         </div>
//       </div>

//       {showReviewModal && (
//         <AddReview
//           titleId={id}
//           memberName={member}
//           onClose={handleCloseReviewModal}
//           onNewReview={handleNewReview} // Pass the callback function
//         />
//       )}

//       <Footer />

//     </>
//   );
// }

// export default BookDetails;

// // Modal dialog component for displaying images in a scrollable modal

// function ModalDialogScrollable({ showModal, setShowModal, image }) {
//   return (
//     <div>
//       {/* <!-- Modal --> */}
//       <div>
//         <TEModal show={showModal} setShow={setShowModal} scrollable>
//           <TEModalDialog>
//             <TEModalContent>
//               {/* <!--Modal body--> */}
//               <TEModalBody>
//                 {image &&
//                   image.map((img, index) => {
//                     return <img key={index} className="my-3 shadow" src={img} alt={`img-${index}`} />;
//                   })}
//               </TEModalBody>
//             </TEModalContent>
//           </TEModalDialog>
//         </TEModal>
//       </div>
//     </div>
//   );
// }