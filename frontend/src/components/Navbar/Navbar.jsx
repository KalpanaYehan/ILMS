import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/website/newLogo.jpg";
import User2 from "../../assets/website/member1.jpg";
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

const Menu = [
    {
        id: 1,
        name: "Home",
        link: '/home'
    },
    {
        id: 3,
        name: "Books",
        link: "/books"
    },
];

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [dropDownOpen, setDropDownOpen] = useState(false);
    axios.defaults.withCredentials = true;

    const toggleDropdown = () => {
        setDropDownOpen(!dropDownOpen);
    };

    const handleLogout = () => {
        axios.post('http://localhost:8081/logout')
            .then((res) => {
                if (res.data.message === "Logged out successfully") {
                    document.cookie = 'accesstoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                    localStorage.removeItem('user');
                    setUser(null);
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div 
        data-testid="navbar"
        className='text-white bg-gray-900 bg-gradient-to-r from-secondary/70 to-secondary/20'>
            <div className='py-2 mx-auto max-w-7xl'>
                <div className='flex items-center justify-between pl-10 pr-10'>
                    {/* Logo section */}
                    <div data-testid="navbar-logo" data-aos='fade-down' data-aos-once='true'>
                        <a href='#' className='flex items-center justify-center gap-2 text-2xl font-bold tracking-wider sm:text-3xl'>
                            <img src={Logo} alt="logo" className='rounded-lg w-14' />
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
                            {Menu.map((menu) => (
                                <li key={menu.id}>
                                    <a href={menu.link} className='inline-block py-4 text-xl duration-200 textwhite/70 hover:text-white hover:scale-110'>
                                        {menu.name}
                                    </a>
                                </li>
                            ))}
                            {user && user.role === 'user' && (
                                <li key="4">
                                    <a href="/about" className='inline-block py-4 text-xl text-white duration-200 hover:scale-110'>
                                        About
                                    </a>
                                </li>
                            )}
                            {user && user.role === 'admin' && (
                                <li key="2">
                                    <a href="/users" className='inline-block py-4 text-xl text-white duration-200 hover:scale-110'>
                                        Users
                                    </a>
                                </li>
                            )}
                            {user && user.role === 'admin' && (
                                <li key="5">
                                    <a href="/dashboard" className='inline-block py-4 text-xl text-white duration-200 hover:scale-110'>
                                        Dashboard
                                    </a>
                                </li>
                            )}
                        </ul>
                        <div className="relative">
                            <button data-testid="navbar-user-icon" onClick={toggleDropdown} href='#' className='flex items-center justify-center gap-2 text-2xl font-bold tracking-wider sm:text-3xl'>
                                <img       
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6KL23_akt_SZpwASF21jjgBbuHSV52G5E-uz2AVFuBWwOY2IRXadWB0XXBBupBkLUL1c&usqp=CAU"
                                    alt="user" 
                                    className='duration-200 rounded-full cursor-pointer w-14 hover:scale-105' 
                                />
                            </button>
                            {dropDownOpen && (
                                <div data-testid="dropdown-menu" className='absolute right-0 z-20 w-48 py-2 mt-1 bg-white rounded-md shadow-lg'>
                                    <a href="/profile" className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>
                                        Profile
                                    </a>
                                    <button data-testid="logout-button" className='block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200' onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

