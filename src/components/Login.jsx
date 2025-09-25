import React, { useState } from 'react'

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error("Invalid email or password!")
      }

      const user = await response.json()
      alert("Login successful!")
      onLogin(user) // pass user to parent
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn">Login</button>
        <p>
          Don’t have an account?{" "}
          <button type="button" onClick={() => onSwitch('signup')}>
            Signup here
          </button>
        </p>
      </form>
    </div>
  )
}
