import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'

function GiveBook() {

    const location = useLocation();
    const { userType, userData } = location.state || {};

    const [userId, setUserId] = useState('');
    const [userDetails, setUserDetails] = useState(null);

    const [bookId, setBookId] = useState('');
    const [bookDetails, setBookDetails] = useState(null);

    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        userId: '',
        bookId: '',
        date: ''
    });

    const [user, setUser] = useState({});
    const [book, setBook] = useState({});

    const Admin_ID = userData.id;

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
    let day = String(currentDate.getDate()).padStart(2, '0');
    const Issued_Date = `${year}-${month}-${day}`;

    // Create a reference for the details section
    const detailsRef = useRef(null);

    {/*
    const users = [
        { id: '1001U', firstName: 'Emily', lastName: 'Johnson', email: 'emily.johnson@example.com', phoneNumber: '555-1234', password: '1234', nic: '1100', img: 'https://themesbrand.com/velzon/html/corporate/assets/images/users/avatar-4.jpg' },
        { id: '1002U', firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', phoneNumber: '555-5678', password: '5678', nic: '1200', img: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2189' },
        { id: '1003U', firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com', phoneNumber: '555-8765', password: '2468', nic: '1300', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&s' },
    ];

    const books = [
        {
            id: '1001B',
            title: "Harry Potter",
            author: "J K Rowling",
            img: 'https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg',
            availability: "false"
        },
        {
            id: '1002B',
            title: "Men and Dreams",
            author: "Kochery C Shibu",
            img: "https://i.pinimg.com/736x/00/aa/87/00aa8776fb28fb2b2914d9d427a711ec.jpg",
            availability: "true"
        },
        {
            id: '1003B',
            title: "Charlottes Web",
            author: "E B white",
            img: "https://images-na.ssl-images-amazon.com/images/I/61%2B3z1o4oUL.jpg",
            availability: "true"
        },
        {
            id: '1004B',
            title: "The Lord of the Rings",
            author: "J R R Tolkien",
            img: "https://i0.wp.com/quicksilvertranslate.com/wp-content/uploads/top-books-learn-english-2.jpg",
            availability: "false"
        },
    ];

    */}

    const handleSubmit = (e) => {
        e.preventDefault();

        setUserDetails(null);
        setBookDetails(null);
        setError(null);

        //const user = users.find((user) => user.id === userId);
        //const book = books.find((book) => book.id === bookId);

        axios.get('http://localhost:8081/user/' + userId)
        .then(res => setUser(res.data[0])    
        )
        .catch(err => console.log(err));


        axios.get('http://localhost:8081/book/' + bookId)
        .then(res => setBook(res.data[0]) 
        )
        .catch(err => console.log(err));

        
        if (user) {
            setUserDetails({ 
                id: user.Member_ID, 
                firstName: user.First_Name, 
                lastName: user.Last_Name, 
                email: user.Email, 
                phoneNumber: user.Contact_No,
                password: user.Password,
                nic: user.nic, 
                img: user.img
            });
        } else {
            setError('User not found');
        }

        if (book) {
            setBookDetails({
                id: book.Title_ID,
                title: book.Title_name,
                author: book.Name,
                img: book.img,
                availability: book.Status,
            });
        } else {
            setError('Book not found');
        }

        // Scroll to details section if both user and book are found
        if (user && book) {
            detailsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleClick = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8081/issue', {Admin_ID, userId, bookId, Issued_Date})
        .then((res) => {
            console.log(res);
            window.alert(res.data.Message);
        })
        .catch((err) => console.log(err));

        

        {/*
        setFormData({
            userId,
            bookId,
            date: new Date().toISOString().slice(0, 10) // set the current date
        });
        console.log(formData);
        window.alert("Added to waiting list");
        */}
    };

    return (
        <>
            <Navbar type={userType} data={userData}/>
            {/*<h1 className='text-4xl font-bold text-gray-900 text-center mt-3 mb-4'>Issue a Book</h1>*/}
            <div className="relative mx-auto max-w-5xl text-center my-5">
            <span className="bg-clip-text bg-gradient-to-r from-secondary to-gray-900 font-extrabold text-transparent text-4xl sm:text-4xl">
            Issue a Book
            </span>
            </div>
            <img src='https://img.freepik.com/premium-photo/serious-students-using-laptop-library_107420-1926.jpg' className='w-lg max-w-xl justify-center mx-auto rounded-xl h-[384px] w-[576px]' alt="Books" />
            <div className='min-h-screen flex justify-center bg-white'>
                <div className="w-full max-w-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="my-5 inline-block mb-2">
                            <label className="text-gray-700 text-lg font-semibold mx-2" htmlFor="userId">User ID:</label>
                            <input
                                type="text"
                                id="userId"
                                placeholder='Enter user ID'
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="shadow appearance-none border rounded py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="my-5 inline-block">
                            <label className="text-gray-700 text-lg font-semibold mx-2" htmlFor="bookId">Book ID:</label>
                            <input
                                type="text"
                                id="bookId"
                                placeholder='Enter book ID'
                                value={bookId}
                                onChange={(e) => setBookId(e.target.value)}
                                className="shadow appearance-none border rounded py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full justify-center mx-2 flex rounded-md bg-gradient-to-r from-secondary to-secondary/90 bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                    </form>

                    {error && <div className="my-5 mx-2 block text-gray-700 text-md font-semibold mb-2">{error}</div>}

                    {/* Attach the detailsRef to this div */}
                    <div ref={detailsRef}>
                        {userDetails && (
                            <div className="my-5 mx-2 block rounded-lg shadow-lg p-4 bg-gray-100">
                                <div className="flex items-center">
                                    <img src={userDetails.img} alt="User" className="w-24 h-24 rounded-full mr-4" />
                                    <div>
                                        <h2 className="font-semibold text-gray-900 text-2xl mb-2">User Details</h2>
                                        <p className="font-semibold text-gray-900 text-lg mb-1"><strong>First Name:</strong> {userDetails.firstName}</p>
                                        <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Last Name:</strong> {userDetails.lastName}</p>
                                        <p className="font-semibold text-gray-900 text-lg mb-1"><strong>NIC:</strong> {userDetails.nic}</p>
                                        <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
                                        <p className="font-semibold text-gray-900 text-lg mb-1"><strong>E-mail:</strong> {userDetails.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {bookDetails && (
                            <div className="my-5 mx-2 block rounded-lg shadow-lg p-4 bg-gray-100">
                                <div className="flex items-center">
                                    <img src={bookDetails.img} alt="Book" className="w-24 h-24 rounded-lg mr-4" />
                                    <div>
                                        <h2 className="font-semibold text-gray-900 text-2xl mb-2">Book Details</h2>
                                        <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Title:</strong> {bookDetails.title}</p>
                                        <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Author:</strong> {bookDetails.author}</p>
                                        <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Availability:</strong> {bookDetails.availability === "false" ? "No" : "Yes"}</p>
                                    </div>
                                </div>
                            </div>
                        )}

{(bookDetails && userDetails && bookDetails.availability === 1) && (
    <button type="submit" onClick={handleClick} className="w-full justify-center mx-2 my-5 flex rounded-md bg-gradient-to-r from-secondary to-secondary/90 bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Add to waiting list
    </button>
)}

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default GiveBook;
