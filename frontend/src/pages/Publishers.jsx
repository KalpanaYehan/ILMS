import React, { useState,useEffect } from 'react';
// import { Posts } from '../assets/Content';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import DeleteModal from '../components/models/DeleteModal';
//import Trash from './icons/trash.jpg'

function Publishers() {
  const [posts, setPost] = useState([]);
  const [publishers,setPublisher] = useState([])
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortBy, setSortBy] = useState('ascending');
  const [result, setResult] = useState();
  const [open,setOpen] = useState(false)
  const [selectedPublisherId, setSelectedPublisherId] = useState(null);

  useEffect(()=>{
    // setLoading(true)
    axios
        .get('http://localhost:8081/getPublishers')
        .then((response)=>{
            // if(response.data.message !== "success") {
            //     // navigate('/login');
            //     console.log(response.data)
            // }else{
                setPost(response.data)
                setPublisher(response.data)
                // setLoading(false)
                console.log(response.data)
            
        })
        .catch((error)=>{
            console.log(error)
            // setLoading(false)
            // navigate('/login')
        })

},[])

  const refreshPublishers = async () => {
    const response = await axios.get("http://localhost:8081/getPublishers"); // Fetch the updated list of books
    setPost(response.data)
    setPublisher(response.data)
  };

  const handleDeleteClick = (publisherID) => {
    setSelectedPublisherId(publisherID);
    setOpen(true);
  };

  const handleChange = (e) => {
    const results = Posts.filter((post) => {
      if (e.target.value === "") return posts;
      return post["title"].toLowerCase().includes(e.target.value.toLowerCase());
    });

    setResult(results);
    setQuery(e.target.value);
    setPublisher(sortFun(results, sortBy, sortField));
  };

//   const changeSortField = (field) => {
//     setSortField(field);
//     setQuery(query);
//     setList(!result ? sortFun(posts, sortBy, field) : sortFun(result, sortBy, field));
//   };

//   const changeSortType = (type) => {
//     setSortBy(type);
//     setQuery(query);
//     setList(!result ? sortFun(posts, type, sortField) : sortFun(result, type, sortField));
//   };

//   const sortFun = (result, sortby, sortfield) => {
//     if (sortby === 'ascending') {
//       result.sort((a, b) => (a[sortfield] < b[sortfield] ? -1 : 1));
//     } else if (sortby === 'descending') {
//       result.sort((a, b) => (a[sortfield] < b[sortfield] ? 1 : -1));
//     }
//     return result;
//   };

  return (
    <>
      <Navbar/>
      <div className='my-8'>

       <h2 className="font-bold text-gray-900 text-center text-2xl">Publishers</h2>
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
            <button className="mt-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 hover:scale-105">
                Add New
            </button>
          </div>
        </form>
        <div className="mx-auto px-[15%] min-h-24">
          <div className="grid grid-cols-1 gap-4">
            {publishers.map((publisher) => (
              <div className="flex py-2 px-4 border border-gray-300 rounded-3xl shadow-md bg-primary/20" key={publisher.Name}>
                {/* <div className='w-[10%] mr-6'>
                  <img src={`${book.img}`} alt="pic" className="rounded-sm w-full  mx-auto my-auto"/>
                </div> */}
                <div className='w-[70%] flex flex-col items-start'>
                  <h2 className="text-2xl font-bold">{publisher.Name}</h2>
                  <p className="text-gray-700 text-xl">{publisher.Country}</p>
                  {/* {publishers.availability==="true"? (
                    <button className="text-xs mt-2 px-4 py-1 bg-green-600 text-white rounded-full">
                      Available
                    </button>
                    ) : (
                    <button className="text-xs mt-2 px-4 py-1 bg-red-600 text-white rounded-full">
                      Not available
                    </button>
                  )} */}
                  {/* <button className="text-xs mt-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 hover:scale-105">
                    more details
                  </button> */}
                </div>
                <div className='flex items-center'>
                  <button onClick={()=>handleDeleteClick(publisher.Publisher_ID)} className="mt-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 hover:scale-105">
                  Delete
                  </button>
                </div>
              </div>
            ))}
            {publishers.length === 0 && <h2 className="text-center text-red-600">Empty List!</h2>}
          </div>
        </div>
      </div>

      <DeleteModal open={open} onclose={()=>setOpen(false)} bookId={selectedPublisherId} refreshBooks={refreshPublishers}>
      
      </DeleteModal>
      <Footer/>
    </>
  );
}

export default Publishers;
