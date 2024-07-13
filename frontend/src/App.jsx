import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import PopularBooks from './components/PopularBooks/PopularBooks'

const App = () => {
  return (
    <div className='bg-customYellow'>
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
    
  )
}

export default App
