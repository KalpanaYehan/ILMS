// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
// import { Posts } from "../assets/Content";
// import { Rating } from "@material-tailwind/react";
// import Review from "../assets/Review";
// import axios from "axios";
// import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons
// import {
//   TERipple,
//   TEModal,
//   TEModalDialog,
//   TEModalContent,
//   TEModalHeader,
//   TEModalBody,
//   TEModalFooter,
// } from "tw-elements-react";
// import AddReview from "../components/AddReview/AddReview";

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
//   const [subImages, setSubImages] = useState([]);
//   const [showReviewModal, setShowReviewModal] = useState(false);

//   const { id } = useParams();
//   console.log({id});
//   // Retrieve member ID from local storage
//   const storedUser = localStorage.getItem('user');
//   const member = storedUser ? JSON.parse(storedUser).userId : null;

//   // Fetch book details for the book with the given id from the database
//   useEffect(() => {
//     const fetchBook = async (title_id) => {
//       try {
//         await axios.get(
//           `http://localhost:8081/books/${id} `,
//         ).then((response) => {
//           setBookDetails(response.data[0]);
//           setSubImages([response.data[0].Image1, response.data[0].Image2 , response.data[0].Image3, response.data[0].Image4 , response.data[0].Image5 ]);
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

//   // Fetch reviews for the book with the given id from the database
//   const fetchReviews = async (title_id) => {
//     try {
//       await axios.get(
//         `http://localhost:8081/reviews/${title_id} `,
//       ).then((response) => {
//         setReviews(response.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     } catch (error) {
//       console.log("Error fetching data:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchReviews(id);
//   }, [id]);
//   console.log(id);

//   const handleAddReviewClick = () => {
//     setShowReviewModal(true);
//   };

//   const handleCloseReviewModal = () => {
//     setShowReviewModal(false);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen mt-10 bg-customYellow">
//         <div className="container flex px-4 py-10 mx-auto">
//           <div className="grid justify-center w-full grid-cols-3 gap-4 mx-10">
//             <div className="grid justify-end w-full">
//               <img
//                 src={bookDetails.ImageURL}
//                 alt={"book Image"}
//                 style={{ maxWidth: "300px" }}
//                 className="object-contain w-full"
//               />
//             </div>
//             <div className="flex flex-col justify-between col-span-2 mt-5 ml-10">
//               <div>
//                 <h1 className="mb-10 text-5xl font-bold">{bookDetails.book_title}</h1>
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
//                     {bookDetails.Description}
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
//         {subImages.length > 0 ? (
//           <div className="container flex justify-center py-8">
//             <div className="w-4/5">
//               <div
//                 style={{ backgroundColor: "#ededede6" }}
//                 className="grid justify-center grid-cols-5 gap-5 px-5 py-10 rounded-lg shadow"
//               >
//                 {subImages.map((image, index) => (
//                   <div key={index}>
//                     <img
//                       onClick={() => {
//                         setShowModal(true);
//                         setImage([image]);
//                       }}
//                       src={'http://localhost:8081/'+image}
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
//                     setImage(subImages);
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
//           onReviewSubmit={() => fetchReviews(id)} // Pass the function to fetch the latest reviews

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
//                     return <img key={index} className="my-3 shadow" src={'http://localhost:8081/'+img} alt={`img-${index}`} />;
//                   })}
//               </TEModalBody>
//             </TEModalContent>
//           </TEModalDialog>
//         </TEModal>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Posts } from "../assets/Content";
import { Rating } from "@material-tailwind/react";
import Review from "../assets/Review";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import star icons
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
      {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
        (_, index) => (
          // Display empty star
          <FaRegStar key={index} className="text-3xl text-orange-400 " />
        )
      )}
    </div>
  );
};

