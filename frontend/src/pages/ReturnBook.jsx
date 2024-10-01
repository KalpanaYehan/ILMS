import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'
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

  const [user, setUser] = useState({});
  const [book, setBook] = useState({});
  const [record, setRecord] = useState({});
  const [fine, setFine] = useState(0);

  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
  let day = String(currentDate.getDate()).padStart(2, '0');
  const date = `${year}-${month}-${day}`;

  const Admin_ID = userData.id;
  
  const handleSubmit = (e) => {
    e.preventDefault();

    setUserDetails(null);
    setBookDetails(null);
    setRecordDetails(null);
    setError(null);

    //const user = users.find((user) => user.id === userId);
    //const book = books.find((book) => book.id === bookId);
    //const record = waitingList.find((record) => record.userId === userId && record.bookId === bookId);

    axios.post('http://localhost:8081/return', {userId, bookId})
    .then(res => {
      setRecord(res.data[0])
      if (record) {
        const Returned_Date = new Date(date);  // Convert string date to Date object
        const Issued_Date = new Date(record.Issued_Date);  // Convert issued date to Date object

  // Calculate the difference in time (in milliseconds)
  const timeDifference = Returned_Date - Issued_Date;

  // Convert the time difference from milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  // Calculate fine if there's a delay
  const calculatedFine = daysDifference - 14 > 0 ? (daysDifference -14) * 5 : 0;

  setFine(calculatedFine);

        

              setRecordDetails({ 
                id: record.Issue_ID, 
                bookId: record.Book_ID, 
                date: record.Issued_Date, 
                userId: record.Member_ID ,
                fine: fine
              });
              
            } else {
              setError('Record not found');
            }
            //console.log(res.data[0])
            } 
        )
        .catch(err => console.log(err));

        axios.get('http://localhost:8081/user/' + userId)
        .then(res => {
          setUser(res.data[0])
          if (user) {
            setUserDetails({ 
              id: user.Member_ID, 
              firstName: user.First_Name, 
              lastName: user.Last_Name, 
              email: user.Email, 
              phoneNumber: user.Contact_No,
              password: user.Password,
              nic: '1100', 
              img: 'https://themesbrand.com/velzon/html/corporate/assets/images/users/avatar-4.jpg' 
          });
          } else {
            setError('User not found');
          }
          //console.log(res.data[0])
        }  
        )
        .catch(err => console.log(err));


        axios.get('http://localhost:8081/book/' + bookId)
        .then(res => {
          setBook(res.data[0])
          if (book) {
            setBookDetails({
              id: book.Title_ID,
              title: book.Title_name,
              author: book.Name,
              img: "https://images-na.ssl-images-amazon.com/images/I/61%2B3z1o4oUL.jpg",
              availability: book.Status,
          });
          } else {
            setError('Book not found');
          }
          //console.log(res.data[0])
        } 
        )
        .catch(err => console.log(err));


    // Scroll to details section if all details are found
    if (user && book && record) {

      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    const id = record.Issue_ID;



    //console.log(id, date)

    axios.post('http://localhost:8081/returnbook/', {id, date})
        .then(res => {
            window.alert(res.data.Message);
            } 
        )
        .catch(err => console.log(err));
  };

  // Card components within the ReturnBook component
  const UserCard = ({userDetails}) => {
    if (!userDetails) return null; // Ensure userDetails is not null
    return (
    <div className="flex shadow-md rounded-lg p-4 my-4 bg-white">
      <div className="flex-shrink-0">
        <img className="h-24 w-24 rounded-full" src={userDetails.img} alt={userDetails.firstName + userDetails.lastName} />
      </div>
      <div className="ml-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">User Details</h2>
        <p className="text-gray-700"><strong>First Name:</strong> {userDetails.firstName}</p>
        <p className="text-gray-700"><strong>Last Name:</strong> {userDetails.lastName}</p>
        <p className="text-gray-700"><strong>NIC:</strong> {userDetails.nic}</p>
        <p className="text-gray-700"><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
        <p className="text-gray-700"><strong>E-mail:</strong> {userDetails.email}</p>
      </div>
    </div>
  )};

  const BookCard = ({bookDetails}) => {
    if (!bookDetails) return null; // Ensure bookDetails is not null
    return (
    <div className="flex shadow-md rounded-lg p-4 my-4 bg-white">
      <div className="flex-shrink-0">
        <img className="h-24 w-24 rounded-lg" src={bookDetails.img} alt={bookDetails.title} />
      </div>
      <div className="ml-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Book Details</h2>
        <p className="text-gray-700"><strong>Title:</strong> {bookDetails.title}</p>
        <p className="text-gray-700"><strong>Author:</strong> {bookDetails.author}</p>
      </div>
    </div>
  )};

  const RecordCard = ({recordDetails}) => {
    if (!recordDetails) return null; // Ensure recordDetails is not null
  
    // Function to handle date formatting safely
    const formatDate = (date) => {
      if (!date) return 'N/A'; // Return 'N/A' if date is null or undefined
      const issuedDate = new Date(date);
      return isNaN(issuedDate) ? 'Invalid Date' : issuedDate.toISOString().slice(0, 10);
    };
  
    return (
      <div className="flex shadow-md rounded-lg p-4 my-4 bg-white">
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Record Details</h2>
          <p className="text-gray-700"><strong>Record ID:</strong> {recordDetails.id}</p>
          <p className="text-gray-700"><strong>Issued Date:</strong> {formatDate(recordDetails.date)}</p>
          <p className="text-gray-700"><strong>Fine:</strong> {recordDetails.fine} Rupees</p>
        </div>
      </div>
    );
  };
  
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
              <RecordCard recordDetails={recordDetails} />
              <UserCard userDetails={userDetails} />
              <BookCard bookDetails={bookDetails} />
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
