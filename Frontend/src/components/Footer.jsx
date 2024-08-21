import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <p>&copy; 2024 Eizi Tech Portal. All rights reserved.</p>
            </div>
            <div className="footer-bottom">
                <div className="footer-social">
                    <a href="https://facebook.com" className="footer-icon" aria-label="Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" className="footer-icon" aria-label="Twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://linkedin.com" className="footer-icon" aria-label="LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://instagram.com" className="footer-icon" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <div className="footer-description">
                    <p>Providing students with Internship and Job opportunities without any prior experience</p>
                </div>
                <div className="footer-links">
                    <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
                    <a href="/terms-of-service" className="footer-link">Terms of Service</a>
                    <a href="/contact" className="footer-link">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
