// Retrieve users from localStorage, or an empty array if none exist
const users = JSON.parse(localStorage.getItem("users")) || [];
  
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Find user based on email and password
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user)); // Store the logged-in user
    window.location.href = "profile.html"; // redirect to profile page
  } else {
    document.getElementById("errorMessage").innerText = "Invalid email or password."; // Display error message
  }
});
  