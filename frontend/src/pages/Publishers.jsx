import React, { useState,useEffect } from 'react';
// import { Posts } from '../assets/Content';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import PublisherDeleteModal from '../components/models/PublisherDeleteModal';
// import DeleteModal from '../components/models/DeleteModal';
//import Trash from './icons/trash.jpg'

function Publishers() {
  const [posts, setPost] = useState([]);
  const [publishers,setPublisher] = useState([])
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState('Name');
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
    const response = await axios.get("http://localhost:8081/getPublishers"); // Fetch the updated list of publisher
    setPost(response.data)
    setPublisher(response.data)
  };

  const handleDeleteClick = (publisherID) => {
    setSelectedPublisherId(publisherID);
    setOpen(true);
  };

  const handleChange = (e) => {
    const results = posts.filter((post) => {
      if (e.target.value === "") return posts;
      return post[sortField].toLowerCase().includes(e.target.value.toLowerCase());
    });

    setResult(results);
    setQuery(e.target.value);
    setPublisher(sortFun(results, sortBy, sortField));
  };

  const changeSortField = (field) => {
    setSortField(field);
    const sortedpublisher = !result ? sortFun(posts, sortBy, field) : sortFun(result, sortBy, field);
    setPublisher(sortedpublisher);
  };
  
  const changeSortType = (type) => {
    setSortBy(type);
    const sortedpublisher = !result ? sortFun(posts, type, sortField) : sortFun(result, type, sortField);
    setPublisher(sortedpublisher);
  };
  

  const sortFun = (publisher, sortby, sortfield) => {
    const sortedpublisher = [...publisher]; // Create a copy of the publisher array
  
    if (sortby === 'ascending') {
      sortedpublisher.sort((a, b) => {
        if (typeof a[sortfield] === 'string' && typeof b[sortfield] === 'string') {
          return a[sortfield].localeCompare(b[sortfield]); // Lexicographical comparison for strings
        }
        return a[sortfield] < b[sortfield] ? -1 : 1; // Comparison for numbers or other types
      });
    } else if (sortby === 'descending') {
      sortedpublisher.sort((a, b) => {
        if (typeof a[sortfield] === 'string' && typeof b[sortfield] === 'string') {
          return b[sortfield].localeCompare(a[sortfield]); // Reverse lexicographical comparison for strings
        }
        return a[sortfield] < b[sortfield] ? 1 : -1; // Reverse comparison for numbers or other types
      });
    }
    
    return sortedpublisher;
  };

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
              <option value="Name">Name</option>
              <option value="Country">Country</option>
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
            <a href='/books/Publishers/add'className="mt-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 hover:scale-105">
                Add New
            </a>
          </div>
        </form>
        <div className="mx-auto px-[15%] min-h-24">
          <div className="grid grid-cols-1 gap-4">
            {publishers.map((publisher) => (
              <div className="flex py-2 px-4 border border-gray-300 rounded-3xl shadow-md bg-primary/20" key={publisher.Name}>
                {/* <div className='w-[10%] mr-6'>
                  <img src={`$tPubsetPublisher.img}`} alt="pic" className="rounded-sm w-full  mx-auto my-auto"/>
                </div> */}
                <div className='w-[70%] flex flex-col items-start'>
                  <h2 className="text-2xl font-bold">{publisher.Name}</h2>
                  <p className="text-gray-700 text-xl">{publisher.Location}</p>
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
                <div className='flex items-center gap-2'>
                  <Link to= {`/books/Publishers/edit/${publisher.Publisher_ID}`}  className="text-xs mt-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 hover:scale-105">
                    Update
                  </Link>
                  <button onClick={()=>handleDeleteClick(publisher.Publisher_ID)} className="text-xs mt-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 hover:scale-105">
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {publishers.length === 0 && <h2 className="text-center text-red-600">Empty List!</h2>}
          </div>
        </div>
      </div>

      {/* <DeleteModal open={open} onclose={()=>setOpen(false)}tPubsetPublisherId={selectedPublisherId} refreshpublisher={refreshPublishers}>
      
      </DeleteModal> */}
      <PublisherDeleteModal open={open} onclose={()=>setOpen(false)} bookId={selectedPublisherId} refreshBooks={refreshPublishers}>
      
      </PublisherDeleteModal>
      <Footer/>
    </>
  );
}

export default Publishers;
