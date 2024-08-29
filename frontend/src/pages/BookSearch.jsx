import React, { useState } from "react";
import bgPic from "../assets/website/bookSearch.jpg";
import { Posts } from "../assets/Content";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

function BookSearch() {
  const [list, setList] = useState(Posts);
  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortBy, setSortBy] = useState("ascending");
  const [result, setResult] = useState();
  const navigate = useNavigate();

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
    setList(
      !result ? sortFun(Posts, sortBy, field) : sortFun(result, sortBy, field)
    );
  };

  const changeSortType = (type) => {
    setSortBy(type);
    setQuery(query);
    setList(
      !result
        ? sortFun(Posts, type, sortField)
        : sortFun(result, type, sortField)
    );
  };

  const sortFun = (result, sortby, sortfield) => {
    if (sortby === "ascending") {
      result.sort((a, b) => (a[sortfield] < b[sortfield] ? -1 : 1));
    } else if (sortby === "descending") {
      result.sort((a, b) => (a[sortfield] < b[sortfield] ? 1 : -1));
    }
    return result;
  };

  const goToDetails = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <form
          className="flex flex-row justify-center gap-4 py-20 m-auto mb-6 mx-w-l "
          style={{
            backgroundImage: `url('https://img.freepik.com/free-photo/abundant-collection-antique-books-wooden-shelves-generated-by-ai_188544-29660.jpg')`,
          }}
        >
          <div className="mb-4 w-[30%]">
            <span className="block mb-2 text-lg font-bold text-white">
              Search
            </span>
            <input
              type="search"
              placeholder="Search"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <span className="block mb-2 text-lg font-bold text-white">
              Sort Field:
            </span>
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
            <span className="block mb-2 text-lg font-bold text-white">
              Sort By:
            </span>
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
              <div
                className="flex p-5 border border-gray-300 shadow-md rounded-xl bg-primary/20"
                key={post.title}
              >
                <div className="w-[10%] mr-6">
                  <img
                    src={`${post.img}`}
                    alt="pic"
                    className="w-full mx-auto my-auto rounded-sm"
                  />
                </div>
                <div className="w-[70%]">
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p className="text-xl text-gray-700">{post.author}</p>
                  {post.availability === "true" ? (
                    <button className="px-4 py-1 mt-2 ml-auto text-xs text-white bg-green-600 rounded-full">
                      Available
                    </button>
                  ) : (
                    <button className="px-4 py-1 mt-2 ml-auto text-xs text-white bg-red-600 rounded-full">
                      Not available
                    </button>
                  )}
                </div>
                <div className="flex items-center">
                  <button
                    className="px-10 py-2 mt-2 ml-auto text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105"
                    onClick={() => goToDetails(post.id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
            {list.length === 0 && (
              <h2 className="text-center text-red-500">Empty List!</h2>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookSearch;
