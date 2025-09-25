import React, { useState } from 'react'
import { loadUsers, saveUsers } from '../utils/storage'

export default function Signup({ onSwitch }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')

 function handleSubmit(e) {
  e.preventDefault();

  const newUser = { username, email, password, role };

  fetch("http://localhost:8081/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  })
    .then(async res => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to signup");
      }
      return res.json();
    })
    .then(() => {
      alert("Signup successful!");
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("user");
    })
    .catch(err => {
      console.error(err);
      alert(err.message || "Error signing up. Check console.");
    });
}



  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <label>
          Username
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>

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

        <label>
          Role
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button type="submit" className="btn">Signup</button>
        <p>
          Already have an account?{" "}
          <button type="button" onClick={() => onSwitch('login')}>
            Login here
          </button>
        </p>
      </form>
    </div>
  )
}
