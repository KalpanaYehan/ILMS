import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const AddAuthor = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    authorName: '',
    country: '',
    Img_url:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Make the API call to update the author
    axios
      .post(`http://localhost:8081/books/authors`, formData) // Assuming a PUT endpoint for updating an author
      .then((res) => {
        if (res.data.message === 'Author added successfully') {
          console.log(res.data.message)
          enqueueSnackbar('Author added successfully', { variant: 'success' });
          navigate('/books/authors'); // Navigate back to the list of authors
        } else {
          console.log(res.data.message)
          enqueueSnackbar('Update unsuccessful', { variant: 'error' });
          navigate('/books/authors');
        }
      })
      .catch((error) => {
        // setLoading(false);
        enqueueSnackbar('Error updating author', { variant: 'error' });
        console.log(error);
      });
      // console.log(formData);
      // window.alert("Author Added");
      setFormData({
        authorName: '',
        country: '',
        Img_url:''
      })
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-customYellow">
        <div className="w-full max-w-md">
          <h2 className="font-bold text-gray-900 text-center text-xl">Add Author</h2>

         
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="authorName">
                  Author Name
                </label>
                <input
                  type="text"
                  name="authorName"
                  placeholder="Enter Author Name"
                  value={formData.authorName || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="country">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter Country"
                  value={formData.country || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  placeholder="Enter URL "
                  value={formData.Img_url || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full p-3 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300"
              >
                Add
              </button>
            </form>
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddAuthor;
