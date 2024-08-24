import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import BookSearch from './pages/BookSearch'
import RemoveBook from './pages/RemoveBook'
import About from './pages/Books'
import AddBook from './pages/AddBook'

import Books from './pages/Books'
import Help from './pages/Help'
import Login from './pages/Login'
import SearchUser from './pages/SearchUser'
import Users from './pages/Users'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <div className='bg-customYellow'>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/Home' element={<Home/>}></Route> 
        <Route path='/users' element={<Users/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/books' element={<Books/>}></Route>
        <Route path='/books/add' element={<AddBook/>}></Route>
        <Route path='/books/remove' element={<RemoveBook/>}></Route>
        <Route path='books/search' element={<BookSearch/>}></Route>
        <Route path='/help' element={<AddBook/>}></Route>
      </Routes>
    </div>
    
  )
}

export default App
