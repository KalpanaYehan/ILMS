import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/website/newLogo.jpg"
import { Link } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const users = [
    { 
      id: '1001U', 
      firstName: 'Emily', 
      lastName: 'Johnson', 
      email: 'emily.johnson@example.com', 
      phoneNumber: '555-1234',
      password: '1234',
      nic: '123456789V', 
      img: 'https://themesbrand.com/velzon/html/corporate/assets/images/users/avatar-4.jpg' 
    },
    { id: '1002U', 
      firstName: 'John', 
      lastName: 'Smith', 
      email: 'john.smith@example.com', 
      phoneNumber: '555-5678',
      password: '5678',
      nic: '456789123V', 
      img: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2189' 
    },
    { 
      id: '1003U', 
      firstName: 'Michael', 
      lastName: 'Brown', 
      email: 'michael.brown@example.com', 
      phoneNumber: '555-8765',
      password: '2468',
      nic: '1300', 
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&s' },
    {
      id: '1001A',
      firstName: 'Alice',
      lastName: 'Anderson',
      email: 'alice.anderson@admin.com',
      phoneNumber: '555-1234',
      password: '1234',
      nic: '456789123V',
      img: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      id: '1002A',
      firstName: 'Bob',
      lastName: 'Brown',
      email: 'bob.brown@admin.com',
      phoneNumber: '555-5678',
      password: '7890',
      nic: '3000',
      img: 'https://randomuser.me/api/portraits/men/71.jpg',
    },
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
    
    // Find the user with matching userId and password
    const user = users.find(
      user => user.id === formData.userId && user.password === formData.password
    );

    if (user) {
      if (user.id[4] === 'A') {
        // If the user is admin, navigate to admin home page
        navigate('/home', { state: { userType: 'admin', userData: user } });
      } else {
        // If the user is a regular user, navigate to the user home page
        navigate('/home', { state: { userType: 'user', userData: user } });
      }
    } else {
      alert('Invalid user ID or password.');
    }
  };


  return (
    <>
    <div className="flex-1 flex-col justify-center px-6 py-10 bg-white">
          <div className='relative mx-auto max-w-5xl text-center'>
            
            <h2 className="bg-clip-text bg-gradient-to-r from-secondary to-gray-900 font-extrabold text-transparent text-4xl sm:text-4x mb-4">
              Welcome to NexLib
            </h2>
            <p className='mb-5 leading-6 text-center font-semibold'>Sign in to your account</p>
            <img
              alt="NexLib Logo"
              src={Logo}
              className="mx-auto h-40 w-auto"
            />
          </div>
  
          <div className="mt-10 mx-auto w-full max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className='flex items-center text-center justify-between'>
                <label htmlFor="userId" className="block text-sm font-medium leading-6 text-gray-900">
                  User ID
                </label>
                <div className="mt-2 w-4/5">
                  <input
                    id="userId"
                    name="userId"
                    type="text"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                    className="indent-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                  />
                </div>
              </div>
  
              <div className='flex items-center justify-between'>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>

                  {/*<div className="text-sm">
                    <a href="#" className='text-yellow-950'>
                      Forgot password?
                    </a>
                  </div>*/}

                </div>
                <div className="mt-2 w-4/5">
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
                  <Link to={(formData.userId === '1001U' && formData.password === '1234') ? "/home" : "/"}>Sign in</Link>
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

