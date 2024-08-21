import React, { useState } from "react";
import "./RegisterStd.css";
import { useNavigate } from 'react-router-dom';

function RegisterAdmin() {
    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cinic, setCinic] = useState('');
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
        formData.append('phone', phone);
        formData.append('cinic', cinic);
        formData.append('password', password);
        formData.append('address', address);
        if (profilePic) {
            formData.append('profilePic', profilePic);
        }

        try {
            const response = await fetch('http://localhost:5000/register/admin', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.status === 'ok') {
                navigate('/DashboardAdmin');
            } else {
                alert(data.error || 'Error registering admin');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="register-container">
            <h1>REGISTER ADMIN PAGE</h1>
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
                    value={cinic}
                    onChange={(e) => setCinic(e.target.value)}
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

export default RegisterAdmin;
