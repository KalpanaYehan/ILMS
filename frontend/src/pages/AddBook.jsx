import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios'
import { useSnackbar } from 'notistack';

const AddBook = () => {

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    bookName: '',
    author: '',
    category:'',
    isbn:'',
    publisher: '',
    pages: '',
    copies: '',
    Img_url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission
  //   console.log(formData);
  //   window.alert("Book Added");
  //   setFormData({
  //     name: '',
  //     author: '',
  //     category:'',
  //     ISBN:'',
  //     publisher: '',
  //     pages: '',
  //     copies: '',
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collecting form data (assuming you have state variables for each field)
    const { bookName, author, category, publisher, isbn, pages, copies, Img_url } = formData;
  
    // setLoading(true); // Setting loading state while making the request
  
    // Make the API call to add a book
    axios
      .post('http://localhost:8081/books/books', { bookName, author, category, publisher, isbn, pages, copies,Img_url })
      .then((res) => {
        // Handle different response cases
        if (res.data.message === 'success') {
          // setLoading(false); // Stop loading
          enqueueSnackbar('Book added successfully', { variant: 'success' });
          navigate('/books/books'); // Navigate to the books list page
        } else {
          // setLoading(false); // Stop loading
          // enqueueSnackbar('Failed to add book. Please log in.', { variant: 'error' });
          enqueueSnackbar(res.data.message, { variant: 'error' })
          console.log(res.data)
          navigate('/'); // Redirect to login if not authorized
        }
        // } else {
        //   setLoading(false); // Stop loading
        //   enqueueSnackbar(res.data.message, { variant: 'error' }); // Show error message if any other issue
        // }
      })
      .catch((error) => {
        // setLoading(false); // Stop loading on error
        enqueueSnackbar(error.message, { variant: 'error' }); // Display error message
        console.log(error);
      });
      console.log(formData);
      window.alert("Book Added");
      setFormData({
        bookName: '',
        author: '',
        category:'',
        isbn:'',
        publisher: '',
        pages: '',
        copies: '',
        Img_url:'',
      })
  };
  

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-customYellow">
      <div className="w-full max-w-md">
        <h2 className="font-bold text-gray-900 text-center text-xl">Add Book</h2>
       
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="bookName">
              Book Name
            </label>
            <input
              type="text"
              name="bookName"
              id="name"
              placeholder='Enter Book Name'
              value={formData.bookName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="author">
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder='Enter Author Name'
              value={formData.author}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder='Enter Category Name'
              value={formData.category}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="publisher">
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              id="publisher"
              placeholder='Enter Publisher Name'
              value={formData.publisher}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="isbn">
              ISBN 
            </label>
            <input
              type="text"
              name="isbn"
              id="ISBN"
              placeholder='Enter ISBN number'
              value={formData.isbn}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="pages">
              No of Pages
            </label>
            <input
              type="text"
              name="pages"
              id="pages"
              placeholder='Enter Number of Pages'
              value={formData.pages}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="copies">
              No of Copies
            </label>
            <input
              type="text"
              name="copies"
              id="copies"
              placeholder='Enter Number of Copies'
              value={formData.copies}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="Img_url">
              Image URL
            </label>
            <input
              type="text"
              name="Img_url"
              id="Img_url"
              placeholder='Enter Image URL'
              value={formData.Img_url}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
         
          <div>
            <button
              type="submit"
              className="mb-5 flex w-full justify-center rounded-md bg-gradient-to-r from-secondary to-secondary/90 bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
  </>
  );
};

export default AddBook;
