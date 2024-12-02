// js/auth.js

document.addEventListener('DOMContentLoaded', function() {
  const isAuthenticated = localStorage.getItem('authenticated');

  if (isAuthenticated !== 'true') {
    // Redirect to login page
    window.location.href = 'login.html';
  }
});