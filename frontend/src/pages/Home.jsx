import "../styles/homePage.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <header>
        <h1 className="logo">
          <i className="fa-solid fa-plate-wheat" id="icon"></i>
          SharePlate
        </h1>

        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
      </header>

      <main className="hero">
        <video autoPlay muted loop playsInline>
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div className="overlay"></div>

        <div className="hero-content">
          <h2>Sharing Food. Spreading Hope.</h2>
          <p>
            Connecting surplus food with NGOs, orphanages, old age homes and communities in need.
          </p>

          <div className="buttons">
            <Link to="/login" className="btn-primary">Log In</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        </div>
      </main>

      {/* PROCESS FLOW */}
      <section className="process-section">
        <h2>How SharePlate Works</h2>
        <p className="process-sub">
          A simple flow from surplus to support.
        </p>

        <div className="process-flow">

          <div className="step">
            <div className="circle">
              <i className="fa-solid fa-champagne-glasses"></i>
            </div>
            <h3>Event / Catering</h3>
            <p>Food is prepared for an event or service.</p>
          </div>

          <div className="arrow"><i className="fa-solid fa-arrow-right-long"></i></div>

          <div className="step">
            <div className="circle">
              <i className="fa-solid fa-box-open"></i>
            </div>
            <h3>Surplus Food</h3>
            <p>Extra food remains after serving.</p>
          </div>

          <div className="arrow"><i className="fa-solid fa-arrow-right-long"></i></div>

          <div className="step">
            <div className="circle">
              <i className="fa-solid fa-mobile-screen"></i>
            </div>
            <h3>Post on SharePlate</h3>
            <p>Upload details of available food.</p>
          </div>

          <div className="arrow"><i className="fa-solid fa-arrow-right-long"></i></div>

          <div className="step">
            <div className="circle">
              <i className="fa-solid fa-handshake"></i>
            </div>
            <h3>NGO Claims</h3>
            <p>Receivers claim the food.</p>
          </div>

          <div className="arrow"><i className="fa-solid fa-arrow-right-long"></i></div>

          <div className="step">
            <div className="circle">
              <i className="fa-solid fa-truck"></i>
            </div>
            <h3>Food Collected</h3>
            <p>Food reaches people in need.</p>
          </div>

        </div>
      </section>
      

      <section className="info-section">

  <div className="info-container">
    <h2>Why SharePlate Matters</h2>

    <p>
      Every day, tons of perfectly good food is wasted while millions go hungry.
      SharePlate bridges this gap by connecting donors with NGOs and communities,
      ensuring surplus food reaches those who need it most.
    </p>

    <p>
      By creating a simple and reliable platform, we aim to reduce food waste,
      promote responsible sharing, and build a stronger, more connected society.
    </p>
  </div>

</section>

        <section className="impact-section">

  <h2>Our Impact</h2>
  <p className="impact-sub">
    Making a difference by connecting surplus food with those who need it the most.
  </p>

  <div className="impact-grid">

    <div className="impact-card">
      <h3>5,000+</h3>
      <p>Meals Shared</p>
    </div>

    <div className="impact-card">
      <h3>120+</h3>
      <p>NGOs Connected</p>
    </div>

    <div className="impact-card">
      <h3>25+</h3>
      <p>Cities Covered</p>
    </div>

    <div className="impact-card">
      <h3>2,000+</h3>
      <p>Active Users</p>
    </div>

  </div>

</section>

      <Footer />
    </div>
  );
}
