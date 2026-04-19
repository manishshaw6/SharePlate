export { default } from "./RegisterPage";
/*
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/register.css";

export default function Register() {

  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      legacyAlert("Please accept terms");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      legacyAlert("Passwords do not match");
      return;
    }

    try {
      // 🔥 CALL BACKEND REGISTER API
      await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role
      });

      legacyAlert("Account created successfully");

      navigate("/login");

    } catch (err) {
      console.log(err);
      legacyAlert(err.response?.data?.msg || "Registration failed");
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

          {/* NAME */}
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

          {/* EMAIL */}
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

          {/* ROLE */}
          <div className="inputBox">
            <i className="fa-solid fa-users icon-left"></i>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Account Type</option>
              <option value="general">General User</option>
              <option value="donor">Donor</option>
              <option value="receiver">Receiver</option>
            </select>
          </div>

          {/* PASSWORD */}
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

          {/* CONFIRM PASSWORD */}
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

          {/* TERMS */}
          <div className="terms">
            <input
              type="checkbox"
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label>
              I agree to{" "}
              <Link to="/terms" target="_blank">
                Terms & Conditions
              </Link>
            </label>
          </div>

          {/* BUTTON */}
          <button disabled={!agree} className={agree ? "enabled" : ""}>
            Register
          </button>

          {/* LOGIN LINK */}
          <div className="extra">
            Already have an account? <Link to="/login">Login</Link>
          </div>

        </form>
      </div>
    </div>
  );
}
*/
