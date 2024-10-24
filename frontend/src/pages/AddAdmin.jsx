import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Validation from '../components/Validation';

const AddAdmin = () => {

    const [formData, setFormData] = useState({
  
      firstName: '',
      lastName: '',
  
      phoneNumber: '',
      email: '',
      password: '',
      role: 'admin',
    });
  
  
    const [errors, setErrors] = useState({});  // State for validation errors
    const navigate = useNavigate();
  
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
  
      // Validate form data
      const validationErrors = Validation(formData);
      setErrors(validationErrors);
  
      if (Object.keys(validationErrors).length === 0) {
        // No validation errors, proceed with the API request
        axios.post("http://localhost:8081/register", formData)
          .then(result => {
            console.log(result);
            navigate(-1);
          })
          .catch(err => console.log(err));
  
        console.log(formData);
        window.alert("Account created");
  
        // Reset form data after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          password: '',
          role: 'admin',
        });
      } else {
        console.log("Validation errors:", validationErrors);
      }
  
    };
  
    const handleUserTypeToggle = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userType: prevFormData.userType === 'member' ? 'admin' : 'member',
      }));
    };
  
    return (
  
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-md">
          <h1 className='mt-3 mb-4 text-4xl font-bold text-center text-gray-900'>Add a admin</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="fname">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="fname"
                placeholder='Enter Your First Name'
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
              {errors.firstName && <p className="font-light text-red-600">{errors.firstName}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="sname">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="sname"
                placeholder='Enter Your Second Name'
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
              {errors.lastName && <p className="font-light text-red-600">{errors.lastName}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="phoneNumber">
  
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder='0123456789'
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
  
              {errors.phoneNumber && <p className="font-light text-red-600">{errors.phoneNumber}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="email">
  
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder='yourname@gmail.com'
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
  
              {errors.email && <p className="font-light text-red-600">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="password">
  
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
  
              {errors.password && <p className="font-light text-red-600">{errors.password}</p>}
            </div>
            
            
            <div>
              <button
                type="submit"
                className="mb-5 flex w-full justify-center rounded-md bg-gradient-to-r from-secondary to-secondary/90 bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add a admin
              </button>
            </div>
          </form>
        
  
        </div>
      </div>
    );
  };
  

export default AddAdmin