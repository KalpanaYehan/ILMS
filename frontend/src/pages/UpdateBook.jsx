import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
// import { useSnackbar } from 'notistack';

const UpdateBook = () => {
  const [formData, setFormData] = useState({
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
//   const { enqueueSnackbar } = useSnackbar();

  // Fetch the book details on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8081/getBook/${id}`) // Assuming you have a GET endpoint for fetching a book by ID
      .then((response) => {
        setFormData({
          bookName: response.data.Title_name,
          author: response.data.Author,
          category: response.data.Category_name,
          isbn: response.data.ISBN_Number,
          publisher: response.data.Publisher_name,
          pages: response.data.NoOfPages,
          copies: response.data.No_of_copies,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // enqueueSnackbar('Error fetching book details', { variant: 'error' });
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Make the API call to update the book
    axios
      .put(`http://localhost:8081/editBook/${id}`, formData) // Assuming a PUT endpoint for updating a book
      .then((res) => {
        if (res.data.message === 'successfully updated') {
          setLoading(false);
        //   enqueueSnackbar('Book updated successfully', { variant: 'success' });
          navigate('/books/books'); // Navigate back to the list of books
        } else if (res.data.message === 'book not found') {
          setLoading(false);
        //   enqueueSnackbar('Book not found', { variant: 'error' });
          navigate('/books/books');
        } else if (res.data.message === 'send all required fields') {
          setLoading(false);
        //   enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
        } else {
          setLoading(false);
        //   enqueueSnackbar('Update unsuccessful', { variant: 'error' });
          navigate('/books/books');
        }
      })
      .catch((error) => {
        setLoading(false);
        // enqueueSnackbar('Error updating book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-customYellow">
        <div className="w-full max-w-md">
          <h2 className="font-bold text-gray-900 text-center text-xl">Update Book</h2>

          {loading ? <div>Loading...</div> : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="bookName">
                  Book Name
                </label>
                <input
                  type="text"
                  name="bookName"
                  placeholder="Enter Book Name"
                  value={formData.bookName || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="author">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  placeholder="Enter Author Name"
                  value={formData.author || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="category">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  placeholder="Enter Category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="publisher">
                  Publisher
                </label>
                <input
                  type="text"
                  name="publisher"
                  placeholder="Enter Publisher"
                  value={formData.publisher || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="isbn">
                  ISBN
                </label>
                <input
                  type="text"
                  name="isbn"
                  placeholder="Enter ISBN"
                  value={formData.isbn || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="pages">
                  Pages
                </label>
                <input
                  type="number"
                  name="pages"
                  placeholder="Enter Pages"
                  value={formData.pages || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="copies">
                  Copies
                </label>
                <input
                  type="number"
                  name="copies"
                  placeholder="Enter Copies"
                  value={formData.copies || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full p-3 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300"
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateBook;
