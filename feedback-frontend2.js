const KEY = 'feedbacks_v1'


// Save & load feedbacks
export function saveFeedbacks(data) {
  localStorage.setItem('feedbacks', JSON.stringify(data))
}
export function loadFeedbacks() {
  return JSON.parse(localStorage.getItem('feedbacks') || '[]')
}

// 🔹 User Management
export function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users))
}
export function loadUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]')
}
