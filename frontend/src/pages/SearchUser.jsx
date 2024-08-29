import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Books from '../assets/website/books.jpg'
import { Link } from 'react-router-dom';

function SearchUser() {
    const [userId, setUserId] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  // Dummy user data
  const users = [
    { id: '1001U', name: 'Alice Johnson', email: 'alice@example.com', phoneNumber: '555-1234',password: '1234',nic: '1100' },
    { id: '1002U', name: 'Bob Smith', email: 'bob@example.com', phoneNumber: '555-5678',password: '5678',nic: '1200' },
    { id: '1003U', name: 'Charlie Brown', email: 'charlie@example.com', phoneNumber: '555-8765',password: '2468',nic: '1300' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear previous user details and error messages
    setUserDetails(null);
    setError(null);

    // Find the user based on userId
    const user = users.find((user) => user.id === userId);

    if (user) {
      setUserDetails(user);
    } else {
      setError('User not found');
    }
  };
  return (
    <>
      <Navbar/>
      <h1 className='text-4xl font-bold text-gray-900 text-center mt-3 mb-4'>Search a User</h1>
      <img src={Books} className='w-lg justify-center mx-auto'/>
      <div className='min-h-screen flex justify-center bg-white'>
      <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="my-5 inline-block">
          <label className="text-gray-700 text-lg font-semibold mx-2" htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            placeholder='Enter user ID'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button type="submit" className="w-full justify-center mx-2 flex rounded-md bg-gradient-to-r from-secondary to-secondary/90 bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get User Details</button>
      </form>

      {error && <div className="my-5 mx-2 block text-gray-700 text-md font-semibold mb-2">{error}</div>}

      {userDetails && (
        <div className="my-5 mx-2 block text-gray-700 text-md font-semibold mb-2">
          <h2 className="font-semibold text-gray-900 text-2xl mb-2">User Details</h2>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Name:</strong> {userDetails.name}</p>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>NIC:</strong> {userDetails.nic}</p>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>E-mail:</strong> {userDetails.email}</p>
          
        </div>
      )}
    </div>
      </div>
      <Footer/>
    </>
  )
}

export default SearchUser