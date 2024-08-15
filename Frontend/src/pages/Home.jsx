import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assest/ofc.png";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="image-container">
        <img src={img1} alt="Logo" className="home-image" />
      </div>
      <div className="text-container">
        <h4 className="bungee-tint-regular">
          Providing students with Internship and Job opportunities without any prior experience
        </h4>
      </div>
      <div className="button-container">
        <button className="home-button" onClick={() => navigate("/LoginAdmin")}>
          Login as Admin
        </button>
        <button className="home-button" onClick={() => navigate("/LoginStd")}>
          Login as Student
        </button>
        <button className="home-button" onClick={() => navigate("/RegisterAdmin")}>
          Register as Admin
        </button>
        <button className="home-button" onClick={() => navigate("/RegisterStd")}>
          Register as Student
        </button>
      </div>
    </div>
  );
}

export default Home;