function BookDetails() {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);
  const [subImages, setSubImages] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { id } = useParams();
  console.log({ id });
  // Retrieve member ID from local storage
  const storedUser = localStorage.getItem("user");
  const member = storedUser ? JSON.parse(storedUser).userId : null;

  //test
  // const [bookDetails, setBookDetails] = useState([]);
  // Fetch book details for the book with the given id from the database
  useEffect(() => {
    const fetchBook = async (title_id) => {
      try {
        await axios
          .get(`http://localhost:8081/books/books/bookdata/${id} `)
          .then((response) => {
            setBookDetails(response.data[0]);
            setSubImages([
              response.data[0].Image1,
              response.data[0].Image2,
              response.data[0].Image3,
              response.data[0].Image4,
              response.data[0].Image5,
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchBook(id);
  }, [id]);

  // Fetch reviews for the book with the given id from the database
  const fetchReviews = async (title_id) => {
    try {
      await axios
        .get(`http://localhost:8081/reviews/${title_id} `)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchReviews(id);
  }, [id]);
  console.log(id);

  const handleAddReviewClick = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-10 bg-primary/20">
        <div className="container flex px-4 py-10 mx-auto">
          <div className="grid justify-center w-full grid-cols-3 gap-4 mx-10">
            <div className="grid justify-end w-full">
              <img
                src={bookDetails.ImageURL}
                alt={"book Image"}
                style={{ maxWidth: "300px" }}
                className="object-contain w-full"
              />
            </div>
            <div className="flex flex-col justify-between col-span-2 mt-5 ml-10">
              <div>
                <h1 className="mb-10 text-5xl font-bold">
                  {bookDetails.book_title}
                </h1>
                <div className="flex items-center gap-2 align-middle">
                  <h2 className="m-0 text-2xl font-bold ">Author :</h2>{" "}
                  <h3 className="m-0 text-xl text-gray-700">
                    {" "}
                    {bookDetails.AuthorName}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mt-2 align-middle">
                  <h2 className="m-0 text-2xl font-bold ">Category :</h2>{" "}
                  <h3 className="m-0 text-xl text-gray-700">
                    {" "}
                    {bookDetails.CategoryName}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mt-2 align-middle">
                  <h2 className="m-0 text-2xl font-bold ">ISBN :</h2>{" "}
                  <h3 className="m-0 text-xl text-gray-700">
                    {" "}
                    {bookDetails.ISBNNumber}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mt-2 align-middle">
                  <h2 className="m-0 text-2xl font-bold ">No of pages :</h2>{" "}
                  <h3 className="m-0 text-xl text-gray-700">
                    {" "}
                    {bookDetails.NoOfPages}
                  </h3>
                </div>

                <div className="my-4">
                  {renderStars(bookDetails?.AverageRating || 0)}{" "}
                  {/* Pass the rating dynamically */}
                </div>

                <div className="flex items-center gap-2 mt-2 mb-6">
                  <p className="m-0 text-md gray-700 text-">
                    {" "}
                    {bookDetails.Description}
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

        {subImages.length > 0 &&
        !subImages.every((item) => item === null || item === "") ? (
          <>
            {/* image gallery modal  */}
            <ModalDialogScrollable
              showModal={showModal}
              setShowModal={setShowModal}
              image={image}
            />
            <div className="container flex justify-center py-8">
              <div className="w-4/5">
                <div
                  style={{ backgroundColor: "#ededede6" }}
                  className="grid justify-center grid-cols-5 gap-5 px-5 py-10 rounded-lg shadow"
                >
                  {subImages.map((image, index) =>
                    image ? (
                      <>
                        <div key={index}>
                          <img
                            onClick={() => {
                              setShowModal(true);
                              setImage([image]);
                            }}
                            src={"http://localhost:8081/" + image}
                            alt=""
                            className="object-cover transition-transform duration-300 transform cursor-pointer w-96 hover:scale-110 h-72"
                          />
                        </div>
                      </>
                    ) : null
                  )}
                </div>
                <div className="grid justify-center mt-4">
                  <button
                    className="px-4 py-2 mt-2 text-white bg-yellow-950 hover:bg-yellow-900 rounded-2xl"
                    onClick={() => {
                      setShowModal(true);
                      setImage(subImages);
                    }}
                  >
                    Read Preview
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container flex justify-center py-8">
            <p className="text-xl text-gray-700">No preview available</p>
          </div>
        )}
        {reviews && reviews.length>0 ? (
          <div className="container">
           
            <Review reviews={reviews} />
          </div>
        ) : null}

        <div className="p-6 text-center">
          <button
            className="px-4 py-2 mt-2 text-white bg-yellow-950 hover:bg-yellow-900 rounded-2xl"
            onClick={handleAddReviewClick}
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
          onReviewSubmit={() => fetchReviews(id)} // Pass the function to fetch the latest reviews
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
                    return img ? (
                      <img
                        key={index}
                        className="my-3 shadow"
                        src={"http://localhost:8081/" + img}
                        alt={`img-${index}`}
                      />
                    ) : null;
                  })}
              </TEModalBody>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>
    </div>
  );
}
