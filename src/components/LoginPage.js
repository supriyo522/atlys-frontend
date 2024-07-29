import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://atlys-backend.onrender.com/api/auth/login', { emailOrUsername, password });
            localStorage.setItem('token', response.data.token);
            navigate('/create-post');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modal">
            <h2>Log into your account</h2>
            <input
                type="text"
                placeholder="Enter your email or username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                className="input"
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
            />
            <button onClick={handleLogin} className="button">Login now</button>
            <p>Not registered yet? <a href="/register">Register</a></p>
        </div>
    );
};

export default LoginPage;


