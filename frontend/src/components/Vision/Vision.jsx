import React from 'react';

const Vision = () => {
  return (
    <div 
     data-testid='vision'
    className="flex flex-col justify-center px-8 py-12 mt-12 bg-gray-100" >
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
      {/* Vision */}
      <div className="mx-5 mb-8 text-center">
        <h2 className="mb-4 text-4xl font-bold text-red-900 animate-fadeIn">Our Vision</h2>
        <p className="text-xl leading-relaxed text-gray-700">
          Our vision is to revolutionize the library experience by making it
          as simple and convenient as possible, empowering readers to engage
          with the books they love, whenever and wherever they are.
        </p>
      </div>

      <hr className="border border-red-900 my-8 mx-auto w-[70%]" />

      {/* Mission */}
      <div className="mx-5 mt-8 mb-8 text-center">
        <h2 className="mb-4 text-4xl font-bold text-red-900 animate-fadeIn">Our Mission</h2>
        <p className="text-xl leading-relaxed text-gray-700">
          Our mission is to create an accessible and efficient system that
          allows users to search, reserve, and check the availability of books
          in the library, all without needing to visit the library in person.
        </p>
      </div>

      {/* <hr className="border border-red-900 my-8 mx-auto w-[70%]" /> */}
    </div>
  );
};

export default Vision;