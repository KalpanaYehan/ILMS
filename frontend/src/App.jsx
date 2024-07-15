import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import BookSearch from './pages/BookSearch'
import Users from './pages/Users'
import About from './pages/About'
import Help from './pages/Help'

const App = () => {
  return (
    <div className='bg-customYellow'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
        <Route path='/books' element={<BookSearch/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/help' element={<Help/>}></Route>
      </Routes>
      
    </div>
    
  )
}

export default App
