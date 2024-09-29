import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';

function ReturnBook() {

  const location = useLocation();
  const { userType, userData } = location.state || {};

  const [userId, setUserId] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [bookId, setBookId] = useState('');
  const [bookDetails, setBookDetails] = useState(null);
  const [recordDetails, setRecordDetails] = useState(null);
  const [error, setError] = useState(null);

  // Reference for the details section
  const detailsRef = useRef(null);

  const users = [
    { id: '1001U', firstName: 'Emily', lastName: 'Johnson', email: 'emily.johnson@example.com', phoneNumber: '555-1234',password: '1234',nic: '1100', img: 'https://themesbrand.com/velzon/html/corporate/assets/images/users/avatar-4.jpg' },
    { id: '1002U', firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', phoneNumber: '555-5678',password: '5678',nic: '1200', img: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2189' },
    { id: '1003U', firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com', phoneNumber: '555-8765',password: '2468',nic: '1300', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&s' },
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
      availability:"true"
    },
    {
      id: '1004B',
      title: "The Lord of the Rings",
      author: "J R R Tolkien",
      img: "https://i0.wp.com/quicksilvertranslate.com/wp-content/uploads/top-books-learn-english-2.jpg",
      availability:"false"
    },
  ];

  const waitingList = [
    { id: '1001R', bookId: "1001B", date: '2024-8-21', userId: "1001U" },
    { id: '1002R', bookId: "1002B", date: '2024-8-21', userId: "1002U" },
    { id: '1003R', bookId: "1003B", date: '2024-8-22', userId: "1003U" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserDetails(null);
    setBookDetails(null);
    setRecordDetails(null);
    setError(null);

    const user = users.find((user) => user.id === userId);
    const book = books.find((book) => book.id === bookId);
    const record = waitingList.find((record) => record.userId === userId && record.bookId === bookId);

    if (user) {
      setUserDetails(user);
    } else {
      setError('User not found');
    }

    if (book) {
      setBookDetails(book);
    } else {
      setError('Book not found');
    }

    if (record) {
      setRecordDetails(record);
    } else {
      setError('Record not found');
    }

    // Scroll to details section if all details are found
    if (user && book && record ) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log({
      userId,
      bookId,
      date: new Date(recordDetails.date),
      returnDate: new Date()
    });
    window.alert("Book returned");
  };

  // Card components within the ReturnBook component
  const UserCard = ({ user }) => (
    <div className="flex shadow-md rounded-lg p-4 my-4 bg-white">
      <div className="flex-shrink-0">
        <img className="h-24 w-24 rounded-full" src={user.img} alt={user.name} />
      </div>
      <div className="ml-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">User Details</h2>
        <p className="text-gray-700"><strong>First Name:</strong> {user.firstName}</p>
        <p className="text-gray-700"><strong>Last Name:</strong> {user.lastName}</p>
        <p className="text-gray-700"><strong>NIC:</strong> {user.nic}</p>
        <p className="text-gray-700"><strong>Phone Number:</strong> {user.phoneNumber}</p>
        <p className="text-gray-700"><strong>E-mail:</strong> {user.email}</p>
      </div>
    </div>
  );

  const BookCard = ({ book }) => (
    <div className="flex shadow-md rounded-lg p-4 my-4 bg-white">
      <div className="flex-shrink-0">
        <img className="h-24 w-24 rounded-lg" src={book.img} alt={book.title} />
      </div>
      <div className="ml-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Book Details</h2>
        <p className="text-gray-700"><strong>Title:</strong> {book.title}</p>
        <p className="text-gray-700"><strong>Author:</strong> {book.author}</p>
      </div>
    </div>
  );

  const RecordCard = ({ record }) => (
    <div className="flex shadow-md rounded-lg p-4 my-4 bg-white">
      <div className="ml-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Record Details</h2>
        <p className="text-gray-700"><strong>Record ID:</strong> {record.id}</p>
        <p className="text-gray-700"><strong>Date:</strong> {record.date}</p>
      </div>
    </div>
  );

  return (
    <>
      <Navbar type={userType} data={userData}/>
      {/*<h1 className='text-4xl font-bold text-gray-900 text-center mt-3 mb-4'>Return a Book</h1>*/}
      <div className="relative mx-auto max-w-5xl text-center my-5">
            <span className="bg-clip-text bg-gradient-to-r from-secondary to-gray-900 font-extrabold text-transparent text-4xl sm:text-4xl">
            Return a Book
            </span>
            </div>
      <img src='https://cassandraolearyauthor.com/wp-content/uploads/2023/11/Depositphotos_76847815_S.jpg' className='w-lg max-w-xl justify-center mx-auto rounded-xl h-[384px] w-[576px]' alt="Books" />
      <div className='min-h-screen flex justify-center bg-white'>
        <div className="w-full max-w-xl">
          <form onSubmit={handleSubmit}>
            <div className="my-5">
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
            <div className="my-5">
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

          {recordDetails && (
            <div ref={detailsRef}>
              <RecordCard record={recordDetails} />
              <UserCard user={userDetails} />
              <BookCard book={bookDetails} />
              <button type="submit" onClick={handleClick} className="w-full justify-center mx-2 my-5 flex rounded-md bg-gradient-to-r from-secondary to-secondary/90 bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Return Book</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReturnBook;
