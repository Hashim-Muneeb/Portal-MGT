import React, { useState } from "react";
import "./RegisterStd.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterStd() {
    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cnic, setCnic] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [profilePic, setProfilePic] = useState(null); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('fatherName', fatherName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('cinic', cnic);
        formData.append('address', address);
        if (profilePic) {
            formData.append('profilePic', profilePic);
        }

        try {
            const response = await axios.post('http://localhost:5000/register/student', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status === 'ok') {
               
                navigate('/DashboardStd');
            } else {
                
                alert(response.data.error);
            }
        } catch (error) {
            console.error("There was an error registering the student!", error);
            alert("Registration failed. Please check the information and try again.");
        }
    };

    return (
        <div className="register-container">
            <h1>REGISTER STUDENT PAGE</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Father Name</label>
                <input
                    type="text"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Phone Number</label>
                <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <label>CNIC Number</label>
                <input
                    type="number"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label>Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />

                <label>Profile Picture</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterStd;
