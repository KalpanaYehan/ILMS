
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const PopularBooks = () => {

//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8081/popularBooks')
//       .then((response) => {
//         setBooks(response.data);  // Set the popular books data
//         console.log(books)
//       })
//       .catch((error) => {
//         console.log('Error fetching popular books:', error);
//       });
//   }, []);


//   var settings = {
//     dots: true,
//     arrows: false,
//     infinite: true,
//     speed: 800,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     cssEase: "linear",
//     pauseOnHover: true,
//     pauseOnFocus: false,
//     responsive: [
//       {
//         breakpoint: 10000,
//         settings: {
//           slidesToShow: 5,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (

//       <>
//           <div className="py-2 m-10">
//             <div className="container">
//               {/* header section */}
//               <div className="mb-5">
//               {books.length > 0 && (
//                 <h1
//                   data-aos="fade-up"
//                   className="text-4xl font-bold text-center"
//                 >
//                   Top Picks of the Month...
//                 </h1>
//                 )}
//               </div>
//             </div>
//           </div>
        
        
//         <div data-aos="zoom-in">
//           <Slider {...settings}>
//             {books.map((book) => (
//               <div key={book.Title_ID} className="mb-16">
//                 <Link to={`/books/details/${book.Title_ID}`} className="no-underline">
//                 <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl  bg-primary/20 relative h-[450px]">
//                   <div className="mb-2 h-[300px]">
//                     <img
//                       src={book.Img_url}
//                       alt="image"
//                       className="object-cover w-full h-full mx-auto rounded-sm"
//                     />
//                   </div>
//                   {/* content section */}
//                   <div className="flex flex-col items-center gap-4">
//                     <div className="mb-3">
//                       <h1 className="text-xl font-bold text-center text-black/80 font-cursive2">

//                         {book.Title_name}
//                       </h1>
//                       <p className="text-sm text-center text-gray-600">{book.author}</p>
//                     </div>
//                   </div>
                  
//                 </div>
//                 </Link>
//               </div>
//             ))}
//           </Slider>
//         </div>

//     </>
//   );
// };

// export default PopularBooks;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/popularBooks')
      .then((response) => {
        setBooks(response.data);  // Set the popular books data
        console.log(books)
      })
      .catch((error) => {
        console.log('Error fetching popular books:', error);
      });
  }, []);

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="py-2 m-10">
        <div className="container">
          <div className="mb-5">
            {books.length > 0 && (
              <h1 data-aos="fade-up" className="text-4xl font-bold text-center" data-testid="header">
                Top Picks of the Month...
              </h1>
            )}
          </div>
        </div>
      </div>
      
      <div data-aos="zoom-in" data-testid="slider">
        <Slider {...settings}>
          {books.map((book) => (
            <div key={book.Title_ID} className="mb-16" data-testid="book-card">
              <Link to={`/books/details/${book.Title_ID}`} className="no-underline">
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-primary/20 relative h-[450px]">
                  <div className="mb-2 h-[300px]">
                    <img
                      src={book.Img_url}
                      alt="image"
                      className="object-cover w-full h-full mx-auto rounded-sm"
                      data-testid="book-image"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="mb-3">
                      <h1 className="text-xl font-bold text-center text-black/80 font-cursive2" data-testid="book-title">
                        {book.Title_name}
                      </h1>
                      <p className="text-sm text-center text-gray-600" data-testid="book-author">
                        {book.author}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default PopularBooks;
