import React, { useState } from 'react'

const defaultCategories = ['Product', 'Service', 'Website', 'Other']

export default function FeedbackForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [category, setCategory] = useState(defaultCategories[0])
  const [comment, setComment] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return alert('Please write a comment before submitting.');

    const feedback = { name: name || 'Anonymous', rating, category, comment };

    // Call backend
    const res = await fetch('http://localhost:5173/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback)
    });
    const data = await res.json();

    onFeedbackAdded(data);

    setName('');
    setRating(5);
    setCategory(defaultCategories[0]);
    setComment('');
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>

      <label>
        Name
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (optional)" />
      </label>

      <label>
        Rating
        <select value={rating} onChange={e => setRating(e.target.value)}>
          {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>

      <label>
        Category
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {defaultCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <label>
        Comment
        <textarea value={comment} onChange={e => setComment(e.target.value)} rows={4} />
      </label>

      <button type="submit" className="btn">Send Feedback</button>
    </form>
  )
}
