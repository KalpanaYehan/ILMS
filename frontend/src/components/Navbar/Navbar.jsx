import { useState,useContext} from "react" 
import { useNavigate } from "react-router-dom"
import Logo from "../../assets/website/newLogo.jpg"
import User from "../../assets/website/user.jpg"
import React from "react"
import axios from 'axios'
import { AuthContext } from "../../context/AuthContext"


const Menu = [
    {
        id : 1,
        name : "Home",
        link :'/home'
    },
    // {
    //     id : 2,
    //     name : "Users",
    //     link :"/users"
    // },
    {
        id :3,
        name : "Books",
        link : "/books"
    },
    // {
    //     id :4,
    //     name : "About",
    //     link : "/about"
    // },
  
]

const Navbar = () => {

  const{user} =useContext(AuthContext)
  const navigate = useNavigate();
  const[dropDownOpen,setDropDownOpen] =useState(false)
  axios.defaults.withCredentials = true

  const toggleDropdown = ()=>{
    setDropDownOpen(!dropDownOpen)
  }

  const handleLogout=()=>{
    // Remove JWT token from cookies or localStorage
    
    axios
        .post('http://localhost:8081/logout')
        .then((res)=>{
            if(res.data.message ==="Logged out successfully"){
                document.cookie = 'accesstoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
                localStorage.removeItem('user')
                // enqueueSnackbar('successfully logged out', { variant: 'success' });
                navigate('/');
            }
        })
        .catch((err)=>{
            console.log(err)
        }) 
    }

  return (
    <div className='bg-gradient-to-r from-secondary/70 to-secondary/20 bg-gray-900 text-white'>
        <div className='container py-2'>
            <div className='flex justify-between items-center pr-10 pl-10'>
                {/* Logo section */}
                <div data-aos = 'fade-down' data-aos-once = 'true'>
                    <a href='#' className='font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider'>
                        <img src={Logo} alt="logo" className='w-14 rounded-lg'/>
                        NexLib
                    </a>
                </div>
                 {/* Link section */}
                <div
                data-aos="fade-down"
                data-aos-once="true"
                data-aos-delay="300"
                className="flex justify-between items-center gap-4"
                >
                    <ul className='hidden sm:flex items-center gap-4'>
                        {Menu.map((menu) =>(
                            <li key = {menu.id}>
                                <a href={menu.link} className='inline-block text-xl py-4 textwhite/70  hover:text-white hover:scale-110 duration-200'>
                                    {menu.name}
                                </a>
                            </li> 
                        ))}
                        {/* Conditionally render the "Users" link if the user is an admin */}
                        {user && user.role === 'user' && (
                            <li key="4">
                                <a href="/about" className='inline-block text-xl py-4 text-white  hover:scale-110 duration-200'>
                                    About
                                </a>
                            </li>
                        )}
                           {/* Conditionally render the "Users" link if the user is an admin */}
                           {user && user.role === 'admin' && (
                            <li key="2">
                                <a href="/users" className='inline-block text-xl py-4 text-white  hover:scale-110 duration-200'>
                                    Users
                                </a>
                            </li>
                        )}

                    </ul>
                    <div className="relative">
                        <button onClick={toggleDropdown} href='#' className='font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider'>
                            <img src={User} alt="user" className='w-14 rounded-full hover:scale-105 duration-200 cursor-pointer'/>
                            
                        </button>
                        {dropDownOpen && (
                            <div className='absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-2 z-20'>
                            <a href="/profile" className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>
                                Profile
                            </a>
                            {/* <a href="/" className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>
                                Logout
                            </a> */}
                            <button className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200' onClick={handleLogout}>
                                Logout
                            </button>
                            
                            </div>
                        )}
                    </div>
                    {/* <button className='bg-primary/70 hover:scale-105 duration-200 text-white px-4 py-2 rounded-full flex items-center gap-3'>
                        Order 
                        <FaCoffee className="text-xl text-white drop-shadow-sm cursor-pointer" />
                    </button> */}
                </div>

            </div>
        </div>
    </div>
  )
}

export default Navbar