import React, { useState, useRef,useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'
//import { AuthContext } from '../context/AuthContext';

function SearchUser() {
  //const location = useLocation();
  //const { userType, userData } = location.state || {};
  const [userId, setUserId] = useState('');
  // const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const userDetailsRef = useRef(null); // Create a reference
  const [user, setUser] = useState(null);
  //const{user} =useContext(AuthContext);


  // Dummy user data
  {/*}
  const users = [
    { id: '1001U', firstName: 'Emily', lastName: 'Johnson', email: 'emily.johnson@example.com', phoneNumber: '555-1234',password: '1234',nic: '1100', img: 'https://themesbrand.com/velzon/html/corporate/assets/images/users/avatar-4.jpg' },
    { id: '1002U', firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', phoneNumber: '555-5678',password: '5678',nic: '1200', img: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2189' },
    { id: '1003U', firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com', phoneNumber: '555-8765',password: '2468',nic: '1300', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&s' },
  ];
*/}

  const handleSubmit = (e) => {
      e.preventDefault();
      
      // Clear previous user details and error messages
      // setUserDetails(null);
      setError(null);

      // Find the user based on userId
      //const user = users.find((user) => user.id === userId);

      axios.get('http://localhost:8081/user/' + userId)
        .then(res => setUser(res.data[0])    
        )
        .catch(err => console.log(err));

      // if (user) {
      //     setUserDetails({ 
      //       id: user.Admin_ID, 
      //       firstName: user.First_Name, 
      //       lastName: user.Last_Name, 
      //       email: user.Email, 
      //       phoneNumber: user.Contact_No,
      //       password: user.Password,
      //       //nic: user.nic, 
      //       //img: user.img 
      //   });
          setTimeout(() => {
              userDetailsRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to user details
          }, 100);
      // } else {
      //     setError('User not found');
      // }
  };

  return (
      <>
          <Navbar/>
          {/*<h1 className='text-4xl font-bold text-gray-900 text-center mt-3 mb-4'>Search a User</h1>*/}
          <div className="relative mx-auto max-w-5xl text-center my-5">
            <span className="bg-clip-text bg-gradient-to-r from-secondary to-gray-900 font-extrabold text-transparent text-4xl sm:text-4xl">
            Search a User
            </span>
            </div>
          <img src='https://img.freepik.com/free-photo/smiling-asian-woman-posing-public-library_74855-1621.jpg' className='w-lg justify-center mx-auto rounded-xl h-[384px] w-[576px]' alt="Books" />
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

                  {user && (
                      <>
                          {/* <div className="flex justify-center mb-6 mt-10" ref={userDetailsRef}>
                              <img
                                  src={userDetails.img}
                                  alt={`${userDetails.firstName} ${userDetails.lastName}`}
                                  className="w-32 h-32 rounded-full shadow-lg"
                              />
                          </div> */}
                          <div className="my-5 mx-2 text-gray-700 text-md font-semibold mb-2 grid grid-cols-1 gap-4">
                              <div className="bg-white shadow-md rounded-lg p-4">
                                  <p className="font-semibold text-gray-900 text-lg mb-1"><strong>First Name:</strong> {user.First_name}</p>
                              </div>
                              <div className="bg-white shadow-md rounded-lg p-4">
                                  <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Last Name:</strong> {user.Last_name}</p>
                              </div>
                              {/* <div className="bg-white shadow-md rounded-lg p-4">
                                  <p className="font-semibold text-gray-900 text-lg mb-1"><strong>NIC:</strong> {userDetails.nic}</p>
                              </div> */}
                              <div className="bg-white shadow-md rounded-lg p-4">
                                  <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Phone Number:</strong> {user.Contact_No}</p>
                              </div>
                              <div className="bg-white shadow-md rounded-lg p-4">
                                  <p className="font-semibold text-gray-900 text-lg mb-1"><strong>E-mail:</strong> {user.Email}</p>
                              </div>
                          </div>
                      </>
                  )}
              </div>
          </div>
          <Footer />
      </>
  );
}

export default SearchUser;