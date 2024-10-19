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
import ReturnBook from './pages/ReturnBook'
import GiveBook from './pages/GiveBook'
import Publishers from './pages/Publishers'
import Authors from './pages/Authors'
import { AuthProvider } from './context/AuthContext'
import UpdateBook from './pages/UpdateBook'
import UpdateAuthor from './pages/UpdateAuthor'
import UpdatePublisher from './pages/UpdatePublisher'
import BookDetails from './pages/BookDetails'
import AddAuthor from './pages/AddAuthor'
import AddPublisher from './pages/AddPublisher'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'



const App = () => {
  return (
    <div>
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
          <Route path='/books/details/:id' element={<BookDetails/>}></Route>
          <Route path='/books/edit/:id' element={<UpdateBook/>}></Route>
          <Route path='/books/books' element={<RemoveBook/>}></Route>
          <Route path='/books/search' element={<BookSearch/>}></Route>
          <Route path='/books/Publishers' element={<Publishers/>}></Route>
          <Route path='/books/Publishers/add' element={<AddPublisher/>}></Route>
          <Route path='/books/Publishers/edit/:id' element={<UpdatePublisher/>}></Route>
          <Route path='/books/Authors' element={<Authors/>}></Route>
          <Route path='/books/Authors/add' element={<AddAuthor/>}></Route>
          <Route path='/books/Authors/edit/:id' element={<UpdateAuthor/>}></Route>
          <Route path='/help' element={<AddBook/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
      </AuthProvider>
    </div>
    
  )
}

export default App
