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
      <div className="min-h-screen ">
        <section
          id="features"
          className="relative block px-6 py-10 md:py-20 md:px-10"
        >
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-gray-900 sm:text-4xl">
              Manage User Accounts
            </span>
            <h2 className="flex items-center justify-center w-full my-3 text-xl font-medium tracking-wider text-gray-700">
              Easily manage and track user accounts with streamlined tools
            </h2>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-10 mx-auto max-w-7xl pt-14 sm:grid-cols-2 lg:grid-cols-3">
            <div
              onClick={() => handleNavigate('/users/search')}
              className="relative flex flex-col gap-4 px-0 py-4 mx-4 duration-200 shadow-lg cursor-pointer rounded-xl bg-primary/20 hover:text-white hover:scale-110"
            >
              <div className="mb-1">
                <img
                  src="https://media.istockphoto.com/id/1271072224/photo/hand-using-laptop-and-press-screen-to-search-browsing-on-the-internet-online.jpg?b=1&s=612x612&w=0&k=20&c=fD9joNxvw48aTCcmvbepRV_UzLy_PazXv78O6a-57qw="
                  alt="Search Users"
                  className="rounded-xl w-[90%] h-70 mx-auto"
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="px-3 space-y-3">
                  <h1 className="text-2xl font-bold text-center text-black/80 font-cursive2">
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
              className="relative flex flex-col gap-4 px-0 py-4 mx-4 duration-200 shadow-lg cursor-pointer rounded-xl bg-primary/20 hover:text-white hover:scale-110"
            >
              <div className="mb-1">
                <img
                  src="https://live.staticflickr.com/8078/8314929977_28fd740070_b.jpg"
                  alt="Issue a Book"
                  className="rounded-xl w-[90%] h-70 mx-auto"
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="px-3 space-y-3">
                  <h1 className="text-2xl font-bold text-center text-black/80 font-cursive2">
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
              className="relative flex flex-col gap-4 px-0 py-4 mx-4 duration-200 shadow-lg cursor-pointer rounded-xl bg-primary/20 hover:text-white hover:scale-110"
            >
              <div className="mb-1">
                <img
                  src="https://alliancefrancaise.lk/wp-content/uploads/2022/05/library.jpg"
                  alt="Return a Book"
                  className="rounded-xl w-[90%] h-70 mx-auto"
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="px-3 space-y-3">
                  <h1 className="text-2xl font-bold text-center text-black/80 font-cursive2">
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

export default Users;