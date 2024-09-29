import React from 'react';
import { useLocation } from 'react-router-dom';
import User from "../assets/website/user.jpg"
import Navbar from '../components/Navbar/Navbar';

// Example data for the admin
{/*
  const adminData = {
  admin_ID: '1001A',
  firstName: 'John',
  lastName: 'Doe',
  contact: '+1 (555) 123-4567',
  email: 'admin@example.com',
  img: '', // Replace with the actual image URL
};
*/}

const Profile = () => {

  const location = useLocation();
  const { userType, userData } = location.state || {};

  return (
    <>
    <Navbar type={userType} data={userData}/>
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">

      {/* Back Button */}
      {/*<div className="flex justify-start mb-5">
        <button
          onClick={handleBackClick}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-secondary to-secondary/90 bg-gray-900 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Back
        </button>
      </div>*/}

            <div className="relative mx-auto max-w-5xl text-center">
            <span className="bg-clip-text bg-gradient-to-r from-secondary to-gray-900 font-extrabold text-transparent text-4xl sm:text-4xl">
            {userType === 'admin' ? 'Admin' : 'User'} Profile
            </span>
          </div>
      
      {/*<h1 className="text-4xl font-bold text-center mb-6">{userType === 'admin' ? 'Admin' : 'User'} Profile</h1>*/}
      
      {/* Admin Image */}
      <div className="flex justify-center my-6">
        <img
          src={userData.img}
          alt={`${userData.firstName} ${userData.lastName}`}
          className="w-32 h-32 rounded-full shadow-lg"
        />
      </div>

      {/* Admin Details in Cards */}
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="font-semibold">{userType === 'admin' ? 'Admin' : 'User'} ID:</label>
          <span className="ml-2 text-gray-700">{userData.id}</span>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="font-semibold">First Name:</label>
          <span className="ml-2 text-gray-700">{userData.firstName}</span>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="font-semibold">Last Name:</label>
          <span className="ml-2 text-gray-700">{userData.lastName}</span>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="font-semibold">NIC:</label>
          <span className="ml-2 text-gray-700">{userData.nic}</span>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="font-semibold">Contact:</label>
          <span className="ml-2 text-gray-700">{userData.phoneNumber}</span>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="font-semibold">Email:</label>
          <span className="ml-2 text-gray-700">{userData.email}</span>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default Profile;
