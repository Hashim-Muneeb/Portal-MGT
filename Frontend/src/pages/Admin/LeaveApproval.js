import React, { useState, useEffect } from 'react';
import './LeaveApproval.css'; 

function LeaveApproval() {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        
        fetch('http://localhost:5000/leave-requests')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    setLeaveRequests(data.data);
                } else {
                    alert('Failed to fetch leave requests');
                }
            })
            .catch(error => {
                console.error('Error fetching leave requests:', error);
            });
    }, []);

    const handleApprove = (id) => {
        fetch(`http://localhost:5000/leave-requests/approve/${id}`, {
            method: 'PUT',
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    alert('Leave request approved');
                    setLeaveRequests(leaveRequests.filter(request => request._id !== id));
                } else {
                    alert('Failed to approve leave request');
                }
            })
            .catch(error => {
                console.error('Error approving leave request:', error);
            });
    };

    const handleDecline = (id) => {
        fetch(`http://localhost:5000/leave-requests/decline/${id}`, {
            method: 'PUT',
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    alert('Leave request declined');
                    setLeaveRequests(leaveRequests.filter(request => request._id !== id));
                } else {
                    alert('Failed to decline leave request');
                }
            })
            .catch(error => {
                console.error('Error declining leave request:', error);
            });
    };

    return (
        <div className="leave-approval-page">
            <h1>Leave Approval Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Days</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.length > 0 ? (
                        leaveRequests.map(request => (
                            <tr key={request._id}>
                                <td>{request.studentName}</td>
                                <td>{request.days}</td>
                                <td>{request.reason}</td>
                                <td>{new Date(request.date).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleApprove(request._id)}>Approve</button>
                                    <button onClick={() => handleDecline(request._id)}>Decline</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No leave requests found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default LeaveApproval;
