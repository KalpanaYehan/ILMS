import React, { useState,useEffect } from 'react';
// import { Posts } from '../assets/Content';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import DeleteModal from '../components/models/DeleteModal';
//import Trash from './icons/trash.jpg'

function RemoveBook() {
  const [posts, setPost] = useState([]);
  const [books,setBook] = useState([])
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortBy, setSortBy] = useState('ascending');
  const [result, setResult] = useState();
  const [open,setOpen] = useState(false)
  const [selectedBookId, setSelectedBookId] = useState(null);

  useEffect(()=>{
    // setLoading(true)
    axios
        .get('http://localhost:8081/getBooks')
        .then((response)=>{
            // if(response.data.message !== "success") {
            //     // navigate('/login');
            //     console.log(response.data)
            // }else{
                setPost(response.data)
                setBook(response.data)
                // setLoading(false)
                console.log(response.data)
            
        })
        .catch((error)=>{
            console.log(error)
            // setLoading(false)
            // navigate('/login')
        })

},[])

  const refreshBooks = async () => {
    const response = await axios.get("http://localhost:8081/getBooks"); // Fetch the updated list of books
    setPost(response.data)
    setBook(response.data)
  };

  const handleDeleteClick = (bookId) => {
    setSelectedBookId(bookId);
    setOpen(true);
  };

  const handleChange = (e) => {
    const results = posts.filter((post) => {
      if (e.target.value === "") return posts;
      return post["Title_name"].toLowerCase().includes(e.target.value.toLowerCase());
    });

    setResult(results);
    setQuery(e.target.value);
    setBook(sortFun(results, sortBy, sortField));
  };

  const changeSortField = (field) => {
    setSortField(field);
    setQuery(query);
    setBook(!result ? sortFun(posts, sortBy, field) : sortFun(result, sortBy, field));
  };

  const changeSortType = (type) => {
    setSortBy(type);
    setQuery(query);
    setBook(!result ? sortFun(posts, type, sortField) : sortFun(result, type, sortField));
  };

  const sortFun = (result, sortby, sortfield) => {
    if (sortby === 'ascending') {
      result.sort((a, b) => (a[sortfield] < b[sortfield] ? -1 : 1));
    } else if (sortby === 'descending') {
      result.sort((a, b) => (a[sortfield] < b[sortfield] ? 1 : -1));
    }
    return result;
  };

  return (
    <>
      <Navbar/>
      <div className='my-8'>

       <h2 className="font-bold text-gray-900 text-center text-2xl">Search Book</h2>
        <form className="flex flex-row gap-4 pb-10 pt-5 mx-w-l m-auto  justify-center ">
          <div className="mb-4 w-[30%]">
            <span className="block text-lg font-bold mb-2 text-gray-900">Search</span>
            <input 
              type="search" 
              placeholder="Search" 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <span className="block text-gray-900 text-lg font-bold mb-2">Sort Field:</span>
            <select 
              name="field" 
              onChange={(e) => changeSortField(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
          </div>
          <div className="mb-4">
            <span className="block text-gray-900 text-lg font-bold mb-2">Sort By:</span>
            <select 
              name="type" 
              onChange={(e) => changeSortType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
          <div className='flex items-center'>
              <a href='/books/add' className="mt-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 hover:scale-105">
                  Add New
              </a>
          </div>
        </form>
        <div className="mx-auto px-[15%] min-h-24">
          <div className="grid grid-cols-1 gap-4">
            {books.map((book) => (
              <div className="flex py-2 px-4 border border-gray-300 rounded-3xl shadow-md bg-primary/20 gap-2" key={book.Title_name}>
                <div className='w-[10%] mr-6'>
                  <img src={`${book.img}`} alt="pic" className="rounded-sm w-full  mx-auto my-auto"/>
                </div>
                <div className='w-[70%] flex flex-col items-start'>
                  <h2 className="text-2xl font-bold">{book.Title_name}</h2>
                  <p className="text-gray-700 text-xl">{book.Author}</p>
                  {book.availability==="true"? (
                    <button className="text-xs mt-2 px-4 py-1 bg-green-600 text-white rounded-full">
                      Available
                    </button>
                    ) : (
                    <button className="text-xs mt-2 px-4 py-1 bg-red-600 text-white rounded-full">
                      Not available
                    </button>
                  )}
                  <button className="text-xs mt-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 hover:scale-105">
                    more details
                  </button>
                </div>
                <div className='flex items-center'>
                  <button className="mt-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 hover:scale-105">
                  Update
                  </button>
                </div>
                <div className='flex items-center'>
                  <button onClick={()=>handleDeleteClick(book.Title_ID)} className="mt-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 hover:scale-105">
                  Delete
                  </button>
                </div>
              </div>
            ))}
            {books.length === 0 && <h2 className="text-center text-red-600">Empty List!</h2>}
          </div>
        </div>
      </div>

      <DeleteModal open={open} onclose={()=>setOpen(false)} bookId={selectedBookId} refreshBooks={refreshBooks}>
      
      </DeleteModal>
      <Footer/>
    </>
  );
}

export default RemoveBook;
