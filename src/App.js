import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import CreatePost from './components/CreatePost';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/" element={<RegisterPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

