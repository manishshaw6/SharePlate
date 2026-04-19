import "../styles/contactPage.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="header">
        <i className="fa-solid fa-plate-wheat"></i>
        <h1>Contact Us</h1>
      </div>

      <div className="container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Have questions or need support? We're here to help you share food safely.
          </p>

          <div className="info-item">
            <i className="fa-solid fa-envelope"></i>
            <span>support@shareplate.com</span>
          </div>

          <div className="info-item">
            <i className="fa-solid fa-phone"></i>
            <span>+91 98765 43210</span>
          </div>

          <div className="info-item">
            <i className="fa-solid fa-location-dot"></i>
            <span>Hyderabad, India</span>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send a Message</h2>

          <form>
            <div className="inputBox">
              <input type="text" placeholder="Your Name" />
            </div>

            <div className="inputBox">
              <input type="email" placeholder="Your Email" />
            </div>

            <div className="inputBox">
              <input type="text" placeholder="Subject" />
            </div>

            <div className="inputBox">
              <textarea placeholder="Your Message"></textarea>
            </div>

            <button type="button">Send Message</button>
          </form>
        </div>
      </div>

      <footer>
        Copyright 2026 SharePlate. All rights reserved.
      </footer>
    </div>
  );
}
