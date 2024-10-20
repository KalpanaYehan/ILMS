import React from "react";
import CountUp from "react-countup";

const Count = () => {
  const stats = [
    {
      id: 1,
      label: "Books Available",
      count: 400,
    },
    {
      id: 2,
      label: "Registered Members",
      count: 50,
    },
  ];

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
    </div>
  );
};

export default Count;
