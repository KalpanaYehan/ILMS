import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';

const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState({
    bookName: '',
    author: '',
    category: '',
    isbn: '',
    publisher: '',
    pages: '',
    copies: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the book ID from the route

  // Fetch the book details on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8081/getBook/${id}`) // Assuming you have a GET endpoint for fetching a book by ID
      .then((response) => {
        setBookDetails({
          bookName: response.data.Title_name,
          author: response.data.Author,
          category: response.data.Category_name,
          isbn: response.data.ISBN_Number,
          publisher: response.data.Publisher_name,
          pages: response.data.NoOfPages,
          copies: response.data.No_of_copies,
          Img_url: response.data.Img_url
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-customYellow">
        <div className="w-full max-w-md">
          <h2 className="font-bold text-gray-900 text-center text-xl">Book Details</h2>

          {loading ? <div>Loading...</div> : (
            <div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Book Name
                </label>
                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                  {bookDetails.bookName}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Author
                </label>
                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                  {bookDetails.author}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Category
                </label>
                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                  {bookDetails.category}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Publisher
                </label>
                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                  {bookDetails.publisher}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  ISBN
                </label>
                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                  {bookDetails.isbn}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Pages
                </label>
                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                  {bookDetails.pages}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Copies
                </label>
                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                  {bookDetails.copies}
                </p>
              </div>
              {bookDetails.Img_url && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="bookImage">
                    Book Image
                  </label>
                  <img
                    src={bookDetails.Img_url}
                    alt="Book Cover"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={() => navigate('/books/books')}
                  className="mt-6 p-3 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300"
                >
                  Back to Books List
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDetails;
