import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import BookSearch from './pages/BookSearch'
import Users from './pages/Users'
import About from './pages/Books'
import AddBook from './pages/AddBook'

import Books from './pages/Books'


const App = () => {
  return (
    <div className='bg-customYellow'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/books' element={<Books/>}></Route>
        <Route path='/books/add' element={<AddBook/>}></Route>
        <Route path='/books/remove' element={<Books/>}></Route>
        <Route path='books/search' element={<BookSearch/>}></Route>
        <Route path='/help' element={<AddBook/>}></Route>
      </Routes>
    </div>
    
  )
}

export default App
