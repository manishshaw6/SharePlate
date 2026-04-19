import "../styles/terms.css";

export default function Terms() {
  return (
    <div className="terms-page">

      <div className="header">
        <i className="fa-solid fa-plate-wheat"></i>
        <h1>SharePlate – Terms & Conditions</h1>
      </div>

      <div className="container">

        <div className="term-card">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using SharePlate, you agree to comply with and be bound by these Terms & Conditions.
            If you do not agree, please do not use our platform.
          </p>
        </div>

        <div className="term-card">
          <h2>2. Platform Nature</h2>
          <p>
            SharePlate acts as a connecting platform between food providers (vendors or individual users)
            and consumers. We do not directly prepare, cook, store, or deliver food unless explicitly stated.
          </p>
        </div>

        <div className="term-card">
          <h2>3. Health & Safety Disclaimer</h2>
          <div className="notice">
            SharePlate is not responsible for any health complications, allergic reactions,
            food poisoning, or other medical issues that may arise from consuming food.
          </div>
          <p>
            Users are strongly encouraged to review ingredient details, hygiene standards,
            and vendor information before placing any order.
          </p>
        </div>

        <div className="term-card">
          <h2>4. Verified Vendors Recommendation</h2>
          <p>
            We recommend purchasing food only from verified vendors or users marked as verified on the platform.
            While we may conduct verification checks, SharePlate does not guarantee food quality,
            preparation standards, or compliance with local food regulations.
          </p>
        </div>

        <div className="term-card">
          <h2>5. User Responsibility</h2>
          <ul>
            <li>Checking food ingredients for allergies.</li>
            <li>Confirming dietary requirements.</li>
            <li>Ensuring food is consumed safely and appropriately stored.</li>
            <li>Reporting unsafe vendors or suspicious activity.</li>
          </ul>
        </div>

        <div className="term-card">
          <h2>6. Limitation of Liability</h2>
          <p>
            Under no circumstances shall SharePlate, its owners, employees, or affiliates be held liable
            for any indirect, incidental, consequential, or special damages arising from the use of the platform,
            including but not limited to personal injury, illness, or financial loss.
          </p>
        </div>

        <div className="term-card">
          <h2>7. Modifications</h2>
          <p>
            SharePlate reserves the right to update or modify these Terms at any time without prior notice.
            Continued use of the platform indicates acceptance of any changes.
          </p>
        </div>

        <div className="term-card">
          <h2>8. Contact Information</h2>
          <p>
            For questions regarding these Terms & Conditions, please contact us through the official
            SharePlate support channels.
          </p>
        </div>

      </div>

      <footer>
        © 2026 SharePlate. All rights reserved.
      </footer>

    </div>
  );
}