
// async function loadUsers() {
//   `/users`
//   const res = await fetch('http://localhost:5000/users');
//   console.log(res);
//   const users = await res.json();
//   const dropdown = document.getElementById('userDropdown');
//   const tableBody = document.getElementById('usersTable').querySelector('tbody');
//   dropdown.innerHTML = '<option value="">Select a user</option>';
//   tableBody.innerHTML = '';


//   users.forEach(user => {
//     dropdown.innerHTML += `<option value="${user.name}">${user.name}</option>`;
//     tableBody.innerHTML += 
//     `<tr>
//     <td>${user.name}</td>
//     <td>${user.age}</td>
//     <td>${user.email}</td>
//     </tr>`;
//   });

// }


// This function loads users from the server and populates the dropdown and table
// It handles errors gracefully and ensures the UI is updated correctly.
async function loadUsers() {

  `/users` // Fetch users from the server
  try {
    const response = await fetch('http://localhost:5000/users');
    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error! status: ${response.status}`, response.statusText);
    }
    const users = await response.json();
    if (!Array.isArray(users)) {
      throw new Error('Received data is not an array', users);
    }
    const dropdown = document.getElementById('userDropdown');
    // const tableBody = document.getElementById('usersTable').querySelector('tbody');
    // dropdown.innerHTML = '<option value="">Select a user</option>';

    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = '';

    users.forEach(user => {
      const row = document.createElement('tr');
      dropdown.innerHTML += `<option value="${user.name}">${user.name}</option>`;
      row.innerHTML = 
        `
          <td>${user.name}</td>
          <td>${user.age}</td>
          <td>${user.email}</td>
        `;
      const actionCell = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.style.backgroundColor = 'red'; // Use a color that indicates danger
      deleteBtn.style.color = 'white';
      
      deleteBtn.onclick = () => {
        const confirmed = window.confirm(
          `Are you sure you want to delete ${user.name}?\n\n⚠️ This action cannot be undone.`
        );
        if (confirmed) {
          deleteUser(user.email);  // Call the delete function with the user's email
        }
      };

      actionCell.appendChild(deleteBtn);
      row.appendChild(actionCell);

      tbody.appendChild(row);
    });
} catch (error) {
    console.error('Error loading users:', error);
    alert('Failed to load users. Please try again later.');
  }
}
// This function deletes a user by their email
async function deleteUser(userstring) {
  const response = await fetch(`http://localhost:5000/user/${userstring}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    alert('User deleted successfully.');
    loadUsers(); // refresh list
  } else {
    alert('Failed to delete user.');
  }
}
// This function fetches the selected user from the dropdown and displays their information
async function fetchSelectedUser() {
  const name = document.getElementById('userDropdown').value;
  if (!name) return;
  const res = await fetch(`http://localhost:5000/user/${name}`);
  const user = await res.json();
  const infoDiv = document.getElementById('selectedUserInfo');
  infoDiv.innerHTML = `<p>Name: ${user.name}, Age: ${user.age}, Email: ${user.email}</p>`;
}
// This function adds a new user to the server
document.getElementById('addUserForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const email = document.getElementById('email').value;
  await fetch('http://localhost:5000/user', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
     },
    body: JSON.stringify({ name, age, email })
  });
  loadUsers();
});

// document.getElementById('userDropdown').addEventListener('change', fetchSelectedUser);
// document.getElementById('deleteUserButton').addEventListener('click', deleteUser);
// document.addEventListener('DOMContentLoaded', loadUsers);
