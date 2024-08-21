import React, { useState, useEffect } from 'react';
import './AttendancePaage.css';

function AttendancePage() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [editingRecord, setEditingRecord] = useState(null);
    const [newRecord, setNewRecord] = useState({ studentId: '', name: '', date: '', workDone: '', time: '' });

    useEffect(() => {
        fetch('http://localhost:5000/students')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    setStudents(data.data);
                } else {
                    alert('Failed to fetch students');
                }
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, []);

    const handleStudentClick = (studentId) => {
        fetch(`http://localhost:5000/attendance/${studentId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    setSelectedStudent(studentId);
                    setAttendanceRecords(data.data);
                } else {
                    alert('Failed to fetch attendance records');
                }
            })
            .catch(error => {
                console.error('Error fetching attendance records:', error);
            });
    };

    const handleAddRecord = () => {
  
        if (!selectedStudent) {
            alert('Please select a student first');
            return;
        }
    

        if (!newRecord.name || !newRecord.date || !newRecord.workDone) {
            alert('All fields except time are required');
            return;
        }
    

        const currentTime = new Date().toISOString();

        const recordToAdd = {
            studentId: selectedStudent, 
            name: newRecord.name,
            date: newRecord.date,
            workDone: newRecord.workDone,
            time: currentTime
        };
    
        fetch('http://localhost:5000/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recordToAdd)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                setAttendanceRecords([...attendanceRecords, recordToAdd]);
                setNewRecord({ name: '', date: '', workDone: '', time: '' });
            } else {
                alert('Failed to add attendance record');
            }
        })
        .catch(error => {
            console.error('Error adding attendance record:', error);
        });
    };
    
    

    const handleUpdateRecord = () => {
        fetch(`http://localhost:5000/attendance/${editingRecord._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingRecord)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                setAttendanceRecords(attendanceRecords.map(record => record._id === editingRecord._id ? editingRecord : record));
                setEditingRecord(null);
            } else {
                alert('Failed to update attendance record');
            }
        })
        .catch(error => {
            console.error('Error updating attendance record:', error);
        });
    };

    const handleDeleteRecord = (recordId) => {
        fetch(`http://localhost:5000/attendance/${recordId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                setAttendanceRecords(attendanceRecords.filter(record => record._id !== recordId));
            } else {
                alert('Failed to delete attendance record');
            }
        })
        .catch(error => {
            console.error('Error deleting attendance record:', error);
        });
    };

    return (
        <div className="attendance-page-container">
            <h1>Attendance</h1>
            <div className="students-table">
                <h2>Students</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map(student => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>
                                        <button className='abd' onClick={() => handleStudentClick(student._id)}>View Attendance</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {selectedStudent && (
                <div className="attendance-records">
                    <h2>Attendance Records</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Work Done</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceRecords.length > 0 ? (
                                attendanceRecords.map(record => (
                                    <tr key={record._id}>
                                        <td>{record.date}</td>
                                        <td>{record.workDone}</td>
                                        <td>{record.time}</td>
                                        <td>
                                            <button className='abd' onClick={() => setEditingRecord(record)}>Edit</button>
                                            <button className='abd' onClick={() => handleDeleteRecord(record._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No attendance records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            {editingRecord && (
                <div className="edit-record">
                    <h2>Edit Attendance Record</h2>
                    <input
                        type="text"
                        value={editingRecord.name}
                        onChange={(e) => setEditingRecord({ ...editingRecord, name: e.target.value })}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        value={editingRecord.date}
                        onChange={(e) => setEditingRecord({ ...editingRecord, date: e.target.value })}
                        placeholder="Date"
                    />
                    <input
                        type="text"
                        value={editingRecord.workDone}
                        onChange={(e) => setEditingRecord({ ...editingRecord, workDone: e.target.value })}
                        placeholder="Work Done"
                    />
                    <input
                        type="text"
                        value={editingRecord.time}
                        onChange={(e) => setEditingRecord({ ...editingRecord, time: e.target.value })}
                        placeholder="Time"
                    />
                    <button className='abd' onClick={handleUpdateRecord}>Update</button>
                    <button className='abd' onClick={() => setEditingRecord(null)}>Cancel</button>
                </div>
            )}
            {!editingRecord && selectedStudent && (
                <div className="add-record">
                    <h2>Add Attendance Record</h2>
                    <input
                        type="text"
                        value={newRecord.name}
                        onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        value={newRecord.date}
                        onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                        placeholder="Date"
                    />
                    <input
                        type="text"
                        value={newRecord.workDone}
                        onChange={(e) => setNewRecord({ ...newRecord, workDone: e.target.value })}
                        placeholder="Work Done"
                    />
                    <input
                        type="text"
                        value={newRecord.time}
                        readOnly
                        placeholder="Time (auto-filled)"
                    />
                    <button className='abd'  onClick={handleAddRecord}>Add</button>
                </div>
            )}
        </div>
    );
}

export default AttendancePage;
