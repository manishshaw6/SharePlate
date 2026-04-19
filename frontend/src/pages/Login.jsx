export { default } from "./LoginPage";
/*
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api"; // ✅ backend connection
import "../styles/login.css";

export default function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      legacyAlert("Please enter email and password");
      return;
    }

    try {
      // 🔥 CALL BACKEND LOGIN API
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log(res.data);

      // ✅ STORE TOKEN
      localStorage.setItem("token", res.data.token);

      // (optional) store user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      legacyAlert("Login successful");

      // ✅ REDIRECT
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      legacyAlert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-page">
      
      {/* LEFT SIDE */
//       <div className="left">
//         <div className="left-content">
//           <i className="fa-solid fa-plate-wheat"></i>
//           <h1>SharePlate</h1>
//           <p>Share Food. Share Happiness.</p>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="right">
//         <div className="loginBox">
//           <h2>Welcome Back</h2>

//           <form onSubmit={handleSubmit}>

//             {/* EMAIL */}
//             <div className="inputBox">
//               <i className="fa-solid fa-envelope icon-left"></i>

//               <input
//                 type="email"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             {/* PASSWORD */}
//             <div className="inputBox">
//               <i className="fa-solid fa-key icon-left"></i>

//               <input
//                 type={show ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               <i
//                 className={`fa-solid ${show ? "fa-eye-slash" : "fa-eye"} icon-right`}
//                 onClick={() => setShow(!show)}
//               ></i>
//             </div>

//             {/* BUTTON */}
//             <button type="submit">Login</button>

//             {/* REGISTER LINK */}
//             <div className="extra">
//               Don't have an account?{" "}
//               <Link to="/register">Register</Link>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// */
