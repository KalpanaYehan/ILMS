
import React, { useState, useRef,useContext } from 'react';

import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios'
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

function ReturnBook() {

  // const location = useLocation();
  // const { userType, userData } = location.state || {};
  let customerResponse, bookResponse, recordResponse;
  const {user} = useContext(AuthContext)
  const [customerId, setCustomerId] = useState('');
  //const [userDetails, setUserDetails] = useState(null);
  const [bookId, setBookId] = useState('');
  //const [bookDetails, setBookDetails] = useState(null);
  //const [recordDetails, setRecordDetails] = useState(null);

  const [error, setError] = useState(null);

  // Reference for the details section
  const detailsRef = useRef(null);


  const [customer, setCustomer] = useState({});
  const [book, setBook] = useState({});
  const [record, setRecord] = useState(null);
  const [fine, setFine] = useState(0);
  const Admin_ID = user ? user.userId : null;


  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
  let day = String(currentDate.getDate()).padStart(2, '0');

  const date = `${year}-${month}-${day}`

  
  const handleSubmit = async (e) => {

    e.preventDefault();


    setCustomer(null);
    setBook(null);
    setRecord(null);
    setError(null);
    

    //const user = users.find((user) => user.id === userId);
    //const book = books.find((book) => book.id === bookId);
    //const record = waitingList.find((record) => record.userId === userId && record.bookId === bookId);


   
      
  try{
      customerResponse = await axios.get('http://localhost:8081/user/' + customerId);
      setCustomer(customerResponse.data);
      console.log(customerResponse.data)
  }catch (err) {
      console.log(err);
      setError('User not found');
  };
      // Fetch book details
      
  try{
      bookResponse = await axios.get('http://localhost:8081/getBook/' + bookId);
      setBook(bookResponse.data);
      console.log(bookResponse.data)
  }catch (err) {
      console.log(err);
      setError('Book not found');
  };
      
  try {
    // Fetch user details
    recordResponse = await axios.get('http://localhost:8081/issueDetails' ,{
      params: {
        customerId,  
        bookId  }
    })
    setRecord(recordResponse.data);
    console.log(recordResponse.data)
    if (recordResponse.data) {
      const Returned_Date = new Date(date);  // Convert string date to Date object
      const Issued_Date = new Date(recordResponse.data.Issued_Date);  // Convert issued date to Date object
      // Calculate the difference in time (in milliseconds)
      const timeDifference = Returned_Date - Issued_Date;
      // Convert the time difference from milliseconds to days
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      // Calculate fine if there's a delay
      const calculatedFine = daysDifference - 14 > 0 ? (daysDifference -14) * 5 : 0;

      setFine(calculatedFine);
  } 
  }catch (err) {
      console.log(err);
      setError('Record not found');
  };
      
  if (customerResponse && bookResponse && recordResponse) {
    detailsRef.current.scrollIntoView({ behavior: 'smooth' }); 
  }
  // }else{
  //   setError('Already returned');
  // }
};




  //   await axios.post('http://localhost:8081/issueDetails', {customerId, bookId})
  //   .then(res => {
  //     setRecord(res.data)
  //     if (record) {
  //       const Returned_Date = new Date(date);  // Convert string date to Date object
  //       const Issued_Date = new Date(record.Issued_Date);  // Convert issued date to Date object
  //       // Calculate the difference in time (in milliseconds)
  //       const timeDifference = Returned_Date - Issued_Date;
  //       // Convert the time difference from milliseconds to days
  //       const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  //       // Calculate fine if there's a delay
  //       const calculatedFine = daysDifference - 14 > 0 ? (daysDifference -14) * 5 : 0;

  //       setFine(calculatedFine);
  //     // setRecordDetails({ 
  //     // id: record.Issue_ID, 
  //     //           bookId: record.Book_ID, 
  //     //           date: record.Issued_Date, 
  //     //           userId: record.Member_ID ,
  //     //           fine: fine
  //     //         });
              
  //     } else {
  //             setError('Record not found');
  //     }
  //           console.log(res.data[0])
  //   })
  //   .catch(err => console.log(err));

        
  //   await axios.get('http://localhost:8081/user/' + customerId)
  //   .then(res => {
  //     setCustomer(res.data[0])
  //     if (!customer) {
  //       // setUserDetails({ 
  //       //       id: user.Member_ID, 
  //       //       firstName: user.First_Name, 
  //       //       lastName: user.Last_Name, 
  //       //       email: user.Email, 
  //       //       phoneNumber: user.Contact_No,
  //       //       password: user.Password,
  //       //       nic: user.nic, 
  //       //       img: user.img 
  //       //   });
  //       setError('User not found');
  //     } 
  //         console.log(res.data[0])
  //   })
  //   .catch(err => console.log(err));


  //   await axios.get('http://localhost:8081/book/' + bookId)
  //   .then(res => {
  //     setBook(res.data[0])
  //     if (!book) {
  //       // setBookDetails({
  //       //       id: book.Title_ID,
  //       //       title: book.Title_name,
  //       //       author: book.Name,
  //       //       img: book.img,
  //       //       availability: book.Status,
  //       //   });
  //       //   } else {
  //           setError('Book not found');
  //         }
  //         console.log(res.data[0])
  //       } 
  //       )
  //     .catch(err => console.log(err));


  //   // Scroll to details section if all details are found
  //   if (user && book && record) {
  //      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    const id = record.Issue_ID;
    await axios.post('http://localhost:8081/returnbook/', {id, date,fine})
        .then(res => {
            window.alert(res.data.Message);
            setCustomer(null);
            setBook(null);
            setRecord(null);
            setError(null);
            setCustomerId('')
            setBookId('')

            } 
        )
        .catch(err => console.log(err));
  };



  // Card components within the ReturnBook component
  const UserCard = ({customer}) => {
    if (!customer) return null; // Ensure userDetails is not null
    return (
    <div className="flex shadow-md rounded-lg p-4 my-4 bg-white">
      {/* <div className="flex-shrink-0">
        <img className="h-24 w-24 rounded-full" src={userDetails.img} alt={userDetails.firstName + userDetails.lastName} />
      </div> */}
      <div className="ml-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">User Details</h2>
        <p className="text-gray-700"><strong>First Name:</strong> {customer.First_name}</p>
        <p className="text-gray-700"><strong>Last Name:</strong> {customer.Last_name}</p>
        {/* <p className="text-gray-700"><strong>NIC:</strong> {customer.nic}</p> */}
        <p className="text-gray-700"><strong>Phone Number:</strong> {customer.Contact_No}</p>
        <p className="text-gray-700"><strong>E-mail:</strong> {customer.Email}</p>

      </div>
    </div>
  )};


  const BookCard = ({book}) => {
    if (!book) return null; // Ensure bookDetails is not null
    return (
    <div className="flex shadow-md rounded-lg p-4 my-4 bg-white">
      {/* <div className="flex-shrink-0">
        <img className="h-24 w-24 rounded-lg" src={bookDetails.img} alt={bookDetails.title} />
      </div> */}
      <div className="ml-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Book Details</h2>
        <p className="text-gray-700"><strong>Title:</strong> {book.Title_name}</p>
        <p className="text-gray-700"><strong>Author:</strong> {book.Author}</p>

      </div>
    </div>
  )};

  const RecordCard = ({record}) => {
    if (!record) return null; // Ensure recordDetails is not null

  
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

          <p className="text-gray-700"><strong>Record ID:</strong> {record.Issue_ID}</p>
          <p className="text-gray-700"><strong>Issued Date:</strong> {formatDate(record.Issued_Date)}</p>
          <p className="text-gray-700"><strong>Fine:</strong> {fine} Rupees</p>

        </div>
      </div>
    );
  };
  
  return (
    <>

      <Navbar/>

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

                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}

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


          {record && (
            <div ref={detailsRef}>
              <RecordCard record={record} />
              <UserCard customer={customer} />
              <BookCard book={book} />

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

