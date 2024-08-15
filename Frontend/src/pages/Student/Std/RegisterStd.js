import React from "react";
import "./RegisterStd.css";

function RegisterStd() {
    return (
        <div className="register-container">
            <h1>REGISTER STUDENT PAGE</h1>
            <form>
                <label>Name</label>
                <input type="text"  required/>

                <label>Father Name</label>
                <input type="text" required />

                <label>Email</label>
                <input type="email" required />

                <label>Phone Number</label>
                <input type="tel"  required/>

                <label>CNIC Number</label>
                <input type="text"  required/>

                <label>Password</label>
                <input type="password"  required/>

                <label>Address</label>
                <input type="text" required />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterStd;
