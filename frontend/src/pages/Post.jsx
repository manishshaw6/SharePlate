import { useState } from "react";
import "../styles/postPage.css";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useToast } from "../context/ToastContext";

export default function Post() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: "",
    location: "",
    pickupTime: "",
    phoneNumber: "",
    description: ""
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const data = new FormData();

      data.append("title", form.title);
      data.append("location", form.location);
      data.append("pickupTime", form.pickupTime);
      data.append("phoneNumber", form.phoneNumber);
      data.append("description", form.description);

      if (image) {
        data.append("image", image);
      }

      await API.post("/food", data);

      showToast("Food posted successfully");
      navigate("/leaderboard");

    } catch (err) {
      showToast(err.response?.data?.msg || "Unable to post food", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-page">
      <Navbar />

      <main className="post-main">
        <div className="post-container">
          <div className="post-header">
            <h3>Create Food Post</h3>
            <p>Share clear pickup details so receivers can claim quickly and safely.</p>
          </div>

          <form className="post-form" onSubmit={handleSubmit}>
            <label className="post-field">
              <span>Food Title</span>
              <input
                name="title"
                placeholder="Veg meals pack"
                value={form.title}
                onChange={handleChange}
                required
              />
            </label>

            <label className="post-field">
              <span>Location</span>
              <input
                name="location"
                placeholder="Banjara Hills, Hyderabad"
                value={form.location}
                onChange={handleChange}
                required
              />
            </label>

            <label className="post-field">
              <span>Pickup Time</span>
              <input
                name="pickupTime"
                placeholder="Today before 8:00 PM"
                value={form.pickupTime}
                onChange={handleChange}
                required
              />
            </label>

            <label className="post-field">
              <span>Phone Number</span>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="+91 98765 43210"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>

            <label className="post-field">
              <span>Description</span>
              <textarea
                name="description"
                placeholder="Mention food quantity, packaging details, and any handling notes."
                value={form.description}
                onChange={handleChange}
                rows="5"
              />
            </label>

            <label className="post-field post-field--file">
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0] || null)}
              />
            </label>

            <button type="submit" className="post-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Food"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
