import React from "react";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const TeamMember = ({ name, image, linkedin, instagram, facebook }) => {
  return (
    <div className="relative flex flex-col items-center p-6 mb-6 text-center transition-shadow duration-300 bg-white rounded-lg shadow-lg group hover:shadow-xl">
      <img
        src={image}
        alt={`Team Member ${name}`}
        className="object-cover w-48 h-48 transition-transform duration-300 rounded-full shadow-md group-hover:scale-110"
      />
      <h3 className="mt-4 text-2xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-gray-900">{name}</h3>
      <div className="flex mt-4 space-x-4">
        <a href={linkedin} className="text-blue-700 transition-colors duration-300 hover:text-blue-900">
          <FaLinkedin size={30} />
        </a>
        <a href={instagram} className="text-pink-500 transition-colors duration-300 hover:text-pink-800">
          <FaInstagram size={30} />
        </a>
        <a href={facebook} className="text-blue-700 transition-colors duration-300 hover:text-blue-900">
          <FaFacebook size={30} />
        </a>
      </div>
    </div>
  );
};

export default TeamMember;