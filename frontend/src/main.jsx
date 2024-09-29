import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import BookSearch from './pages/BookSearch'
import Users from './pages/Users'
import About from './pages/About'
import Help from './pages/Help'
import GiveBook from './pages/GiveBook'
import SearchUser from './pages/SearchUser'
import ReturnBook from './pages/ReturnBook'
import Profile from './pages/Profile.jsx'
import Books from './pages/Books.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/users",
    element: <Users/>,
  },
  {
    path: "/books",
    element: <Books/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/help",
    element: <Help/>,
  },
  {
    path: "/users/search",
    element: <SearchUser/>,
  },
  {
    path: "/users/issue",
    element: <GiveBook/>,
  },
  {
    path: "/users/return",
    element: <ReturnBook/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
