import React from 'react';
import Slider from 'react-slick';

import { reviews } from './ReviewData';
import Quote from '../assets/blockquote.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Review = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="mb-4 text-3xl font-bold">Reviews</h2>
        <p className="mb-12 text-gray-600">What members are saying about the book......</p>

        <div className="relative p-4">
          <img className="absolute top-0 left-0 z-10 w-12 h-12 " src={Quote} alt="quote" />
          <img className="absolute bottom-0 right-0 z-10 w-12 h-12 rotate-180" src={Quote} alt="quote" />

          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.Reviewid} className="flex flex-col items-center p-6 mx-4 bg-white rounded-lg shadow-md h-60">
                
                <p className="mb-4 text-lg text-gray-700">{review.text}</p>
                <div className="flex flex-col items-center">
                  <p className="font-bold">{review.name}</p>
                </div>
                <img
                  className="w-20 h-16 mb-4 rounded-xl"
                  src={review.image}
                  alt={review.name}
                  style={{ margin: '0 auto' }} // Center the image horizontally
                />
              </div>
                
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Review;
