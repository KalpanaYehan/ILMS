

import React from 'react';
import Slider from 'react-slick';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons
import Quote from '../assets/blockquote.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Review = ({ reviews }) => {
  const settings = {
    dots: true,
    infinite: reviews.length > 1, // Set infinite to false if there's only one review
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: reviews.length > 1, // Set autoplay to false if there's only one review
    autoplaySpeed: 2000,
  };

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); 
    const hasHalfStar = rating % 1 !== 0; 
    const totalStars = 5; // Total stars

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          // Display full star icon
          <FaStar key={index} className="text-lg text-orange-400" /> 
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-lg text-orange-400" />} 
        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          // Display empty star icon
          <FaRegStar key={index} className="text-lg text-orange-400" /> 
        ))}
      </div>
    );
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">Reviews</h2>
        <p className="mb-4 text-gray-600">What members are saying about the book......</p>

        <div className="relative p-4">
          <img className="absolute top-0 left-0 z-10 w-12 h-12" src={Quote} alt="quote" />
          <img className="absolute bottom-0 right-0 z-10 w-12 h-12 rotate-180" src={Quote} alt="quote" />

          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.Review_ID} className="flex flex-col items-center p-6 mx-4 text-gray-600 rounded-lg shadow-md h-30">
                <p className="mb-4 text-lg text-gray-700">{review.Review_Text}</p>
                <div className="flex flex-col items-center">
                <p className="font-bold">{review.First_Name} {review.Last_Name}</p>
                  {renderStars(review.Rating)} {/* Display stars based on rating */}
                </div>
                <p className="mt-3 mb-1 text-lg text-gray-700">{review.Review_date}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Review;

