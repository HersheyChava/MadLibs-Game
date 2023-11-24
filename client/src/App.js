import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result'


function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Game" element={<Game/>} />
        <Route path="/Result" element={<Result/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
