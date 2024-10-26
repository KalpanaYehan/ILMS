import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Pict from "../../public/aboutImage2.jpg";
import Vision from "../components/Vision/Vision";
import Team from "../components/Team/Team";
import Count from "../components/Count/Count";

const About = () => {
  return (
    <>
      <Navbar  />
      <div
        data-testid="background-div"
        className="w-full h-[60vh] bg-cover bg-center bg-fixed "
        style={{
          backgroundImage: `url(${Pict})`,
          backgroundColor: "#f2f2f2",
        }}
      ></div>
      <div className="mt-4 mb-4">
        <p className="text-3xl font-bold text-center text-amber-950">
          Immerse yourself in a world of knowledge and inspiration at your
          fingertips.
        </p>
      </div>
      <div className="container mx-auto mt-12 mb-8">
        <Count  />
      </div>

      {/* About Us Section */}
      <div className="container px-10 mx-auto ">
        <div className="p-6 mx-3 my-10 rounded-2xl">
          <p className="text-xl text-center">
            We are passionate about connecting people with books, improving
            access to the vast world of knowledge and imagination. Our system
            enables users to search for books in the library, reserve them, and
            check availability from the comfort of their own homes. No more
            guesswork or unnecessary trips—just a smooth and efficient library
            experience.
          </p>

          <Vision  />

          <Team  />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;


