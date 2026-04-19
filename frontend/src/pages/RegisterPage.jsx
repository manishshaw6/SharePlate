import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/registerPage.css";
import { useToast } from "../context/ToastContext";

export default function RegisterPage() {
  
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [role, setRole] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [documentFile, setDocumentFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!agree) {
      showToast("Please accept terms", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", role);

      if (documentFile) {
        data.append("document", documentFile);
      }

      await API.post("/auth/register", data);

      showToast(
        documentFile
          ? "Account created and marked as verified"
          : "Account created successfully"
      );

      navigate("/");
    } catch (err) {
      showToast(err.response?.data?.msg || "Registration failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="registerCard">
        <div className="brand">
          <i className="fa-solid fa-plate-wheat"></i>
          <h2>Create Account</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <i className="fa-solid fa-user icon-left"></i>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputBox">
            <i className="fa-solid fa-envelope icon-left"></i>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputBox">
            <i className="fa-solid fa-users icon-left"></i>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              required
            >
              <option value="">Select Account Type</option>
              <option value="general">General User</option>
              <option value="donor">Donor</option>
              <option value="receiver">Receiver</option>
            </select>
          </div>

          <div className="inputBox">
            <i className="fa-solid fa-key icon-left"></i>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <i
              className={`fa-solid ${showPass ? "fa-eye-slash" : "fa-eye"} icon-right`}
              onClick={() => setShowPass(!showPass)}
            ></i>
          </div>

          <div className="inputBox">
            <i className="fa-solid fa-key icon-left"></i>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            <i
              className={`fa-solid ${showConfirm ? "fa-eye-slash" : "fa-eye"} icon-right`}
              onClick={() => setShowConfirm(!showConfirm)}
            ></i>
          </div>

          <div className="verification">
            <label htmlFor="verification-document">
              Upload an ID or NGO document to receive verified status
            </label>
            <input
              id="verification-document"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(event) => setDocumentFile(event.target.files[0] || null)}
            />
          </div>

          <div className="terms">
            <input
              type="checkbox"
              onChange={(event) => setAgree(event.target.checked)}
            />
            <label>
              I agree to <Link to="/terms" target="_blank">Terms & Conditions</Link>
            </label>
          </div>

          <button disabled={!agree || isSubmitting} className={agree ? "enabled" : ""}>
            {isSubmitting ? "Creating account..." : "Register"}
          </button>

          <div className="extra">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
