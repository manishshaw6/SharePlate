import "../styles/leaderboardPage.css";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get("/users/leaderboard");
        setLeaders(res.data);
      } catch (err) {
        showToast(err.response?.data?.msg || "Unable to load leaderboard", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [showToast]);

  return (
    <div className="leaderboard-page">
      <Navbar />

      <main className="leaderboard-main">
        <div className="leaderboard-header">
          <h2>Leaderboard</h2>
          <p>Users are ranked by donation points earned from successful food claims.</p>
        </div>

        <section className="leaderboard-card">
          {isLoading ? (
            <div className="leaderboard-empty">Loading leaderboard...</div>
          ) : !leaders.length ? (
            <div className="leaderboard-empty">No leaderboard data available yet.</div>
          ) : (
            <div className="leaderboard-table-wrapper">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Points</th>
                  </tr>
                </thead>

                <tbody>
                  {leaders.map((leader, index) => {
                    const isCurrentUser = leader._id === user?._id;

                    return (
                      <tr key={leader._id} className={isCurrentUser ? "leaderboard-row--current" : ""}>
                        <td>#{index + 1}</td>
                        <td>
                          <div className="leaderboard-name-cell">
                            <span>{leader.name}</span>

                            {leader.verified && (
                              <span className="leaderboard-verified">
                                <i className="fa-solid fa-circle-check"></i>
                                Verified
                              </span>
                            )}
                          </div>
                        </td>
                        <td>{leader.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
