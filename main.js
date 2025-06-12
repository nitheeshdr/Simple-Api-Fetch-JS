const userCardsContainer = document.getElementById("userCards");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let allUsers = [];

fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(users => {
    allUsers = users;
    renderUsers(users);
  })
  .catch(error => {
    userCardsContainer.innerHTML = `<p class="text-danger">Failed to load users: ${error.message}</p>`;
  });

function renderUsers(users) {
  userCardsContainer.innerHTML = ""; // Clear previous results

  if (users.length === 0) {
    userCardsContainer.innerHTML = `<p class="text-center text-danger">No users found.</p>`;
    return;
  }

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
  <a href="user.html?id=${user.id}" class="text-decoration-none text-dark">
    <div class="card shadow rounded h-100">
      <div class="card-body text-center">
        <img src="https://i.pravatar.cc/150?u=${user.id}" 
          class="card-img-top rounded-circle mb-3" 
          alt="${user.name}" 
          style="width:100px; height:100px; object-fit:cover;">
        <h5 class="card-title">#${user.id} - ${user.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${user.email}</h6>
        <p class="card-text text-start">
          <strong>City:</strong> ${user.address.city}<br>
          <strong>Website:</strong> 
          <a href="http://${user.website}" target="_blank" rel="noopener noreferrer">${user.website}</a>
        </p>
      </div>
    </div>
  </a>
`;


    userCardsContainer.appendChild(card);
  });
}

// 🔍 Search by ID, name, or email
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();

  const filteredUsers = allUsers.filter(user =>
    user.id.toString() === query || // Exact ID match
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  );

  renderUsers(filteredUsers);
});
