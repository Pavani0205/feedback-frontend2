import React from "react";

const FeedbackList = ({ feedbacks }) => {
  if (feedbacks.length === 0) {
    return <p>No feedback available yet.</p>;
  }

  return (
    <div className="feedback-list">
      <h2>All Feedback</h2>
      {feedbacks.map((feedback, index) => (
        <div
          key={index}
          className={`feedback-item ${feedback.category.toLowerCase()}`}
        >
          <strong>{feedback.name}</strong>
          <p>⭐ {feedback.rating}</p>
          <p>{feedback.comment}</p>
          <small>
            {feedback.category} • {feedback.date}
          </small>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
