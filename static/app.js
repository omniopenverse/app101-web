
async function loadUsers() {
  `/users`
  const res = await fetch('http://localhost:5000/users');
  console.log(res);
  const users = await res.json();
  const dropdown = document.getElementById('userDropdown');
  const tableBody = document.getElementById('usersTable').querySelector('tbody');
  dropdown.innerHTML = '<option value="">Select a user</option>';
  tableBody.innerHTML = '';
  users.forEach(user => {
    dropdown.innerHTML += `<option value="${user.name}">${user.name}</option>`;
    tableBody.innerHTML += `<tr><td>${user.name}</td><td>${user.age}</td><td>${user.email}</td></tr>`;
  });
}

async function fetchSelectedUser() {
  const name = document.getElementById('userDropdown').value;
  if (!name) return;
  const res = await fetch(`http://localhost:5000/user/${name}`);
  const user = await res.json();
  const infoDiv = document.getElementById('selectedUserInfo');
  infoDiv.innerHTML = `<p>Name: ${user.name}, Age: ${user.age}, Email: ${user.email}</p>`;
}

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
