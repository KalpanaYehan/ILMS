import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(props.url); // Navigate to the previous page
  };

  return (
    <button
      onClick={handleGoBack}
      className="mx-2 mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-800 hover:scale-105"
    >
      Back
    </button>
  );
};

export default BackButton;
