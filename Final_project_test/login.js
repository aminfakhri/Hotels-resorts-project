// Sample hardcoded users (replace with database or API later)
const users = [
    { email: "user1@example.com", password: "123456" },
    { email: "test@example.com", password: "password" }
  ];
  
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
  
    const user = users.find(u => u.email === email && u.password === password);
  
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "index.html"; // redirect to resort page
    } else {
      document.getElementById("errorMessage").innerText = "Invalid email or password.";
    }
  });
  