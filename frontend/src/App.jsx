import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import BookSearch from './pages/BookSearch'
import RemoveBook from './pages/RemoveBook'
import About from './pages/Books'
import AddBook from './pages/AddBook'
import Books from './pages/Books'
import Login from './pages/Login'
import SearchUser from './pages/SearchUser'
import Users from './pages/Users'
import SignUp from './pages/SignUp'
import ReturnBook from './pages/ReturnBook'
import GiveBook from './pages/GiveBook'
import Publishers from './pages/Publishers'
import Authors from './pages/Authors'
import { AuthProvider } from './context/AuthContext'



const App = () => {
  return (
    <div className='bg-customYellow'>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/Home' element={<Home/>}></Route> 
          <Route path='/users' element={<Users/>}></Route>
          <Route path='/users/search' element={<SearchUser/>}></Route>
          <Route path='/users/issue' element={<GiveBook/>}></Route>
          <Route path='/users/return' element={<ReturnBook/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/books' element={<Books/>}></Route>
          <Route path='/books/add' element={<AddBook/>}></Route>
          <Route path='/books/books' element={<RemoveBook/>}></Route>
          <Route path='/books/search' element={<BookSearch/>}></Route>
          <Route path='/books/Publishers' element={<Publishers/>}></Route>
          <Route path='/books/Authors' element={<Authors/>}></Route>
          <Route path='/help' element={<AddBook/>}></Route>
        </Routes>
      </AuthProvider>
    </div>
    
  )
}

export default App
