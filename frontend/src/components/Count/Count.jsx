import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";

const Count = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [error, setError] = useState(null); // Define the error state

  const stats = [
    {
      id: 1,
      label: "Books Available",
      count: totalBooks, // Directly reference the state variable
    },
    {
      id: 2,
      label: "Registered Members",
      count: totalMembers, // Directly reference the state variable
    },
  ];

  useEffect(() => {
    fetchTotalBooks();
    fetchTotalMembers();
  }, []);

  const fetchTotalBooks = () => {
    axios
      .get("http://localhost:8081/dashboard/total-books")
      .then((response) => {
        setTotalBooks(response.data.totalBooks);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const fetchTotalMembers = () => {
    axios
      .get("http://localhost:8081/dashboard/total-users")
      .then((response) => {
        setTotalMembers(response.data.totalMembers);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex justify-center mt-10 space-x-8">
      {stats.map((stat) => (
        <div key={stat.id} className="relative flex flex-col items-center p-4 rounded-lg shadow-md bg-primary/20">
          <CountUp 
            start={0} 
            end={stat.count} 
            duration={3} 
            separator="," 
            prefix="Total: " 
            suffix="+" 
            className="text-4xl font-bold text-red-950" 
          />
          <p className="mt-2 text-lg font-medium text-gray-700">{stat.label}</p>
        </div>
      ))}
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
    </div>
  );
};

export default Count;