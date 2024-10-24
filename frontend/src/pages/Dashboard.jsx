import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Footer from "../components/Footer/Footer";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA00FF",
  "#FF4081",
  "#7B68EE",
  "#32CD32",
  "#FFD700",
  "#FF6347",
  "#8A2BE2",
  "#FF1493",
  "#00FA9A",
  "#DC143C",
  "#FF4500",
  "#1E90FF",
  "#32CD32",
  "#FFD700",
  "#FF69B4",
  "#8A2BE2",
];

const Dashboard = () => {
  const [bookCategoriesData, setBookCategoriesData] = useState([]);
  const [overdueBooksData, setOverdueBooksData] = useState([]);
  const [bookAcquisitionData, setBookAcquisitionData] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [popularCategoriesData, setPopularCategoriesData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("year");
  const [popularAuthorsData, setPopularAuthorsData] = useState([]);
  const [selectedAuthorPeriod, setSelectedAuthorPeriod] = useState("year");

  const CustomLegend = {
    display: "flex",
    margin: "0 auto",
    marginTop: "20px",
    marginBottom: "50px",
  };

  useEffect(() => {
    axios
    .get("http://localhost:8081/dashboard/categories/book-count")
    .then((response) => {
      const formattedData = response.data
        .filter((category) => category.BookCount !== null)
        .map((category) => ({
          name: category.CategoryName,
          value: Number(category.BookCount),
        }));
      setBookCategoriesData(formattedData);
      setLoading(false);
      console.log("Formatted Data:", formattedData); // Log the data
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
     
    axios
      .get("http://localhost:8081/dashboard/overdue-books")
      .then((response) => {
        setOverdueBooksData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });

    fetchBookAcquisitionData(selectedYear);
    fetchTotalBooks();
    fetchTotalMembers();
    fetchPopularCategories(selectedPeriod);
    fetchPopularAuthors(selectedAuthorPeriod);
  }, [selectedYear, selectedPeriod, selectedAuthorPeriod]);

  const fetchBookAcquisitionData = (year) => {
    axios
      .get(`http://localhost:8081/dashboard/book-acquisition?year=${year}`)
      .then((response) => {
        const months = Array.from({ length: 12 }, (_, i) =>
          new Date(0, i).toLocaleString("default", { month: "long" })
        );
        const data = response.data.reduce((acc, item) => {
          acc[item.month - 1] = {
            month: new Date(0, item.month - 1).toLocaleString("default", {
              month: "long",
            }),
            total: item.total,
          };
          return acc;
        }, Array(12).fill({ total: 0 }));
        const formattedData = data.map((item, index) => ({
          month: months[index],
          total: item.total,
        }));
        setBookAcquisitionData(formattedData);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

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

  const fetchPopularCategories = (period) => {
    axios
      .get(`http://localhost:8081/popular/popular-categories/${period}`)
      .then((response) => {
        setPopularCategoriesData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const fetchPopularAuthors = (period) => {
    axios
      .get(`http://localhost:8081/popular/popular-authors/${period}`)
      .then((response) => {
        setPopularAuthorsData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const handleAuthorPeriodChange = (e) => {
    setSelectedAuthorPeriod(e.target.value);
    fetchPopularAuthors(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const StatCard = ({ title, count, emoji, colors }) => (
    <div
      className={`relative p-4 bg-gradient-to-r ${colors} rounded-lg shadow-lg`}
    >
      <div className="absolute top-0 right-0 p-4 text-6xl text-gray-100 opacity-10">
        {emoji}
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-4xl font-extrabold text-white">{count}</p>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container relative p-4 mx-auto bg-primary/20">
        <h1 className="pb-5 mb-4 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-secondary to-gray-900 sm:text-4xl">
          Library Data Visualization
        </h1>

        {/* Flexbox container for Bar Chart and Pie Chart */}
        <div className="flex justify-between">
          <div className="w-full p-4 bg-white rounded-lg shadow-md md:w-1/2">
            <h2 className="pb-6 mb-2 text-2xl font-bold text-center">
              Most Popular Book Categories
            </h2>
            <div className="flex items-center mb-4">
              <label className="mr-2">Select Period:</label>
              <select
                value={selectedPeriod}
                onChange={handlePeriodChange}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="year">Nearest Year</option>
                <option value="month">Nearest Month</option>
                <option value="week">Nearest Week</option>
              </select>
            </div>
            <BarChart
              width={700}
              height={450}
              data={popularCategoriesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 70,
              }}
              barSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="Category_name"
                tick={{ textAnchor: "end", fontSize: 10,fontWeight: "bold" }}
                interval={0}
                tickFormatter={(value) => value.split(" ").join("\n")}
              />
              <YAxis />
              <Tooltip />
              <Legend contentStyle={CustomLegend} />
              <Bar dataKey="borrowCount" fill="#8884d8">
                {popularCategoriesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="borrowCount"
                  position="insideBottom"
                  offset={10}
                />
              </Bar>
            </BarChart>
          </div>
          <div className="w-full p-4 bg-white rounded-lg shadow-md md:w-1/2">
            <h2 className="pb-5 mb-2 text-2xl font-bold text-center">
              Category Distribution
            </h2>
            <PieChart width={600} height={400}>
              <Pie
                data={bookCategoriesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  percent > 0 ?`${name} ${(percent * 100).toFixed(0)}%  `: "" 
                }
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"  
                className="font-bold"
              >
                {/* console.log(data); */}
                {bookCategoriesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        {/* Table for People Who Didn't Return Books */}
        <div className="w-full p-4 mt-8 bg-white rounded-lg shadow-md">
          <h2 className="pb-5 mb-2 text-2xl font-bold text-center">
            Overdue Books
          </h2>
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
                  <td className="px-4 py-2 text-center border-b">
                    {entry.BookTitle}
                  </td>
                  <td className="px-4 py-2 text-center border-b">
                    {entry.BookCategory}
                  </td>
                  <td className="px-4 py-2 text-center border-b">
                    {formatDate(entry.IssuedDate)}
                  </td>
                  <td className="px-4 py-2 text-center border-b">
                    {entry.OverdueDays}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Flexbox container for Line Chart and Bar Chart */}
        <div className="flex justify-between py-8">
          <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
            <h2 className="pb-5 mb-2 text-2xl font-bold text-center">
              Library Borrowing Insights
            </h2>
            <div className="flex items-center mb-4">
              <label className="mr-2">Select Year:</label>
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="p-2 border border-gray-300 rounded"
              >
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
                <option value={2021}>2021</option>
                <option value={2020}>2020</option>
              </select>
            </div>
            <LineChart
              width={700}
              height={400}
              data={bookAcquisitionData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="month"
                tick={{  fontSize: 10, fontWeight: "bold" }}
                interval={0}
                tickFormatter={(month) => month.substring(0, 3)}
                
              />
              <YAxis tick={{ fill: "#8A2BE2", fontSize: 12 }} />
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length) {
                    return (
                      <div
                        className="custom-tooltip"
                        style={{
                          backgroundColor: "#fff",
                          border: "1px solid #ccc",
                          padding: "10px",
                        }}
                      >
                        <p>{`Month: ${payload[0].payload.month}`}</p>
                        <p>{`Borrowed Books: ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#DC143C"
                activeDot={{ r: 8 }}
                dot={{ fill: "#DC143C" }}
              />
            </LineChart>
          </div>
          <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
            <h2 className="pb-6 mb-2 text-2xl font-bold text-center">
              Popular Authors
            </h2>
            <div className="flex items-center mb-4">
              <label className="mr-2">Select Period:</label>
              <select
                value={selectedAuthorPeriod}
                onChange={handleAuthorPeriodChange}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="year">Nearest Year</option>
                <option value="month">Nearest Month</option>
                <option value="week">Nearest Week</option>
              </select>
            </div>
            <BarChart
              width={700}
              height={450}
              data={popularAuthorsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
              barSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="AuthorName"
                tick={{ textAnchor: "end", fontSize: 10 , fontWeight: "bold"}}
                interval={0}
                tickFormatter={(value) => value.split(" ").join("\n")}
              />
              <YAxis />
              <Tooltip />
              <Legend contentStyle={CustomLegend} />
              <Bar dataKey="IssuedBooks" fill="#8884d8">
                {popularAuthorsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="IssuedBooks"
                  position="insideBottom"
                  offset={10}
                />
              </Bar>
              <Bar dataKey="ReservedBooks" fill="#82ca9d">
                {popularAuthorsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="ReservedBooks"
                  position="insideBottom"
                  offset={10}
                />
              </Bar>
            </BarChart>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="flex justify-center py-6 space-x-10">
          <StatCard
            title="Total Books"
            count={totalBooks}
            emoji="📚"
            colors="from-blue-500 to-blue-400 "
          />
          <StatCard
            title="Total Members"
            count={totalMembers}
            emoji="👥"
            colors="from-green-500 to-green-400"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;



