import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Users = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userType, userData } = location.state || {};

  const handleNavigate = (path) => {
    navigate(path, { state: { userType, userData } });
  };

  return (
    <>
      <Navbar type={userType} data={userData} />
      <div className="min-h-screen bg-customYellow">
        <section
          id="features"
          className="relative block px-6 py-10 md:py-20 md:px-10"
        >
          <div className="relative mx-auto max-w-5xl text-center">
            <span className="bg-clip-text bg-gradient-to-r from-secondary to-gray-900 font-extrabold text-transparent text-4xl sm:text-4xl">
              Manage User Accounts
            </span>
            <h2 className="w-full text-gray-700 my-3 flex items-center justify-center font-medium text-xl tracking-wider">
              Easily manage and track user accounts with streamlined tools
            </h2>
          </div>

          <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
            <div
              onClick={() => handleNavigate('/users/search')}
              className="flex flex-col gap-4 shadow-lg py-4 px-0 mx-4 rounded-xl bg-primary/20 relative cursor-pointer hover:text-white hover:scale-110 duration-200"
            >
              <div className="mb-1">
                <img
                  src="https://media.istockphoto.com/id/1271072224/photo/hand-using-laptop-and-press-screen-to-search-browsing-on-the-internet-online.jpg?b=1&s=612x612&w=0&k=20&c=fD9joNxvw48aTCcmvbepRV_UzLy_PazXv78O6a-57qw="
                  alt="Search Users"
                  className="rounded-xl w-[90%] h-70 mx-auto"
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="space-y-3 px-3">
                  <h1 className="text-2xl text-center font-bold text-black/80 font-cursive2">
                    Search Users
                  </h1>
                  <p className="text-sm text-center text-gray-600">
                    Allows you to find and retrieve information about the library users
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleNavigate('/users/issue')}
              className="flex flex-col gap-4 shadow-lg py-4 px-0 mx-4 rounded-xl bg-primary/20 relative cursor-pointer hover:text-white hover:scale-110 duration-200"
            >
              <div className="mb-1">
                <img
                  src="https://live.staticflickr.com/8078/8314929977_28fd740070_b.jpg"
                  alt="Issue a Book"
                  className="rounded-xl w-[90%] h-70 mx-auto"
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="space-y-3 px-3">
                  <h1 className="text-2xl text-center font-bold text-black/80 font-cursive2">
                    Issue a Book
                  </h1>
                  <p className="text-sm text-center text-gray-600">
                    Enables users to borrow a book, recording the transaction details
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleNavigate('/users/return')}
              className="flex flex-col gap-4 shadow-lg py-4 px-0 mx-4 rounded-xl bg-primary/20 relative cursor-pointer hover:text-white hover:scale-110 duration-200"
            >
              <div className="mb-1">
                <img
                  src="https://alliancefrancaise.lk/wp-content/uploads/2022/05/library.jpg"
                  alt="Return a Book"
                  className="rounded-xl w-[90%] h-70 mx-auto"
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="space-y-3 px-3">
                  <h1 className="text-2xl text-center font-bold text-black/80 font-cursive2">
                    Return a Book
                  </h1>
                  <p className="text-sm text-center text-gray-600">
                    Allows users to return a borrowed book to the library and updates the system
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Users;
