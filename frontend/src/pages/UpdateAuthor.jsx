import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
// import { useSnackbar } from 'notistack';

const UpdateAuthor = () => {
  const [formData, setFormData] = useState({
    authorName: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the author ID from the route
//   const { enqueueSnackbar } = useSnackbar();

  // Fetch the author details on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8081/getAuthor/${id}`) // Assuming you have a GET endpoint for fetching an author by ID
      .then((response) => {
        setFormData({
          authorName: response.data.Name,
          country: response.data.Country,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // enqueueSnackbar('Error fetching author details', { variant: 'error' });
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
      .put(`http://localhost:8081/editAuthor/${id}`, formData) // Assuming a PUT endpoint for updating an author
      .then((res) => {
        if (res.data.message === 'successfully updated') {
          setLoading(false);
        //   enqueueSnackbar('Author updated successfully', { variant: 'success' });
          navigate('/authors'); // Navigate back to the list of authors
        } else if (res.data.message === 'author not found') {
          setLoading(false);
        //   enqueueSnackbar('Author not found', { variant: 'error' });
          navigate('/authors');
        } else if (res.data.message === 'send all required fields') {
          setLoading(false);
        //   enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
        } else {
          setLoading(false);
        //   enqueueSnackbar('Update unsuccessful', { variant: 'error' });
          navigate('/authors');
        }
      })
      .catch((error) => {
        setLoading(false);
        // enqueueSnackbar('Error updating author', { variant: 'error' });
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
