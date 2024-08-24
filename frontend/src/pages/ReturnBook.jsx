import React, {useState} from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom';

function ReturnBook() {
    const [userId, setUserId] = useState('');
    const [userDetails, setUserDetails] = useState(null);

    const [bookId, setBookId] = useState('');
    const [bookDetails, setBookDetails] = useState(null);

    const [recordId, setRecordId] = useState('')
    const [recordDetails, setRecordDetails] = useState(null);

    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        userId: '',
        bookId: '',
        date: '',
        returnDate: ''
      });

    const waitingList = [{
      id:'1001R',
        bookId: "1001B",
        date: '2024-8-21',
        userId: "1001U"}]

  const users = [
    { id: '1001U', name: 'Alice Johnson', email: 'alice@example.com', phoneNumber: '555-1234',password: '1234',nic: '1100' },
    { id: '1002U', name: 'Bob Smith', email: 'bob@example.com', phoneNumber: '555-5678',password: '5678',nic: '1200' },
    { id: '1003U', name: 'Charlie Brown', email: 'charlie@example.com', phoneNumber: '555-8765',password: '2468',nic: '1300' },
  ];

  const books=[
    {
        id: '1001B',
       title: "Harry Potter",
       author: "J K Rowling",
       img : 'https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg',
       availability:"false"
     },
     {
        id: '1002B',
       title: "Men and Dreams",
       author: "Kochery C Shibu",
       img: "https://i.pinimg.com/736x/00/aa/87/00aa8776fb28fb2b2914d9d427a711ec.jpg",
       availability:"true"
     },
     {
       id: '1003B',
       title: "Charlottes Web",
       author: "E B white",
       img: "https://images-na.ssl-images-amazon.com/images/I/61%2B3z1o4oUL.jpg",
       availability:"true"
     },
     {
       id:'1004B',
       title: "The Lord of the Rings",
       author: "J R R Tolkien",
       img: "https://i0.wp.com/quicksilvertranslate.com/wp-content/uploads/top-books-learn-english-2.jpg",
       availability:"false"
     },
     {
       id: '1005B',
       title: "Magic",
       author: "Rhonda Byine",
       img: "https://booksbhandara.com/wp-content/uploads/2023/03/the-magic.jpg",
       availability:"true"
     },
     {
      id: '1006B',
       title: "Solar Bones",
       author: "Mike McCormack",
       img: "https://s26162.pcdn.co/wp-content/uploads/2019/11/A1NfEjobJnL-691x1024.jpg",
       availability:"true"
     }
   ]

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setUserDetails(null);
    setBookDetails(null);
    setRecordDetails(null);
    setError(null);

    const user = users.find((user) => user.id === userId);
    const book = books.find((book) => book.id === bookId);
    const record = waitingList.find((record) => record.userId == userId && record.bookId == bookId)

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
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormData({
      userId: document.getElementById('userId').value,
      bookId: document.getElementById('bookId').value,
      date: new Date(recordDetails.date),
      returnDate: new Date()
    })
    console.log(formData)
    window.alert("Book returned")
  };

  return (
    <>
      <Navbar/>
      <h1 className='text-4xl font-bold text-gray-900 text-center mt-3 mb-4'>Return a book</h1>
      <div className='min-h-screen flex justify-center bg-white'>
      <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="my-5 inline-block">
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
          <label className="text-gray-700 text-lg font-semibold mx-2" htmlFor="userId">Book ID:</label>
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
        <div className="my-5 mx-2 block text-gray-900 text-md font-semibold mb-2">
          <h2 className="font-semibold text-gray-900 text-2xl mb-2">Record details</h2>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>ID:</strong> {recordDetails.id}</p>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Date:</strong> {recordDetails.date}</p>
          
        </div>
      )}

      {recordDetails && (
        <div className="my-5 mx-2 block text-gray-900 text-md font-semibold mb-2">
          <h2 className="font-semibold text-gray-900 text-2xl mb-2">User Details</h2>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Name:</strong> {userDetails.name}</p>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>NIC:</strong> {userDetails.nic}</p>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>E-mail:</strong> {userDetails.email}</p>
          
        </div>
      )}

{recordDetails && (
        <div className="my-5 mx-2 block text-gray-900 text-md font-semibold mb-2">
          <h2 className="font-semibold text-gray-900 text-2xl mb-2">Book Details</h2>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Title:</strong> {bookDetails.title}</p>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Author:</strong> {bookDetails.author}</p>
          <p className="font-semibold text-gray-900 text-lg mb-1"><strong>Image:</strong> <img className='h-72' src={bookDetails.img}></img></p>
          
        </div>
      )}

{recordDetails && (
    <button type="submit" onClick={handleClick} className="w-full justify-center mx-2 my-5 flex rounded-md bg-gradient-to-r from-secondary to-secondary/90 bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Return book</button>
) }

      
    </div>
      </div>
      <Footer/>
    </>
  )
}

export default ReturnBook