import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginStd() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login/student', {
                email,
                password
            });

            if (response.data.status === 'ok') {
            
                localStorage.setItem('token', response.data.data);
                navigate('/DashboardStd');
            } else {
                
                alert(response.data.error);
            }
        } catch (error) {
            console.error("There was an error logging in!", error);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className="register-container">
            <h1>LOGIN STUDENT PAGE</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginStd;
