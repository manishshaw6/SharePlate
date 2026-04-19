import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/loginPage.css";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      showToast("Please enter email and password", "error");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await API.post("/auth/login", {
        email,
        password
      });

      login(res.data);
      showToast("Login successful");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      showToast(err.response?.data?.msg || "Login failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="left">
        <div className="left-content">
          <i className="fa-solid fa-plate-wheat"></i>
          <h1>SharePlate</h1>
          <p>Share Food. Share Happiness.</p>
        </div>
      </div>

      <div className="right">
        <div className="loginBox">
          <h2>Welcome Back</h2>

          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <i className="fa-solid fa-envelope icon-left"></i>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="inputBox">
              <i className="fa-solid fa-key icon-left"></i>
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <i
                className={`fa-solid ${show ? "fa-eye-slash" : "fa-eye"} icon-right`}
                onClick={() => setShow(!show)}
              ></i>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <div className="extra">
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
