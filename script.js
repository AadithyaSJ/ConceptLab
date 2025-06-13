// Placeholder for future logic (e.g., Firebase authentication)

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Email:", email);
  console.log("Password:", password);
  alert("Login attempted with Email: " + email);
});

document.getElementById("googleLogin").addEventListener("click", function () {
  alert("Google login clicked (add Firebase integration here)");
});
