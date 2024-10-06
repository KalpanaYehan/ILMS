import React from 'react'
import Pic from '../assets/website/newPic.jpg'
import PopulerBooks from '../components/PopularBooks/PopularBooks'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ChatBot from '../components/ChatBot/ChatBot.jsx'

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className=''>
        <div className='w-full h-[60vh] bg-cover bg-center bg-fixed' 
          style={{
            backgroundImage:`url(${Pic})`,
            backgroundColor:'#f2f2f2'
          }}
        >
      </div>
        <div className=''>
            <h1 className='my-6 text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-secondary to-gray-900'>Welcome To NexLib</h1>
            
              <div className='max-w-6xl px-6 mx-auto text-lg font-semibold text-justify text-gray-700'>
                <p>The Interactive Library Management System (ILMS) is a cutting-edge, 
                    all-inclusive system created to improve user experience and transform 
                    library administration. The goal is to create an application that can 
                    be used on mobile devices and the web to simplify and automate certain 
                    library tasks. An intuitive user interface, advanced search options, 
                    and a user forum for book reviews and discussions are some of the ILMS's 
                    standout features. The system will also provide detailed author information, 
                    book previews, and efficient circulation management, including return dates, 
                    waiting lists, and pre-booking options. For the benefit of both library 
                    employees and users, the overall goal of the ILMS is to produce a smooth, 
                    effective, and enjoyable library experience.
                </p>
              </div>
            
           
        </div>
      <PopulerBooks/>
    </div>
    <Footer/>
    </>
  )
}

export default Home
