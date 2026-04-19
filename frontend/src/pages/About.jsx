import "../styles/about.css";

export default function About() {
  return (
    <div className="about-page">

      {/* HEADER */}
      <div className="header">
        <i className="fa-solid fa-plate-wheat"></i>
        <h1>About SharePlate</h1>
      </div>

      {/* MAIN */}
      <div className="container">

        {/* INTRO */}
        <div className="intro">
          <h2>Sharing Food, Creating Connections</h2>
          <p>
            SharePlate is a community-driven platform designed to connect food lovers,
            vendors, and individuals who believe in sharing meals responsibly.
          </p>
        </div>

        {/* MISSION */}
        <div className="section">
          <h3>Our Mission</h3>
          <p>
            Our mission is to create a safe food-sharing ecosystem that promotes
            trust, responsibility, and community engagement.
          </p>
        </div>

        {/* FEATURES */}
        <div className="section">
          <h3>What We Offer</h3>

          <div className="features">

            <div className="feature-card">
              <i className="fa-solid fa-bowl-food feature-icon"></i>
              <h4>Curated Meals</h4>
              <p>Explore a variety of meals from trusted providers.</p>
            </div>

            <div className="feature-card">
              <i className="fa-solid fa-user-check feature-icon"></i>
              <h4>Verified Vendors</h4>
              <p>Encouraging safe and verified food providers.</p>
            </div>

            <div className="feature-card">
              <i className="fa-solid fa-heart feature-icon"></i>
              <h4>Community Focus</h4>
              <p>Connecting people through shared dining experiences.</p>
            </div>

          </div>
        </div>

        {/* RESPONSIBILITY */}
        <div className="section">
          <h3>Health & Responsibility</h3>
          <div className="notice">
            SharePlate acts only as a connecting platform between users and vendors.
            We are not responsible for any health complications arising from food consumption.
            Users are advised to verify ingredients and choose verified vendors.
          </div>
        </div>

        {/* DEVELOPER */}
        <div className="section">
          <h3>About the Developer</h3>

          <div className="developer">

            <div className="dev-icon">
              <i className="fa-solid fa-code"></i>
            </div>

            <div className="dev-details">
              <h4>Manish Shaw</h4>
              <p><i className="fa-solid fa-graduation-cap"></i> CBIT (Chaitanya Bharathi Institute of Technology)</p>
              <p><i className="fa-solid fa-envelope"></i> manishshaw@email.com</p>
              <p>
                SharePlate was developed as an academic project with a focus on modern web design,
                user experience, and responsible food sharing systems.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer>
        © 2026 SharePlate. All rights reserved.
      </footer>

    </div>
  );
}