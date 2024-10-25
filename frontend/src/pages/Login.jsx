
import { React, useState,useContext,useEffect} from 'react'
import Logo from "../assets/website/newLogo.jpg"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useSnackbar } from 'notistack';

const Login = () => {

  const [formData, setFormData] = useState({
    userEmail: '',
    password: '',
  });
  
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  const{user,setUser} = useContext(AuthContext)
  axios.defaults.withCredentials =true
  
  useEffect(() => {
    // Check if user is already logged in
    if (user) {
      enqueueSnackbar('You are already logged in!', { variant: 'info' });
      navigate('/home');  // Redirect if user is logged in
    }
  }, [user, navigate, enqueueSnackbar]);//user, navigate, enqueueSnackbar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://vercel.com/api/toolbar/link/ilms.vercel.app/login", { userEmail:formData.userEmail, password:formData.password })
       .then(result => {
         console.log(result);
         if (result.data.message === 'success') {
          const { accesstoken:token, user } = result.data;
                
          // Store the token and update the user context
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          enqueueSnackbar("logged in successfully", { variant: 'success' })
          // Redirect to the cars page
           navigate('/home');
         }else {
          enqueueSnackbar(result.data.message, { variant: 'error' })
        }
       })
       .catch(err => {
        // Check if the error response exists and handle accordingly
        if (err.response && err.response.data) {
          enqueueSnackbar(err.response.data.message, { variant: 'error' })
          //alert(`Error: ${err.response.data.message}`);
        } else {
          enqueueSnackbar('An unexpected error occurred.', { variant: 'error' })
          //alert('An unexpected error occurred.');
        }
        console.log(err); // For debugging
      });
    
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
                <label htmlFor="userEmail" className="block text-sm font-medium leading-6 text-gray-900">
                  User Email
                </label>
                <div className="mt-2">
                  <input
                    id="userEmail"
                    name="userEmail"
                    type="text"
                    value={formData.userEmail}
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

                  Sign in
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

