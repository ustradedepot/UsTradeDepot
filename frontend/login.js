document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const status = document.getElementById('login-status');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        console.log('Login success:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        status.textContent = `Welcome, ${data.user.name}! Redirecting...`;
        status.style.color = 'green';

        // Confirm redirect fires
        setTimeout(() => {
          console.log('Redirecting now...');
          window.location.replace = '/index.html';
        }, 1000);
      } else {
        status.textContent = data.error || 'Login failed.';
        status.style.color = 'red';
        console.warn('Login error response:', data);
      }
    } catch (err) {
      status.textContent = 'Server error.';
      status.style.color = 'red';
      console.error('Fetch error:', err);
    }
  });
});

