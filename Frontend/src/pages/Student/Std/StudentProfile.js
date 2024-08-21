import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./StudentProfile.css";

function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    phone: "",
    address: "",
    profilePic: "",
  });

  useEffect(() => {
    console.log("Fetching student data for ID:", id);
    fetch(`http://localhost:5000/student/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        if (data.status === "ok") {
          setStudent(data.data);
          setFormData({
            name: data.data.name,
            fatherName: data.data.fatherName,
            email: data.data.email,
            phone: data.data.phone,
            address: data.data.address,
            profilePic: data.data.profilePic,
          });
        } else {
          alert("Failed to fetch student data");
        }
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePic: file,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('fatherName', formData.fatherName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('address', formData.address);
    
    if (formData.profilePic) {
        formDataToSend.append('profilePic', formData.profilePic);
    }

    fetch(`http://localhost:5000/student/${id}`, {
        method: 'PUT',
        body: formDataToSend,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'ok') {
            alert('Profile updated successfully');
            setStudent(data.data);
            setEditing(false);
        } else {
            alert('Failed to update profile');
        }
    })
    .catch(error => {
        console.error('Error updating profile:', error);
    });
  };

  return (
    <div className="profile-container">
      {student ? (
        <>
          {editing ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Father's Name:</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Profile Picture:</label>
                <input type="file" onChange={handleFileChange} />
              </div>
              <button type="submit">Save Changes</button>
            </form>
          ) : (
            <>
              <img
                src={
                  student.profilePic
                    ? `http://localhost:5000/${student.profilePic}?${new Date().getTime()}`
                    : "default-profile-pic.jpg"
                }
                alt="Profile"
                className="profile-pic"
              />
              <h1>{student.name}</h1>
              <p>Father's Name: {student.fatherName}</p>
              <p>Email: {student.email}</p>
              <p>Phone: {student.phone}</p>
              <p>Address: {student.address}</p>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StudentProfile;
