import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardStd.css';

function DashboardStd() {
    const [studentName, setStudentName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [studentId, setStudentId] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [workDone, setWorkDone] = useState('');
    const [isRecordVisible, setIsRecordVisible] = useState(false);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [isLeavePopupOpen, setIsLeavePopupOpen] = useState(false); 
    const [leaveDays, setLeaveDays] = useState(''); 
    const [leaveReason, setLeaveReason] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        fetch('http://localhost:5000/student/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                setStudentName(data.data.name);
                setProfilePic(data.data.profilePic);
                setStudentId(data.data._id);
            } else {
                alert('Failed to fetch student data');
            }
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
        });
    }, []);

    const handleProfileClick = () => {
        navigate(`/profile/${studentId}`);
    };

    const handleMarkAttendance = () => {
        const todayDate = new Date().toISOString().split('T')[0];

        fetch(`http://localhost:5000/attendance/${studentId}/${todayDate}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'ok' && data.data) {
                    alert('Attendance already marked for today.');
                } else if (data.status === 'ok' && !data.data) {
                    setIsPopupOpen(true);
                } else {
                    alert('Failed to check attendance');
                }
            })
            .catch(error => {
                console.error('Error checking attendance for today:', error);
            });
    };

    const handleSubmitAttendance = () => {
        const attendanceData = {
            studentId,
            name: studentName,
            date: new Date().toISOString().split('T')[0],
            workDone,
            time: new Date().toISOString(),
        };

        fetch('http://localhost:5000/attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attendanceData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'ok') {
                alert('Attendance marked successfully');
            } else {
                alert('Failed to mark attendance');
            }
            handlePopupClose();
        })
        .catch(error => {
            console.error('Error marking attendance:', error);
            handlePopupClose();
        });
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
        setWorkDone('');
    };

    const handleWorkChange = (e) => {
        setWorkDone(e.target.value);
    };

    const handleRecordClick = () => {
        fetch(`http://localhost:5000/attendance/${studentId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    setAttendanceRecords(data.data);
                    setIsRecordVisible(true);
                } else {
                    alert('Failed to fetch attendance records');
                }
            })
            .catch(error => {
                console.error('Error fetching attendance records:', error);
            });
    };

  
    const handleLeaveRequest = () => {
        setIsLeavePopupOpen(true);
    };

    const handleLeaveDaysChange = (e) => {
        setLeaveDays(e.target.value);
    };

    const handleLeaveReasonChange = (e) => {
        setLeaveReason(e.target.value);
    };

    const handleSubmitLeaveRequest = () => {
        const leaveData = {
            studentId,
            studentName,
            days: leaveDays,
            reason: leaveReason,
            date: new Date().toISOString().split('T')[0],
        };

        fetch('http://localhost:5000/leave-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leaveData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'ok') {
                alert('Leave request submitted successfully');
            } else {
                alert('Failed to submit leave request');
            }
            handleLeavePopupClose();
        })
        .catch(error => {
            console.error('Error submitting leave request:', error);
            handleLeavePopupClose();
        });
    };

    const handleLeavePopupClose = () => {
        setIsLeavePopupOpen(false);
        setLeaveDays('');
        setLeaveReason('');
    };

    return (
        <div className="dashboard-container">
            <div className="welcome-message">
                <h1>Welcome, {studentName}</h1>
            </div>
            <div className="dashboard-content">
                <div className="left-section">
                    <button className="dashboard-button" onClick={handleMarkAttendance}>Mark Attendance</button>
                    <button className="dashboard-button" onClick={handleRecordClick}>Attendance Record</button>
                    <button className="dashboard-button" onClick={handleLeaveRequest}>Leave Request</button>
                </div>
                <div className="right-section">
                    {profilePic && (
                        <img 
                            src={`http://localhost:5000/${profilePic}`}
                            alt="Profile"
                            className="profile-pic"
                            onClick={handleProfileClick}
                        />
                    )}
                    {isRecordVisible ? (
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Work Done</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceRecords.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.date}</td>
                                        <td>{record.workDone}</td>
                                        <td>{record.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Total Projects</th>
                                    <th>In Progress</th>
                                    <th>Completed</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>7</td>
                                    <td>2</td>
                                    <td>5</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Mark Attendance</h2>
                        <textarea
                            value={workDone}
                            onChange={handleWorkChange}
                            placeholder="Describe the work done today"
                        />
                        <button onClick={handleSubmitAttendance}>Submit</button>
                        <button onClick={handlePopupClose}>Cancel</button>
                    </div>
                </div>
            )}

            {isLeavePopupOpen && ( 
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Leave Request</h2>
                        <input
                            type="number"
                            value={leaveDays}
                            onChange={handleLeaveDaysChange}
                            placeholder="Number of days"
                        />
                        <textarea
                            value={leaveReason}
                            onChange={handleLeaveReasonChange}
                            placeholder="Reason for leave"
                        />
                        <button onClick={handleSubmitLeaveRequest}>Submit</button>
                        <button onClick={handleLeavePopupClose}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardStd;
