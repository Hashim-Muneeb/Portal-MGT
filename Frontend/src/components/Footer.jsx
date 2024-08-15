import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

function Footer(){
    return(
        <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Eizi Tech Portal. All rights reserved.</p>
          <p>Providing students with Internship and Job opportunities without any prior experience</p>
          <nav>
            <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
            <a href="/terms-of-service" className="footer-link">Terms of Service</a>
            <a href="/contact" className="footer-link">Contact</a>
          </nav>
        </div>
      </footer>
    )
}
export default Footer;