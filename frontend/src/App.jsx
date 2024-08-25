import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookSearch from './pages/BookSearch';
import Users from './pages/Users';
import About from './pages/About';
import Help from './pages/Help';
import BookDetails from './pages/BookDetails';

const App = () => {
  return (
    <div className='bg-customYellow'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/books' element={<BookSearch />} />
        <Route path='/details/:id' element={<BookDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/help' element={<Help />} />
      </Routes>
    </div>
  );
}

export default App;
