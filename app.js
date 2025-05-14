// ...existing code...
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const organization = document.getElementById('organization').value;
  if (username) {
    localStorage.setItem('username', username);
    localStorage.setItem('organization', organization);
    document.cookie = `username=${encodeURIComponent(username)}; path=/`;
    window.location.href = '/index.ejs';
  }
});
// ...existing code...