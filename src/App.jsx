import React, { useEffect, useState } from 'react'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import AdminDashboard from './components/AdminDashboard'
import Login from './components/Login'
import Signup from './components/Signup'

export default function App() {
  const [feedbacks, setFeedbacks] = useState([]) // fetch from backend
  const [user, setUser] = useState(null)         // logged-in user
  const [authPage, setAuthPage] = useState('signup') // 'signup' or 'login'
  const [filter, setFilter] = useState({ category: 'All', q: '' })

  // Fetch feedbacks from backend on mount
  useEffect(() => {
    fetch("http://localhost:8081/api/feedback")
      .then(res => res.json())
      .then(data => setFeedbacks(data))
      .catch(err => console.error("Failed to fetch feedbacks:", err))
  }, [])

  // Add feedback via backend POST
  function addFeedback(data) {
    const newFeedback = { ...data, date: new Date().toISOString() }

    fetch("http://localhost:8081/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeedback)
    })
      .then(res => res.json())
      .then(savedFeedback => {
        setFeedbacks(prev => [savedFeedback, ...prev])
      })
      .catch(err => {
        console.error("Failed to add feedback:", err)
        alert("Failed to add feedback")
      })
  }

  // Delete feedback via backend DELETE
  function deleteFeedback(id) {
    fetch(`http://localhost:8081/api/feedback/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete feedback")
        setFeedbacks(prev => prev.filter(f => f.id !== id))
      })
      .catch(err => console.error(err))
  }

  // Extract categories dynamically
  const categories = ['All', ...Array.from(new Set(feedbacks.map(f => f.category)))]

  // Auth pages
  if (!user) {
    return authPage === 'signup'
      ? <Signup onSwitch={setAuthPage} />
      : <Login onLogin={setUser} onSwitch={setAuthPage} />
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Feedback Management</h1>
          <div>
            <span style={{ marginRight: 10 }}>
              Hi, {user.username} ({user.role})
            </span>
            <button className="btn" onClick={() => setUser(null)}>Logout</button>
          </div>
        </header>

        <main>
          {user.role === 'user' ? (
            <>
              <FeedbackForm onSubmit={addFeedback} />

              <div className="controls">
                <select
                  value={filter.category}
                  onChange={e => setFilter(prev => ({ ...prev, category: e.target.value }))}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <input
                  placeholder="Search name or comment..."
                  value={filter.q}
                  onChange={e => setFilter(prev => ({ ...prev, q: e.target.value }))}
                />
              </div>

              <FeedbackList feedbacks={feedbacks} filter={filter} />
            </>
          ) : (
            <AdminDashboard feedbacks={feedbacks} onDelete={deleteFeedback} />
          )}
        </main>
      </div>
    </div>
  )
}
