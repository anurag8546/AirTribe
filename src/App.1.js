import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditTask  from './components/EditTask.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App.js';

const App1 = () => {


  return (
  

  <div>
   <Router>
      <Routes>
           <Route path="*" element={<App />} />
           <Route path="/edit/:taskId/:taskTitle" element={<EditTask />} />
      </Routes>
    </Router>
    </div>

  );
};
export default App1;