import "../styles/leaderboard.css";

export default function Leaderboard() {
  return (
    <div className="leaderboard-page">

      <div className="navbar">
        <h2>Leaderboard</h2>
      </div>

      <div className="leaderboard-container">

        <div className="user-card">
          <span>🥇 Rahul</span>
          <span>120 points</span>
        </div>

        <div className="user-card">
          <span>🥈 Anjali</span>
          <span>95 points</span>
        </div>

        <div className="user-card">
          <span>🥉 Kiran</span>
          <span>80 points</span>
        </div>

      </div>

    </div>
  );
}
