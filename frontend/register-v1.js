document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const status = document.getElementById('register-status');

  if (!form) {
    console.error('Register form not found');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        status.textContent = 'Registration successful! Redirecting to login...';
        status.style.color = 'green';
        setTimeout(() => window.location.href = '/login.html', 1500);
      } else {
        status.textContent = data.error || 'Registration failed.';
        status.style.color = 'red';
      }
    } catch (err) {
      console.error('Fetch error:', err);
      status.textContent = 'Server error.';
      status.style.color = 'red';
    }
  });
});

