import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import Footer from '../components/Footer/Footer';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
  '#AA00FF', '#FF4081', '#7B68EE', '#32CD32', 
  '#FFD700', '#FF6347', '#8A2BE2', '#FF1493', 
  '#00FA9A', '#DC143C', '#FF4500', '#1E90FF', 
  '#32CD32', '#FFD700', '#FF69B4', '#8A2BE2'
];

const Profile = () => {
  const [bookCategoriesData, setBookCategoriesData] = useState([]);
  const [overdueBooksData, setOverdueBooksData] = useState([]);
  const [bookAcquisitionData, setBookAcquisitionData] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  const [popularCategoriesData, setPopularCategoriesData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('year');

  const CustomLegend  = {
    display: 'flex',
    margin: '0 auto',
    marginTop: '20px',
    marginBottom: '50px',
  };
  
  useEffect(() => {
    axios.get('http://localhost:8081/categories/book-count')
      .then(response => {
        const formattedData = response.data.map(category => ({
          name: category.CategoryName,
          value: category.BookCount
        }));
        
        setBookCategoriesData(formattedData);
        setLoading(false);
        console.log(formattedData);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });

    axios.get('http://localhost:8081/overdue-books')
      .then(response => {
        setOverdueBooksData(response.data);
      })
      .catch(error => {
        setError(error.message);
      });

    fetchBookAcquisitionData(selectedYear);
    fetchTotalBooks();
    fetchTotalMembers();
    fetchPopularCategories(selectedPeriod);
  }, [selectedYear, selectedPeriod]);

  const fetchBookAcquisitionData = (year) => {
    axios.get(`http://localhost:8081/book-acquisition?year=${year}`)
      .then(response => {
        const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
        const data = response.data.reduce((acc, item) => {
          acc[item.month - 1] = { month: new Date(0, item.month - 1).toLocaleString('default', { month: 'long' }), total: item.total };
          return acc;
        }, Array(12).fill({ total: 0 }));
        const formattedData = data.map((item, index) => ({ month: months[index], total: item.total }));
        setBookAcquisitionData(formattedData);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const fetchTotalBooks = () => {
    axios.get('http://localhost:8081/total-books')
      .then(response => {
        setTotalBooks(response.data.totalBooks);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const fetchTotalMembers = () => {
    axios.get('http://localhost:8081/total-members')
      .then(response => {
        setTotalMembers(response.data.totalMembers);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const fetchPopularCategories = (period) => {
    axios.get(`http://localhost:8081/popular-categories/${period}`)
      .then(response => {
        setPopularCategoriesData(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const StatCard = ({ title, count, emoji, colors }) => (
    <div className={`relative p-4 bg-gradient-to-r ${colors} rounded-lg shadow-lg`}>
      <div className="absolute top-0 right-0 p-4 text-6xl text-gray-100 opacity-10">{emoji}</div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-4xl font-extrabold text-white">{count}</p>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container p-4 mx-auto">
        <h1 className="pb-5 mb-4 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-secondary to-gray-900 sm:text-4xl">Library Data Visualization</h1>

        {/* Flexbox container for Bar Chart and Pie Chart */}
        <div className="flex justify-between ">
          <div className="w-full md:w-1/2">
            <h2 className="pb-6 mb-2 text-2xl font-bold text-center ">Most Popular Book Categories </h2>
            <div className="flex items-center mb-4">
              <label className="mr-2">Select Period:</label>
              <select value={selectedPeriod} onChange={handlePeriodChange} className="p-2 border border-gray-300 rounded">
                <option value="year">Nearest Year</option>
                <option value="month">Nearest Month</option>
                <option value="week">Nearest Week</option>
              </select>
            </div>
           
            <BarChart
              width={700}
              height={450} // Increase the height to accommodate longer labels
              data={popularCategoriesData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 70, // Increase bottom margin to create space between legend and x-axis
              }}
              barSize={30} // Increase the gap between bars by reducing the bar size
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis   
                dataKey="Category_name" 
                tick={{  textAnchor: 'end', fontSize:12}} 
                interval={0} 
                tickFormatter={(value) => value.split(' ').join('\n')} // Split labels into multiple lines
              
              />
              <YAxis />
              <Tooltip />
              <Legend contentStyle={CustomLegend} />
              
              
              <Bar dataKey="borrowCount" fill="#8884d8" >
                {
                  popularCategoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))
                }
                <LabelList dataKey="borrowCount" position="insideBottom" offset={10} />
              </Bar>
            </BarChart>
          </div>
          <div className="w-full pl-20 md:w-1/2">
            <h2 className="pb-5 pl-40 mb-2 text-2xl font-bold">Category distribution</h2>
            <PieChart width={600} height={400}>
              <Pie
                data={bookCategoriesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {bookCategoriesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        {/* Table for People Who Didn't Return Books */}
        <div className="mb-8">
          <h2 className="pb-5 mb-2 text-2xl font-semibold text-center">Overdue Books</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-deep-orange-50">
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Book</th>
                <th className="px-4 py-2 border-b">Category</th>
                <th className="px-4 py-2 border-b">Issued Date</th>
                <th className="px-4 py-2 border-b">Overdue Days</th>
              </tr>
            </thead>
            <tbody>
              {overdueBooksData.map((entry, index) => (
                <tr key={index} className="hover:bg-deep-orange-100">
                  <td className="px-4 py-2 text-center border-b">{`${entry.MemberFirstName} ${entry.MemberLastName}`}</td>
                  <td className="px-4 py-2 text-center border-b">{entry.BookTitle}</td>
                  <td className="px-4 py-2 text-center border-b">{entry.BookCategory}</td>
                  <td className="px-4 py-2 text-center border-b">{formatDate(entry.IssuedDate)}</td>
                  <td className="px-4 py-2 text-center border-b">{entry.OverdueDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Line Chart for Book Acquisition Trends */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="pb-5 mb-2 text-2xl font-semibold text-center">Library Borrowing Insights</h2>
          <div className="flex items-center mb-4">
            <label className="mr-2">Select Year:</label>
            <select value={selectedYear} onChange={handleYearChange} className="p-2 border border-gray-300 rounded">
              {/* Add options for the years you want to display */}
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
              <option value={2021}>2021</option>
              <option value={2020}>2020</option>
              {/* Add more years as needed */}
            </select>
          </div>
          <LineChart
            width={1100}
            height={400}
            data={bookAcquisitionData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" tick={{ fill: '#8A2BE2' }} />
            <YAxis tick={{ fill: '#8A2BE2' }} />
            <Tooltip content={({ payload }) => {
              if (payload && payload.length) {
                return (
                  <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
                    <p>{`Month: ${payload[0].payload.month}`}</p>
                    <p>{`Borrowed Books: ${payload[0].value}`}</p>
                  </div>
                );
              }
              return null;
            }} />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#DC143C" activeDot={{ r: 8 }} dot={{ fill: '#DC143C' }} />
          </LineChart>
          <div className="flex justify-center py-6 space-x-10">
            <StatCard title="Total Books" count={totalBooks} emoji="📚" colors="from-blue-500 to-blue-400 " />
            <StatCard title="Total Members" count={totalMembers} emoji="👥" colors="from-green-500 to-green-400" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;