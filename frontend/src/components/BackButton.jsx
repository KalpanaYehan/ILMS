import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);  // Navigate to the previous page
  };

  return (
    <button 
      onClick={handleGoBack} 
      className="px-4 bg-white text-black rounded hover:bg-slate-400 text-sm"
    >
      Back
    </button>
  );
};

export default BackButton;
