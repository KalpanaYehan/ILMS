import React, { useState,useEffect } from 'react';
import { Posts } from '../assets/Content';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import DeleteModal from '../components/models/DeleteModal';
import AuthorDeleteModel from '../components/models/AuthorDeleteModal';
//import Trash from './icons/trash.jpg'

function Authors() {
  const [posts, setPost] = useState([]);
  const [authors,setAuthor] = useState([])
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState('Name');
  const [sortBy, setSortBy] = useState('ascending');
  const [result, setResult] = useState();
  const [open,setOpen] = useState(false)
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);

  useEffect(()=>{
    // setLoading(true)
    axios
        .get('http://localhost:8081/books/authors')
        .then((response)=>{
            // if(response.data.message !== "success") {
            //     // navigate('/login');
            //     console.log(response.data)
            // }else{
                setPost(response.data)
                setAuthor(response.data)
                // setLoading(false)
                console.log(response.data)
            
        })
        .catch((error)=>{
            console.log(error)
            // setLoading(false)
            // navigate('/login')
        })

},[])

  const refreshAuthors = async () => {
    const response = await axios.get("http://localhost:8081/books/authors"); // Fetch the updated list of books
    setPost(response.data)
    setAuthor(response.data)
  };

  const handleDeleteClick = (authorID) => {
    setSelectedAuthorId(authorID);
    setOpen(true);
  };

  const handleChange = (e) => {
    const results = posts.filter((post) => {
      if (e.target.value === "") return posts;
      return post[sortField].toLowerCase().includes(e.target.value.toLowerCase());
    });

    setResult(results);
    setQuery(e.target.value);
    setAuthor(sortFun(results, sortBy, sortField));
  };

  const changeSortField = (field) => {
    setSortField(field);
    const sortedAuthors = !result ? sortFun(posts, sortBy, field) : sortFun(result, sortBy, field);
    setAuthor(sortedAuthors);
  };
  
  const changeSortType = (type) => {
    setSortBy(type);
    const sortedAuthors = !result ? sortFun(posts, type, sortField) : sortFun(result, type, sortField);
    setAuthor(sortedAuthors);
  };
  

  const sortFun = (Authors, sortby, sortfield) => {
    const sortedAuthors = [...Authors]; // Create a copy of the books array
  
    if (sortby === 'ascending') {
      sortedAuthors.sort((a, b) => {
        if (typeof a[sortfield] === 'string' && typeof b[sortfield] === 'string') {
          return a[sortfield].localeCompare(b[sortfield]); // Lexicographical comparison for strings
        }
        return a[sortfield] < b[sortfield] ? -1 : 1; // Comparison for numbers or other types
      });
    } else if (sortby === 'descending') {
      sortedAuthors.sort((a, b) => {
        if (typeof a[sortfield] === 'string' && typeof b[sortfield] === 'string') {
          return b[sortfield].localeCompare(a[sortfield]); // Reverse lexicographical comparison for strings
        }
        return a[sortfield] < b[sortfield] ? 1 : -1; // Reverse comparison for numbers or other types
      });
    }
    
    return sortedAuthors;
  };

  return (
    <>
      <Navbar/>
      <div className='my-8'>

       <h2 className="font-bold text-gray-900 text-center text-2xl">Authors</h2>
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
            <a href = '/books/Authors/add' className="mt-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 hover:scale-105">
                Add New
            </a>
          </div>
        </form>
        <div className="mx-auto px-[15%] min-h-24">
          <div className="grid grid-cols-1 gap-4">
            {authors.map((author) => (
              <div className="flex py-2 px-4 border border-gray-300 rounded-3xl shadow-md bg-primary/20" key={author.Author_ID}>
                <div className='w-[10%] mr-6'>
                  <img src={`${author.Img_url}`} alt="pic" className="rounded-full w-20 h-20  mx-auto my-auto"/>
                </div>
                <div className='w-[70%] flex flex-col items-start'>
                  <h2 className="text-2xl font-bold">{author.Name}</h2>
                  <span className="text-gray-700 text-xl">{author.Country}</span>
                  <p>{author.Author_ID}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <Link to={`/books/Authors/edit/${author.Author_ID}`} className="text-xs mt-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 hover:scale-105">
                    Update
                  </Link>
                  <button onClick={()=>handleDeleteClick(author.Author_ID)} className="text-xs mt-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 hover:scale-105">
                  Delete
                  </button>
                </div>
              </div>
            ))}
            {authors.length === 0 && <h2 className="text-center text-red-600">Empty List!</h2>}
          </div>
        </div>
      </div>

      {/* <DeleteModal open={open} onclose={()=>setOpen(false)} bookId={selectedAuthorId} refreshBooks={refreshAuthors}>
      </DeleteModal> */}
      <AuthorDeleteModel open={open} onclose={()=>setOpen(false)} bookId={selectedAuthorId} refreshBooks={refreshAuthors}>
      </AuthorDeleteModel>
      <Footer/>
    </>
  );
}

export default Authors;
