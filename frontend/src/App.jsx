import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import BookSearch from './pages/BookSearch'
import RemoveBook from './pages/RemoveBook'
import About from './pages/About'
import AddBook from './pages/AddBook'

import Books from './pages/Books'
import Login from './pages/Login'
import SearchUser from './pages/SearchUser'
import Users from './pages/Users'
import SignUp from './pages/SignUp'
import BookDetails from './pages/BookDetails';
//import Visualization from './pages/Visualization'
import Profile from './pages/Profile'
const App = () => {
  return (
    <div className=''>
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
        {/* <Route path='/help' element={<Visualization/>}></Route> */}
        <Route path='/Profile'element={<Profile/>}></Route>
        
        <Route path='/details/:id' element={<BookDetails />} />
      </Routes>
    </div>
    
  )
}

export default App
