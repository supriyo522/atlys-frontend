import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('https://atlys-backend.onrender.com/api/auth/register', { email, username, password });
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modal">
            <h2>Create an account to continue</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
            />
            <input
                type="text"
                placeholder="Choose a preferred username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
            />
            <input
                type="password"
                placeholder="Choose a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
            />
            <button onClick={handleRegister} className="button">Continue</button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default RegisterPage;



