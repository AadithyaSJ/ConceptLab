document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  // Normally here you would send this data to the backend or Firebase
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);

  alert("Signup successful! Redirecting to Dashboard...");

  // Simulate redirect
  window.location.href = "dashboard.html"; // or home.html
});
