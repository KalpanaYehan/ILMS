import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularBooksData = [
  {
    id: 1,
    name: "Harry Potter",
    author: "J K Rowling",
    img : 'https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: 2,    
    name: "Men and Dreams",
    author: "Kochery C Shibu",
    img: "https://i.pinimg.com/736x/00/aa/87/00aa8776fb28fb2b2914d9d427a711ec.jpg",
  },
  {
    id: 3,
    name: "Charlottes Web",
    author: "E B white",
    img: "https://images-na.ssl-images-amazon.com/images/I/61%2B3z1o4oUL.jpg",
  },
  {
    id: 4,
    name: "The Lord of the Rings",
    author: "J R R Tolkien",
    img: "https://i0.wp.com/quicksilvertranslate.com/wp-content/uploads/top-books-learn-english-2.jpg",
  },
  {
    id: 5,
    name: "Magic",
    author: "Rhonda Byine",
    img: "https://booksbhandara.com/wp-content/uploads/2023/03/the-magic.jpg",
  },
  {
    id: 6,
    name: "Solar Bones",
    author: "Mike McCormack",
    img: "https://s26162.pcdn.co/wp-content/uploads/2019/11/A1NfEjobJnL-691x1024.jpg",
  }
];

const PopularBooks = () => {
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
    <div className="py-10 mb-10">
      <div className="container">
        {/* header section */}
        <div className="mb-10">
          <h1
            data-aos="fade-up"
            className="text-4xl font-bold text-center"
          >
            Most popular of the week...
          </h1>
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {PopularBooksData.map((data) => (
              <div key={data.id} className="my-6">
                <div
                  className="relative flex flex-col gap-4 px-6 py-8 mx-4 shadow-lg rounded-xl bg-primary/20"
                >
                  <div className="mb-4 ">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-sm w-[90%] h-70 mx-auto"
                    />
                  </div>
                  {/* content section */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <h1 className="text-xl font-bold text-black/80 font-cursive2">
                        {data.name}
                      </h1>
                      <p className="text-sm text-center text-gray-600">{data.author}</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PopularBooks;