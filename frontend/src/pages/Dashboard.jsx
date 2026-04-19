import "../styles/dashboardPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API, { FALLBACK_FOOD_IMAGE, UPLOADS_URL } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Dashboard() {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [claimingId, setClaimingId] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const currentUserId = user?._id;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await API.get("/food");
        setFoods(res.data);
      } catch (err) {
        showToast(err.response?.data?.msg || "Unable to load food posts", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, [showToast]);

  const getClaimedById = (food) => (
    typeof food.claimedBy === "string" ? food.claimedBy : food.claimedBy?._id
  );

  const getClaimLabel = (food) => {
    const claimedById = getClaimedById(food);

    if (!claimedById) {
      return "Claim";
    }

    return claimedById === currentUserId ? "You claimed this" : "Claimed";
  };

  const handleClaim = async (foodId) => {
    try {
      setClaimingId(foodId);
      const res = await API.post(`/food/claim/${foodId}`);

      setFoods((currentFoods) => currentFoods.map((food) => (
        food._id === foodId ? res.data.food : food
      )));

      showToast(res.data.msg || "Food claimed successfully");
    } catch (err) {
      showToast(err.response?.data?.msg || "Unable to claim this food", "error");
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h2 className="section-title">Available Food</h2>
            <p className="section-subtitle">
              Browse active donations and claim nearby food before pickup time closes.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="dashboard-empty">Loading available food posts...</div>
        ) : foods.length === 0 ? (
          <div className="dashboard-empty">
            <h3>No food posts yet</h3>
            <p>Create a new donation to get the community started.</p>
          </div>
        ) : (
          <div className="food-grid">
            {foods.map((food) => {
              const claimedById = getClaimedById(food);
              const isClaimed = Boolean(claimedById);
              const isClaimedByCurrentUser = claimedById === currentUserId;

              return (
                <article
                  key={food._id}
                  className="food-card"
                  onClick={() => navigate(`/post/${food._id}`)}
                >
                  <div className="card-image">
                    <img
                      src={food.image ? `${UPLOADS_URL}/${food.image}` : FALLBACK_FOOD_IMAGE}
                      alt={food.title}
                    />

                    {isClaimed && (
                      <span className={`food-status-badge${isClaimedByCurrentUser ? " food-status-badge--owner" : ""}`}>
                        {isClaimedByCurrentUser ? "You claimed this" : "Claimed"}
                      </span>
                    )}
                  </div>

                  <div className="card-body">
                    <div className="card-title-row">
                      <h3>{food.title}</h3>

                      {food.donor?.verified && (
                        <span className="verified-badge">
                          <i className="fa-solid fa-circle-check"></i>
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="card-donor">
                      Posted by {food.donor?.name || "Unknown donor"}
                    </p>

                    <p className="card-meta">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>{food.location}</span>
                    </p>

                    <p className="card-meta">
                      <i className="fa-solid fa-clock"></i>
                      <span>{food.pickupTime}</span>
                    </p>

                    <p className="card-description">
                      {food.description || "No description available."}
                    </p>

                    <div className="card-actions">
                      <button
                        type="button"
                        className={`dashboard-action-btn claim-btn${isClaimed ? " claim-btn--disabled" : ""}`}
                        disabled={isClaimed || claimingId === food._id}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClaim(food._id);
                        }}
                      >
                        {claimingId === food._id ? "Claiming..." : getClaimLabel(food)}
                      </button>

                      <button
                        type="button"
                        className="dashboard-action-btn map-btn"
                        onClick={(event) => {
                          event.stopPropagation();
                          const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(food.location)}`;
                          window.open(url, "_blank", "noopener,noreferrer");
                        }}
                      >
                        Map
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
