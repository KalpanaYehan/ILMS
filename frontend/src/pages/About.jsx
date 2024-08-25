import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Pict from "../../public/aboutImage1.jpg";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const About = () => {
  return (
    <>
      <Navbar />

      {/* Background Image */}
      <div
        className="w-full h-[90vh] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${Pict})`,
          backgroundColor: "#f2f2f2",
        }}
      ></div>

      {/* Infinite Auto-Scrolling Welcome Text */}
      <div className="mt-12 mb-2 text-center">
        <div className="relative h-20 mt-5 mb-5 overflow-hidden whitespace-nowrap">
          <div
            className="inline-block text-5xl text-gray-700"
            style={{
              animation: "scroll 20s linear infinite",
              display: "inline-flex",
            }}
          >
            <h1 className=" text-pink-950">👋🏻 Hello Book Lovers....</h1>
          </div>
        </div>

        <p className="mt-6 text-3xl text-center">
          Welcome to our library system, where we make it easier for you to
          explore, reserve, and access the books you love.
        </p>
      </div>

      {/* About Us Section */}
      <div className="p-8 text-white bg-gradient-to-r from-secondary to-gray-900">
        <div>
          <h2 className="text-4xl shadow-2xl mb-7 text-pink-950">
            📚 Who We Are
          </h2>
          <p className="text-lg">
            We are passionate about connecting people with books, improving
            access to the vast world of knowledge and imagination. Our system
            enables users to search for books in the library, reserve them, and
            check availability from the comfort of their own homes. No more
            guesswork or unnecessary trips—just a smooth and efficient library
            experience.
          </p>
        </div>
      </div>

      {/* Vision and Mission Section */}
      <div className="flex flex-col justify-center px-8 mt-12">
        {/* Vision */}
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-4xl"> Our Vision</h2>
          <p className="text-lg text-black">
            Our vision is to revolutionize the library experience by making it
            as simple and convenient as possible, empowering readers to engage
            with the books they love, whenever and wherever they are.
          </p>
        </div>

        {/* Horizontal Line */}
        <hr className="border border-gray-300 my-8 mx-auto w-[70%]" />

        {/* Mission */}
        <div className="mt-8 text-center">
          <h2 className="mb-4 text-4xl"> Our Mission</h2>
          <p className="text-lg text-black">
            Our mission is to create an accessible and efficient system that
            allows users to search, reserve, and check the availability of books
            in the library, all without needing to visit the library in person.
          </p>
        </div>
      </div>

      <hr className="border border-gray-300 my-8 mx-auto w-[70%]" />

      {/* Team Section */}
      <div className="mt-12">
        <h1 className="mb-10 text-4xl text-center">Introducing Our Team</h1>

        {/* Team Members */}
        <div className="flex justify-center space-x-10">
          {/* Team Member 1 */}
          <div className="relative flex flex-col items-center text-center group">
            <img
              src="/peopleImage1.jpeg"
              alt="Team Member 1"
              className="object-cover w-48 h-48 rounded-full shadow-md"
            />
            <h3 className="mt-4 text-xl">John Doe</h3>
            <div className="flex mt-2 space-x-4">
              <a href="#" className="text-blue-700 hover:text-blue-900">
                <FaLinkedin size={30} />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-800">
                <FaInstagram size={30} />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-900">
                <FaFacebook size={30} />
              </a>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="relative flex flex-col items-center text-center group">
            <img
              src="/peopleImage2.jpeg"
              alt="Team Member 2"
              className="object-cover w-48 h-48 rounded-full shadow-md"
            />
            <h3 className="mt-4 text-xl">Jane Smith</h3>
            <div className="flex mt-2 space-x-4">
              <a href="#" className="text-blue-700 hover:text-blue-900">
                <FaLinkedin size={30} />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-800">
                <FaInstagram size={30} />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-900">
                <FaFacebook size={30} />
              </a>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="relative flex flex-col items-center text-center group">
            <img
              src="/peopleImage3.jpg"
              alt="Team Member 3"
              className="object-cover w-48 h-48 rounded-full shadow-md"
            />
            <h3 className="mt-4 text-xl">Emily Johnson</h3>
            <div className="flex mt-2 space-x-4">
              <a href="#" className="text-blue-700 hover:text-blue-900">
                <FaLinkedin size={30} />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-800">
                <FaInstagram size={30} />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-900">
                <FaFacebook size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* CSS for Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </>
  );
};

export default About;
