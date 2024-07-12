import { useState } from "react" 
import Logo from "../assets/website/newLogo.jpg"
import User from "../assets/website/user.jpg"
import React from "react"


const Menu = [
    {
        id : 1,
        name : "Home",
        link :'/#'
    },
    {
        id : 2,
        name : "Users",
        link :"/#users"
    },
    {
        id :3,
        name : "Books",
        link : "/#books"
    },
    {
        id :4,
        name : "About",
        link : "/#about"
    },
    {
        id :5,
        name : "Help",
        link : "/#help"
    }
]

const Navbar = () => {

  const[dropDownOpen,setDropDownOpen] =useState(false)
  const toggleDropdown = ()=>{
    setDropDownOpen(!dropDownOpen)
  }
  return (
    <div className='bg-gradient-to-r from-secondary to-secondary/90 bg-gray-900 text-white'>
        <div className='container py-2'>
            <div className='flex justify-between items-center pr-10 pl-10'>
                {/* Logo section */}
                <div data-aos = 'fade-down' data-aos-once = 'true'>
                    <a href='#' className='font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider'>
                        <img src={Logo} alt="logo" className='w-14'/>
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
                                <a href={menu.link} className='inline-block text-xl py-4 textwhite/70 hover:text-white duration-200'>
                                    {menu.name}
                                </a>
                            </li>
                        ))}

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
                            <a href="/logout" className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>
                                Logout
                            </a>
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
