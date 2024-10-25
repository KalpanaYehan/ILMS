
import React, { useEffect } from 'react';
import Pic from '../assets/website/newPic.jpg';
import PopulerBooks from '../components/PopularBooks/PopularBooks';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ChatBot from '../components/ChatBot/ChatBot.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; 

  useEffect(() => {
    
    axios
      .get('https://vercel.com/api/toolbar/link/ilms.vercel.app?via=deployment-domains-list&p=1&page=/home')
      .then((response) => {
        console.log(response.data); 
        if (response.data.message !== "success") {
          navigate('/'); 
        }
      })
      .catch((error) => {
        console.error(error); 
        navigate('/');
      });
  }, []); // Include `navigate` as a dependency

  return (
    <>
      <Navbar />
      <div className=''>
        <div className='w-full h-[60vh] bg-cover bg-center bg-fixed' 
          style={{
            backgroundImage: `url(${Pic})`,
            backgroundColor: '#f2f2f2'
          }}
        >
        </div>
        <div className=''>
          <h1 className='text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-secondary to-gray-900 my-6'>
            Welcome To NexLib
          </h1>
          <div className='text-lg text-gray-700 font-semibold max-w-7xl mx-auto text-justify px-10'>
            <p>
            The Interactive Library Management System (ILMS) is a cutting-edge, 
            all-inclusive system created to improve user experience and transform 
            library administration. The goal is to create an application that can 
            be used on mobile devices and the web to simplify and automate certain 
            library tasks. An intuitive user interface, advanced search options, 
            and a user forum for book reviews and discussions are some of the ILMS's 
            standout features. The system will also provide detailed author information, 
            book previews, and efficient circulation management, including return dates, 
            waiting lists, and pre-booking options. For the benefit of both library 
            employees and users, the overall goal of the ILMS is to produce a smooth, 
            effective, and enjoyable library experience.
            </p>
          </div>
        </div>
        <PopulerBooks />
        <ChatBot />
      </div>
      <Footer />
    </>
  );
};

export default Home;

