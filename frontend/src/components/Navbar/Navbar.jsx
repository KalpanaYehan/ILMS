import { useState } from "react" 
import Logo from "../../assets/website/newLogo.jpg"
import User from "../../assets/website/user.jpg"
import React from "react"


const Menu = [
    {
        id : 1,
        name : "Home",
        link :'/home'
    },
    {
        id : 2,
        name : "Users",
        link :"/users"
    },
    {
        id :3,
        name : "Books",
        link : "/books"
    }
    ,
    {
        id :4,
        name : "About",
        link : "/about"

    
 }
//  ,
//      {
//          id :5,
//          name : "Help",
//          link : "/help"
//      }
]

const Navbar = () => {

  const[dropDownOpen,setDropDownOpen] =useState(false)
  const toggleDropdown = ()=>{
    setDropDownOpen(!dropDownOpen)
  }
  return (
    <div className='text-white bg-gray-900 bg-gradient-to-r from-secondary/70 to-secondary/20'>
        <div className='container py-2'>
            <div className='flex items-center justify-between pl-10 pr-10'>
                {/* Logo section */}
                <div data-aos = 'fade-down' data-aos-once = 'true'>
                    <a href='#' className='flex items-center justify-center gap-2 text-2xl font-bold tracking-wider sm:text-3xl'>
                        <img src={Logo} alt="logo" className='rounded-lg w-14'/>
                        NexLib
                    </a>
                </div>
                 {/* Link section */}
                <div
                data-aos="fade-down"
                data-aos-once="true"
                data-aos-delay="300"
                className="flex items-center justify-between gap-4"
                >
                    <ul className='items-center hidden gap-4 sm:flex'>
                        {Menu.map((menu) =>(
                            <li key = {menu.id}>
                                <a href={menu.link} className='inline-block py-4 text-xl duration-200 textwhite/70 hover:text-white hover:scale-110'>
                                    {menu.name}
                                </a>
                            </li>
                        ))}

                    </ul>
                    <div className="relative">
                        <button onClick={toggleDropdown} href='#' className='flex items-center justify-center gap-2 text-2xl font-bold tracking-wider sm:text-3xl'>
                            <img src={User} alt="user" className='duration-200 rounded-full cursor-pointer w-14 hover:scale-105'/>
                            
                        </button>
                        {dropDownOpen && (
                            <div className='absolute right-0 z-20 w-48 py-2 mt-1 bg-white rounded-md shadow-lg'>
                            <a href="/profile" className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>
                                Profile
                            </a>
                            <a href="/" className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>
                                Logout
                            </a>
                            
                            </div>
                        )}
                    </div>
                    {/* <button className='flex items-center gap-3 px-4 py-2 text-white duration-200 rounded-full bg-primary/70 hover:scale-105'>
                        Order 
                        <FaCoffee className="text-xl text-white cursor-pointer drop-shadow-sm" />
                    </button> */}
                </div>

            </div>
        </div>
    </div>
  )
}

export default Navbar