// main.js: dynamic product/category loading
console.log('UsTradeDepot frontend loaded.');
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const loginStatus = document.getElementById('login-status');
  const cartIcon = document.getElementById('cart-icon');
  const loginBtn = document.getElementById('login-button');
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const cartIcon = document.getElementById('cart-icon');
  const loginStatus = document.getElementById('login-status');
  const loginBtn = document.getElementById('login-button');

  if (user) {
    // Logged in
    loginStatus.textContent = `Logged in as ${user.name}`;
    cartIcon.src = "/images/cart-yellow.png";
    loginBtn.textContent = "Logout";
    loginBtn.href = "#";
    loginBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      location.reload();
    });
  } else {
    // Not logged in
    loginStatus.textContent = "Not logged in";
    cartIcon.src = "/images/cart-black.png";
    loginBtn.textContent = "Login";
    loginBtn.href = "/login.html";
  }
});

  if (user) {
    loginStatus.textContent = `Logged in as ${user.name}`;
    cartIcon.src = '/images/cart-yellow.png';
    loginBtn.textContent = 'Logout';
    loginBtn.href = '#';
    loginBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      location.reload();
    });
  } else {
    loginStatus.textContent = 'Not logged in';
    cartIcon.src = '/images/cart-black.png';
  }
});
