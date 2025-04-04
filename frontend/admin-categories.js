document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('add-category-form');
  const tableBody = document.querySelector('#category-table tbody');

  // Fetch and display categories
  function loadCategories() {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        tableBody.innerHTML = '';
        data.forEach(cat => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${cat.id}</td>
            <td><input type="text" value="${cat.name}" data-id="${cat.id}" /></td>
            <td>
              <button onclick="updateCategory(${cat.id})">Update</button>
              <button onclick="deleteCategory(${cat.id})">Delete</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      });
  }

  // Add category
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('new-category-name').value;
    fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    }).then(() => {
      form.reset();
      loadCategories();
    });
  });

  // Update category
  window.updateCategory = function (id) {
    const input = document.querySelector(`input[data-id="${id}"]`);
    fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: input.value })
    }).then(loadCategories);
  };

  // Delete category
  window.deleteCategory = function (id) {
    if (confirm('Are you sure you want to delete this category?')) {
      fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      }).then(loadCategories);
    }
  };

  loadCategories();
});
