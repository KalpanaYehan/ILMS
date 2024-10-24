import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const AddPublisher = () => {
  const [formData, setFormData] = useState({
    publisherName: '',
    location: '',
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make the API call to add the publisher
    axios
      .post('http://localhost:8081/books/publishers', formData) // Assuming the POST endpoint for adding a publisher
      .then((res) => {
        if (res.data.message === 'Publisher added successfully') {
          console.log(res.data.message);
          enqueueSnackbar('Publisher added successfully', { variant: 'success' });
          navigate('/books/publishers'); // Navigate back to the list of publishers
        } else {
          enqueueSnackbar(res.data.message, { variant: 'error' })
          console.log(res.data.message);
          navigate('/books/publishers');
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' })
        console.log('Error adding publisher:', error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-customYellow">
        <div className="w-full max-w-md">
          <h2 className="font-bold text-gray-900 text-center text-xl">Add Publisher</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="publisherName">
                Publisher Name
              </label>
              <input
                type="text"
                name="publisherName"
                placeholder="Enter Publisher Name"
                value={formData.publisherName || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="country">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter Country"
                value={formData.location || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            {/* <div className="mb-4">
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
            </div> */}

            <button
              type="submit"
              className="mt-6 w-full p-3 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300"
            >
              Add Publisher
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddPublisher;
