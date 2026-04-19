import "../styles/postDetailsPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API, { FALLBACK_FOOD_IMAGE, UPLOADS_URL } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function PostDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [food, setFood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await API.get(`/food/${id}`);
        setFood(res.data);
      } catch (err) {
        showToast(err.response?.data?.msg || "Unable to load food details", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFood();
  }, [id, showToast]);

  const claimedById = typeof food?.claimedBy === "string" ? food.claimedBy : food?.claimedBy?._id;
  const isClaimed = Boolean(claimedById);
  const isClaimedByCurrentUser = claimedById === user?._id;

  const handleClaim = async () => {
    try {
      setIsClaiming(true);
      const res = await API.post(`/food/claim/${id}`);
      setFood(res.data.food);
      showToast(res.data.msg || "Food claimed successfully");
    } catch (err) {
      showToast(err.response?.data?.msg || "Unable to claim this food", "error");
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="post-details-page">
      <Navbar />

      <main className="post-details-main">
        {isLoading ? (
          <div className="post-details-empty">Loading food details...</div>
        ) : !food ? (
          <div className="post-details-empty">This food post could not be found.</div>
        ) : (
          <div className="post-container">
            <div className="post-image">
              <img
                src={food.image ? `${UPLOADS_URL}/${food.image}` : FALLBACK_FOOD_IMAGE}
                alt={food.title}
              />
            </div>

            <div className="post-content">
              <div className="title-row">
                <h2>{food.title}</h2>

                {food.donor?.verified && (
                  <span className="badge">
                    <i className="fa-solid fa-circle-check"></i>
                    Verified
                  </span>
                )}
              </div>

              {isClaimed && (
                <div className={`claim-banner${isClaimedByCurrentUser ? " claim-banner--owner" : ""}`}>
                  {isClaimedByCurrentUser ? "You claimed this food" : "This food has already been claimed"}
                </div>
              )}

              <div className="meta">
                <p><i className="fa-solid fa-location-dot"></i> {food.location}</p>
                <p><i className="fa-solid fa-clock"></i> {food.pickupTime}</p>
                <p><i className="fa-solid fa-phone"></i> {food.phoneNumber}</p>
              </div>

              <div className="description">
                {food.description || "No description available for this post."}
              </div>

              <div className="donor">
                <i className="fa-solid fa-user"></i>
                <span>
                  {food.donor?.name || "Unknown donor"}
                  {food.donor?.verified ? " - Verified donor" : ""}
                </span>
              </div>

              <div className="actions">
                <button
                  type="button"
                  className="post-details-btn map-btn"
                  onClick={() => {
                    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(food.location)}`;
                    window.open(url, "_blank", "noopener,noreferrer");
                  }}
                >
                  <i className="fa-solid fa-map"></i> View Location
                </button>

                <button
                  type="button"
                  className={`post-details-btn claim-btn${isClaimed ? " claim-btn--disabled" : ""}`}
                  disabled={isClaimed || isClaiming}
                  onClick={handleClaim}
                >
                  {isClaiming
                    ? "Claiming..."
                    : isClaimedByCurrentUser
                      ? "You claimed this"
                      : isClaimed
                        ? "Claimed"
                        : "Claim Food"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
