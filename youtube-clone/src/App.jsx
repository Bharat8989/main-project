import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import Routes and Route
import { AppContext } from './Context/ContextAPi';

import Header from './components/Header.jsx';
import Feed from './components/Feed';
import SearchResult from './components/SearchResult';
import VideoDetails from './components/VideoDetails';

const App = () => {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <Header />
          <Routes>
            {/* Route paths for your different components */}
            <Route path="/" element={<Feed />} />
            <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
            <Route path="/video/:id" element={<VideoDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  );
};

export default App;
