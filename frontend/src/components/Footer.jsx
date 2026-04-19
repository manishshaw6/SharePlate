import "../styles/footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-section">
          <h2>
            <i className="fa-solid fa-plate-wheat"></i> SharePlate
          </h2>
          <p>Sharing Food. Spreading Hope.</p>
        </div>

        {/* PLATFORM */}
        <div className="footer-section">
          <h4>Platform</h4>
          <Link to="/">How it Works</Link>
          <Link to="/post">Donate Food</Link>
          <Link to="/dashboard">Receive Food</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </div>

        {/* COMPANY */}
        <div className="footer-section">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms</Link>
        </div>

        {/* SUPPORT */}
        <div className="footer-section">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Safety</a>
          <a href="#">Report Issue</a>
        </div>

        {/* DEVELOPER */}
        <div className="footer-section">
          <h4>Developer</h4>
          <p>Manish Shaw</p>

          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-github"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        Copyright 2026 SharePlate. All rights reserved.
      </div>

    </footer>
  );
}
