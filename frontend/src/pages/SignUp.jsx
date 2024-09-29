import React, { useState } from 'react';
import Logo from "../assets/website/newLogo.jpg"
import { Link } from 'react-router-dom';

const SignUp = () => {

  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    phoneNumber: '',
    email: '',
    password: '',
    userType: 'member',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData)
    window.alert("Account created")
    setFormData({
      name: '',
      nic: '',
      phoneNumber: '',
      email: '',
      password: '',
      userType: 'member',
    })
  };

  const handleUserTypeToggle = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      userType: prevFormData.userType === 'member' ? 'admin' : 'member',
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white ">
      <div className="w-full max-w-xl">
      <h1 className='bg-clip-text bg-gradient-to-r from-secondary to-gray-900 font-extrabold text-transparent text-4xl sm:text-4x text-center mt-3 mb-4'>Welcome to NexLib</h1>
        <h2 className="font-semibold text-gray-900 text-center">Create Account</h2>
        <img
              alt="NexLib Logo"
              src={Logo}
              className="mx-auto h-40 w-auto"
            />
        <form >
          <div className="mb-4 flex items-center justify-between">
            <label className="block text-gray-700 text-sm font-semibold w-1/4" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder='Enter Your Name'
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="block text-gray-700 text-sm font-semibold w-1/4" htmlFor="nic">
              NIC
            </label>
            <input
              type="text"
              name="nic"
              id="nic"
              placeholder='12345678V'
              value={formData.nic}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="block text-gray-700 text-sm font-semibold w-1/4" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder='0123456789'
              value={formData.phoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="block text-gray-700 text-sm font-semibold w-1/4" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder='yourname@gmail.com'
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="block text-gray-700 text-sm font-semibold w-1/4" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 flex items-center">
            <div className="text-gray-700 text-sm font-semibold w-1/4">
            Sign up as
            </div>
            <div className='justify-start'>
            <button
              type="button"
              onClick={handleUserTypeToggle}
              className={`px-4 py-2 rounded-xl focus:outline-none ${formData.userType === 'member' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Member
            </button>
            <button
              type="button"
              onClick={handleUserTypeToggle}
              className={`ml-2 px-4 py-2 rounded-xl focus:outline-none ${formData.userType === 'admin' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Admin
            </button>
            </div>
          </div>
          
          <div>
          <button
          onClick={handleSubmit}
                  type="submit"
                  className="mb-5 flex w-full justify-center rounded-md bg-gradient-to-r from-secondary to-secondary/90 bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
              
        </form>
        <p className="mb-10 text-center text-md text-gray-500">
              Already have an account?{' '}<br/>
              <Link to="/" className=" text-yellow-950 hover:text-yellow-900 font-bold" >Sign in to your account</Link>
            </p>
      </div>
    </div>
  );
};

export default SignUp;
