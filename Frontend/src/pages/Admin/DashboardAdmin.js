import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardAdmin.css';
import img2 from '../../assest/add.png';

function DashboardAdmin() {
    const navigate = useNavigate();

    const handleViewAttendance = () => {
        navigate(`/AttendancePage`);
    };

    const handleLeaveApproval = () => {
        navigate(`/LeaveApproval`);
    };

    const handleGradingSystem = () => {
        navigate(`/Gradding`);
    };

    return (
        <div className="dashboard-admin-container">
            <div className="welcome-message">
                <h1>Welcome, Admin</h1>
            </div>
            <div className="dashboard-admin-content">
                <div className="image-container">
                    <img 
                        src={img2} 
                        alt="Admin Dashboard"
                        className="dashboard-image"
                    />
                </div>
                <div className="button-container">
                    <button className="dashboard-button" onClick={handleViewAttendance}>View Attendance</button>
                    <button className="dashboard-button" onClick={handleLeaveApproval}>Leave Approval</button>
                    <button className="dashboard-button" onClick={handleGradingSystem}>Grading System</button>
                </div>
            </div>
        </div>
    );
}

export default DashboardAdmin;
