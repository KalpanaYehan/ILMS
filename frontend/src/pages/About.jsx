import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const About = () => {

  const location = useLocation();
  const { userType, userData } = location.state || {};

  return (
    <>
      <Navbar type={userType} data={userData}/>
      <div className='min-h-screen bg-customYellow'>
      About
      </div>
      <Footer/>
    </>
  )
}

export default About
