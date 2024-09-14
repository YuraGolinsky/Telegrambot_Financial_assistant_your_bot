// Get the modals
var modal = document.getElementById("myModal");
var editModal = document.getElementById("editModal");
var passwordModal = document.getElementById("passwordModal");
var closeModal = document.getElementById("closeModal");
var closeEditModal = document.getElementById("closeEditModal");
var closePasswordModal = document.getElementById("closePasswordModal");
var openModalBtn = document.getElementById("openModalBtn");
var loadCardsBtn = document.getElementById("loadCardsBtn");

// Open the modal to add a new accumulation
openModalBtn.onclick = function() {
  modal.style.display = "flex";
}

// Close the modals
closeModal.onclick = function() {
  modal.style.display = "none";
}

closeEditModal.onclick = function() {
  editModal.style.display = "none";
}

closePasswordModal.onclick = function() {
  passwordModal.style.display = "none";
}

// Handle form submission for adding new accumulation
document.getElementById("accumulationForm").onsubmit = function(event) {
  event.preventDefault();

  var photo = document.getElementById("photo").value;
  var title = document.getElementById("title").value;
  var goal = document.getElementById("goal").value;
  var currency = document.getElementById("currency").value;
  var saved = document.getElementById("saved").value;
  var date = document.getElementById("date").value;
  var creator = document.getElementById("creator").value;

  var accumulation = {
    photo: photo,
    title: title,
    goal: goal,
    currency: currency,
    saved: saved,
    date: date,
    creator: creator
  };

  // Send data to the server
  fetch('/Monances-main/pages/Accumulations/save_accumulation.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(accumulation)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      modal.style.display = "none";
      addCardToPage(data.index, accumulation);
    } else {
      alert('Error: ' + data.message);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Handle form submission for editing an accumulation
document.getElementById("editForm").onsubmit = function(event) {
  event.preventDefault();

  var index = document.getElementById("editIndex").value;
  var photo = document.getElementById("editPhoto").value;
  var title = document.getElementById("editTitle").value;
  var goal = document.getElementById("editGoal").value;
  var currency = document.getElementById("editCurrency").value;
  var saved = document.getElementById("editSaved").value;
  var date = document.getElementById("editDate").value;
  var creator = document.getElementById("editCreator").value;

  var updatedAccumulation = {
    photo: photo,
    title: title,
    goal: goal,
    currency: currency,
    saved: saved,
    date: date,
    creator: creator
  };

  // Send updated data to the server
  fetch('/Monances-main/pages/Accumulations/update_accumulation.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ index: index, ...updatedAccumulation })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      editModal.style.display = "none";
      updateCardOnPage(index, updatedAccumulation);
    } else {
      alert('Error: ' + data.message);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Open the password modal for editing
function openPasswordModal(accumulation, index) {
  document.getElementById("editIndex").value = index;
  document.getElementById("editPhoto").value = accumulation.photo;
  document.getElementById("editTitle").value = accumulation.title;
  document.getElementById("editGoal").value = accumulation.goal;
  document.getElementById("editCurrency").value = accumulation.currency;
  document.getElementById("editSaved").value = accumulation.saved;
  document.getElementById("editDate").value = accumulation.date;
  document.getElementById("editCreator").value = accumulation.creator;

  passwordModal.style.display = "flex";
}

// Handle form submission for password authentication
document.getElementById("passwordForm").onsubmit = function(event) {
  event.preventDefault();

  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  fetch('/Monances-main/LoginRegistration.json')
    .then(response => response.json())
    .then(data => {
      if (data[username] === password) {
        passwordModal.style.display = "none";
        editModal.style.display = "flex";
      } else {
        alert('Invalid username or password');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to add a new card to the page
function addCardToPage(index, accumulation) {
  var container = document.getElementById("cardContainer");
  var card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${accumulation.photo}" alt="Photo">
    <h3>${accumulation.title}</h3>
    <p><strong>Goal:</strong> ${accumulation.goal} ${accumulation.currency}</p>
    <p><strong>Saved:</strong> ${accumulation.saved} ${accumulation.currency}</p>
    <p><strong>Date:</strong> ${accumulation.date || 'N/A'}</p>
    <p><strong>Creator:</strong> ${accumulation.creator}</p>
    <button class="edit-btn" onclick='openPasswordModal(${JSON.stringify(accumulation)}, ${index})'>Edit</button>
  `;
  container.appendChild(card);
}

// Function to open the edit modal with pre-filled data
function openEditModal(accumulation, index) {
  document.getElementById("editIndex").value = index;
  document.getElementById("editPhoto").value = accumulation.photo;
  document.getElementById("editTitle").value = accumulation.title;
  document.getElementById("editGoal").value = accumulation.goal;
  document.getElementById("editCurrency").value = accumulation.currency;
  document.getElementById("editSaved").value = accumulation.saved;
  document.getElementById("editDate").value = accumulation.date;
  document.getElementById("editCreator").value = accumulation.creator;

  editModal.style.display = "flex";
}

// Function to update card on the page
function updateCardOnPage(index, accumulation) {
  var container = document.getElementById("cardContainer");
  var card = container.getElementsByClassName("card")[index];

  card.innerHTML = `
    <img src="${accumulation.photo}" alt="Photo">
    <h3>${accumulation.title}</h3>
    <p><strong>Goal:</strong> ${accumulation.goal} ${accumulation.currency}</p>
    <p><strong>Saved:</strong> ${accumulation.saved} ${accumulation.currency}</p>
    <p><strong>Date:</strong> ${accumulation.date || 'N/A'}</p>
    <p><strong>Creator:</strong> ${accumulation.creator}</p>
    <button class="edit-btn" onclick='openPasswordModal(${JSON.stringify(accumulation)}, ${index})'>Edit</button>
  `;
}

// Load cards from file
loadCardsBtn.onclick = function() {
  fetch('/Monances-main/pages/Accumulations/accumulations.json')
    .then(response => response.json())
    .then(data => {
      data.forEach((accumulation, index) => {
        addCardToPage(index, accumulation);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
