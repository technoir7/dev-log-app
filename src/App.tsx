import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import MessageInputUI from './components/MessageInputUI';
import ChatLog from './components/ChatLog';
import KnownIssues from './components/KnownIssues';
import KnownIssuesInput from './components/KnownIssuesInput';
import './App.css';

function App() {
  console.log('App component rendering');
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar">
          <div className="nav-bar-inner">
            <Link to="/message" className="nav-link">Message Client</Link>
            <Link to="/report-issue" className="nav-link">Report Issue</Link>
            <Link to="/chatlog" className="nav-link">Chat Log</Link>
            <Link to="/known-issues" className="nav-link">Known Issues</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/message" element={<MessageInputUI />} />
          <Route path="/report-issue" element={<KnownIssuesInput />} />
          <Route path="/chatlog" element={<ChatLog />} />
          <Route path="/known-issues" element={<KnownIssues />} />
          <Route path="/" element={<Navigate to="/message" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
