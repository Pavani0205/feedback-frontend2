import React from "react";

export default function AdminDashboard({ feedbacks, onDelete }) {
  // Calculate stats
  const total = feedbacks.length;
  const avgRating =
    total > 0
      ? (feedbacks.reduce((sum, fb) => sum + Number(fb.rating), 0) / total).toFixed(1)
      : 0;

  const categoryStats = feedbacks.reduce((acc, fb) => {
    acc[fb.category] = (acc[fb.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-card blue">
          <h3>Total Feedback</h3>
          <p>{total}</p>
        </div>
        <div className="stat-card green">
          <h3>Average Rating</h3>
          <p>{avgRating}</p>
        </div>
        <div className="stat-card orange">
          <h3>Categories</h3>
          <ul>
            {Object.entries(categoryStats).map(([cat, count]) => (
              <li key={cat}>
                {cat}: <strong>{count}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Feedback List */}
      <h3>All Feedback</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul className="feedback-list">
          {feedbacks.map((fb) => (
            <li key={fb.id} className="feedback-card admin-card">
              <div className="feedback-header">
                <strong>{fb.name || "Anonymous"}</strong>{" "}
                <span className="category">({fb.category})</span>
              </div>
              <div className="feedback-rating">⭐ {fb.rating}</div>
              <div className="feedback-comment">{fb.comment}</div>
              <div className="feedback-date">
                {new Date(fb.date).toLocaleString()}
              </div>

              <button
                className="btn btn-delete"
                onClick={() => onDelete(fb.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
