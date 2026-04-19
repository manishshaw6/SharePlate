import "../styles/profilePage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API, { FALLBACK_FOOD_IMAGE, UPLOADS_URL } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { logout, updateUser } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/me");
        setProfileData(res.data);
        updateUser(res.data.user);
      } catch (err) {
        showToast(err.response?.data?.msg || "Unable to load profile", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [showToast, updateUser]);

  const handleLogout = () => {
    logout();
    showToast("You have been logged out");
    navigate("/");
  };

  const renderFoodList = (foods, emptyMessage, showClaimState = false) => {
    if (!foods.length) {
      return <div className="profile-empty-card">{emptyMessage}</div>;
    }

    return (
      <div className="profile-food-grid">
        {foods.map((food) => (
          <article
            key={food._id}
            className="profile-food-card"
            onClick={() => navigate(`/post/${food._id}`)}
          >
            <img
              src={food.image ? `${UPLOADS_URL}/${food.image}` : FALLBACK_FOOD_IMAGE}
              alt={food.title}
            />

            <div className="profile-food-card__content">
              <div className="profile-food-card__title-row">
                <h4>{food.title}</h4>

                {showClaimState && (
                  <span className="profile-chip profile-chip--claimed">Claimed</span>
                )}
              </div>

              <p>
                <i className="fa-solid fa-location-dot"></i>
                <span>{food.location}</span>
              </p>

              <p>
                <i className="fa-solid fa-clock"></i>
                <span>{food.pickupTime}</span>
              </p>

              <p>
                <i className="fa-solid fa-phone"></i>
                <span>{food.phoneNumber}</span>
              </p>

              {food.claimedBy?.name && !showClaimState && (
                <p className="profile-food-card__status">
                  Claimed by {food.claimedBy.name}
                </p>
              )}

              {showClaimState && (
                <p className="profile-food-card__status">
                  Donor: {food.donor?.name || "Unknown donor"}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    );
  };

  const user = profileData?.user;

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-main">
        {isLoading ? (
          <div className="profile-empty-card">Loading profile...</div>
        ) : !user ? (
          <div className="profile-empty-card">Profile data is unavailable right now.</div>
        ) : (
          <>
            <section className="profile-card">
              <div className="avatar">
                <i className="fa-solid fa-user"></i>
              </div>

              <div className="profile-heading">
                <div>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                </div>

                {user.verified && (
                  <span className="verified-badge">
                    <i className="fa-solid fa-circle-check"></i>
                    Verified Badge
                  </span>
                )}
              </div>

              <div className="profile-meta-grid">
                <div className="profile-meta-item">
                  <span>Role</span>
                  <strong>{user.role}</strong>
                </div>

                <div className="profile-meta-item">
                  <span>Verification</span>
                  <strong>{user.verified ? "Verified" : "Not verified"}</strong>
                </div>

                <div className="profile-meta-item">
                  <span>Points</span>
                  <strong>{user.points}</strong>
                </div>
              </div>

              <button type="button" className="profile-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </section>

            <section className="profile-section">
              <div className="profile-section__header">
                <h3>Your Posts</h3>
                <p>Track all food donations you have shared with the community.</p>
              </div>

              {renderFoodList(profileData.posts, "You have not posted any food yet.")}
            </section>

            <section className="profile-section">
              <div className="profile-section__header">
                <h3>Claimed Foods</h3>
                <p>Food donations you have successfully claimed will appear here.</p>
              </div>

              {renderFoodList(profileData.claimedFoods, "You have not claimed any food yet.", true)}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
