import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const UpdatePublisher = () => {
  const [formData, setFormData] = useState({
    publisherName: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the publisher ID from the route
  const { enqueueSnackbar } = useSnackbar();

  // Fetch the publisher details on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://ilms.vercel.app/books/publishers/${id}`) // Assuming you have a GET endpoint for fetching a publisher by ID
      .then((response) => {
        setFormData({
          publisherName: response.data.Name,
          location: response.data.Location,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error fetching publisher details', { variant: 'error' });
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
    
    // Make the API call to update the publisher
    axios
      .put(`https://ilms.vercel.app/books/publishers/${id}`, formData) // Assuming a PUT endpoint for updating a publisher
      .then((res) => {
        if (res.data.message === 'Publisher updated successfully.') {
          setLoading(false);
          enqueueSnackbar('Publisher updated successfully', { variant: 'success' });
          navigate('/books/publishers'); // Navigate back to the list of publishers
        } else if (res.data.message === 'Publisher not found.') {
          setLoading(false);
          enqueueSnackbar('Publisher not found', { variant: 'error' });
          navigate('/books/publishers');
        } else if (res.data.message === 'send all required fields') {
          setLoading(false);
          enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
        } else {
          setLoading(false);
          enqueueSnackbar('Update unsuccessful', { variant: 'error' });
          navigate('/books/publishers');
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating publisher', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-customYellow">
        <div className="w-full max-w-md">
          <h2 className="font-bold text-gray-900 text-center text-xl">Update Publisher</h2>

          {loading ? <div>Loading...</div> : (
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
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="location">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter Location"
                  value={formData.location || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
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

export default UpdatePublisher;
