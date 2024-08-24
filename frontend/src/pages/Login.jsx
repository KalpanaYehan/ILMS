import { React, useState } from 'react'
import Logo from "../assets/website/newLogo.jpg"
import { Link } from 'react-router-dom';

const Login = () => {

  const users = [
    { id: '1001U', name: 'Alice Johnson', email: 'alice@example.com', phoneNumber: '555-1234',password: '1234',nic: '1100' },
    { id: '1002U', name: 'Bob Smith', email: 'bob@example.com', phoneNumber: '555-5678',password: '5678',nic: '1200' },
    { id: '1003U', name: 'Charlie Brown', email: 'charlie@example.com', phoneNumber: '555-8765',password: '2468',nic: '1300' },
  ];

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
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
  };

  return (
    <>
    <div className="flex-1 flex-col justify-center px-6 py-12 bg-white">
          <div>
            
            <h2 className="mb-5 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
              Welcome to NexLib
            </h2>
            <p className='mb-5 leading-6 text-center font-semibold'>Sign in to your account</p>
            <img
              alt="NexLib Logo"
              src={Logo}
              className="mx-auto h-40 w-auto"
            />
          </div>
  
          <div className="mt-10 mx-auto w-full max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="userId" className="block text-sm font-medium leading-6 text-gray-900">
                  User ID
                </label>
                <div className="mt-2">
                  <input
                    id="userId"
                    name="userId"
                    type="text"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                    className="indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>

                  {/*<div className="text-sm">
                    <a href="#" className='text-yellow-950'>
                      Forgot password?
                    </a>
                  </div>*/}

                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className="indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="mt-10 flex w-full justify-center rounded-md bg-gradient-to-r from-secondary to-secondary/90 bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <Link to={(formData.userId === 'user' && formData.password === '1234') ? "/home" : "/"}>Sign in</Link>
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-md text-gray-500">
              Do not have an account?{' '}<br/>
              <Link to="/signup" className=" leading-6 text-yellow-950 hover:text-yellow-900 font-bold" >Sign up now</Link>
            </p>
          </div>
        </div>
    </>
  );
};

export default Login

