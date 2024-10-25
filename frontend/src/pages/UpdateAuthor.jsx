import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const UpdateAuthor = () => {
  const [formData, setFormData] = useState({
    authorName: '',
    country: '',
    Img_url:''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the author ID from the route
  const { enqueueSnackbar } = useSnackbar();

  // Fetch the author details on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://ilms.vercel.app/books/authors/${id}`) // Assuming you have a GET endpoint for fetching an author by ID
      .then((response) => {
        setFormData({
          authorName: response.data.Name,
          country: response.data.Country,
          Img_url:response.data.Img_url
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error fetching author details', { variant: 'error' });
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
    
    // Make the API call to update the author
    axios
      .put(`https://ilms.vercel.app/books/authors/${id}`, formData) // Assuming a PUT endpoint for updating an author
      .then((res) => {
        if (res.data.message === 'Author updated successfully.') {
          setLoading(false);
          console.log(res.data.message)
          enqueueSnackbar('Author updated successfully', { variant: 'success' });
          navigate('/books/authors'); // Navigate back to the list of authors

        } else if (res.data.message === 'author not found') {
          setLoading(false);
          console.log(res.data.message)
          enqueueSnackbar('Author not found', { variant: 'error' });
          navigate('/books/authors');
        } else if (res.data.message === 'send all required fields') {
          setLoading(false);
          console.log(res.data.message)
          enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
        } else {
          setLoading(false);
          console.log(res.data.message)
          enqueueSnackbar('Update unsuccessful', { variant: 'error' });
          navigate('/books/authors');
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating author', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-customYellow">
        <div className="w-full max-w-md">
          <h2 className="font-bold text-gray-900 text-center text-xl">Update Author</h2>

          {loading ? <div>Loading...</div> : (
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

export default UpdateAuthor;
