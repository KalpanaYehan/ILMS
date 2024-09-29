import { useState } from "react" 
import { useNavigate } from 'react-router-dom';
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
    },
    {
        id :4,
        name : "About",
        link : "/about"
    },
]
const userMenu = [
    {
        id : 1,
        name : "Home",
        link :'/home'
    },
    {
        id :2,
        name : "Books",
        link : "/books"
    },
    {
        id :3,
        name : "About",
        link : "/about"
    },
]

const Navbar = (props) => {

const navigate = useNavigate();

const[dropDownOpen,setDropDownOpen] =useState(false)
const toggleDropdown = ()=>{
    setDropDownOpen(!dropDownOpen)
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
    {props.type === 'admin' ? (
        Menu.map((menu) => (
            <li key={menu.id}>
                <button 
    onClick={() => navigate(menu.link, { state: { userType: props.type, userData: props.data } })}
    className='inline-block text-xl py-4 text-white/70 hover:text-white hover:scale-110 duration-200'
>
    {menu.name}
</button>

            </li>
        ))
    ) : (
        userMenu.map((menu) => (
            <li key={menu.id}>
                <button 
    onClick={() => navigate(menu.link, { state: { userType: props.type, userData: props.data } })}
    className='inline-block text-xl py-4 text-white/70 hover:text-white hover:scale-110 duration-200'
>
    {menu.name}
</button>

            </li>
        ))
    )}
</ul>

                    <div className="relative">
                        <button onClick={toggleDropdown} href='#' className='font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider'>
                            <img src={props.data.img} alt="user" className='w-14 rounded-full hover:scale-105 duration-200 cursor-pointer'/>
                            
                        </button>
                        {dropDownOpen && (
                            <div className='absolute right-0 mt-1 w-24 bg-white rounded-md shadow-lg py-2 z-20'>
                            <button onClick={() => navigate('/profile', { state: { userType: props.type, userData: props.data } })} className='block px-4 py-2 w-full text-gray-800 hover:bg-gray-200'>
                                Profile
                            </button>
                            <button onClick={() => navigate('/')} className='block px-4 py-2 w-full text-gray-800 hover:bg-gray-200'>
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