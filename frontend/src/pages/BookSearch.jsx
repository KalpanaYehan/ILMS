import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import bgPic from '../assets/website/bookSearch.jpg'
import { Posts } from '../assets/Content';
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

function BookSearch() {

  const location = useLocation();
  const { userType, userData } = location.state || {};
  const [list, setList] = useState(Posts);
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortBy, setSortBy] = useState('ascending');
  const [result, setResult] = useState();

  const handleChange = (e) => {
    const results = Posts.filter((post) => {
      if (e.target.value === "") return Posts;
      return post["title"].toLowerCase().includes(e.target.value.toLowerCase());
    });

    setResult(results);
    setQuery(e.target.value);
    setList(sortFun(results, sortBy, sortField));
  };

  const changeSortField = (field) => {
    setSortField(field);
    setQuery(query);
    setList(!result ? sortFun(Posts, sortBy, field) : sortFun(result, sortBy, field));
  };

  const changeSortType = (type) => {
    setSortBy(type);
    setQuery(query);
    setList(!result ? sortFun(Posts, type, sortField) : sortFun(result, type, sortField));
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
      <Navbar type={userType} data={userData}/>
      <div className='mb-4'>
        <form className="flex flex-row gap-4 py-20 mb-6 mx-w-l m-auto  justify-center " style={{ backgroundImage: `url('https://img.freepik.com/free-photo/abundant-collection-antique-books-wooden-shelves-generated-by-ai_188544-29660.jpg')`}}>
          <div className="mb-4 w-[30%]">
            <span className="block text-lg font-bold mb-2 text-white">Search</span>
            <input 
              type="search" 
              placeholder="Search" 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <span className="block text-white text-lg font-bold mb-2">Sort Field:</span>
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
            <span className="block text-white text-lg font-bold mb-2">Sort By:</span>
            <select 
              name="type" 
              onChange={(e) => changeSortType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
        </form>
        <div className="mx-auto px-[15%] min-h-24">
          <div className="grid grid-cols-1 gap-4">
            {list.map((post) => (
              <div className="flex py-2 px-4 border border-gray-300 rounded-3xl shadow-md bg-primary/20" key={post.title}>
                <div className='w-[10%] mr-6'>
                  <img src={`${post.img}`} alt="pic" className="rounded-sm w-full  mx-auto my-auto"/>
                </div>
                <div className='w-[70%]'>
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p className="text-gray-700 text-xl">{post.author}</p>
                  {post.availability==="true"? (
                    <button className="text-xs ml-auto mt-2 px-4 py-1 bg-green-600 text-white rounded-full">
                      Available
                    </button>
                    ) : (
                    <button className="text-xs ml-auto mt-2 px-4 py-1 bg-red-600 text-white rounded-full">
                      Not available
                    </button>
                  )}
                </div>
                <div className='flex items-center'>
                  <button className="ml-auto mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105">
                  Details
                  </button>
                </div>
              </div>
            ))}
            {list.length === 0 && <h2 className="text-center text-red-500">Empty List!</h2>}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default BookSearch;
