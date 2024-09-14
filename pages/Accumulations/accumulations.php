<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accumulations - Money Manager Pro</title>
  <link rel="stylesheet" href="\Monances-main\pages\Dashboard\styles\global.css">
  <link rel="stylesheet" href="\Monances-main\pages\Dashboard\styles\style.css">
  <link rel="stylesheet" href="\Monances-main\pages\Accumulations\сss\Filter Section.css">
  <link rel="stylesheet" href="\Monances-main\pages\Accumulations\сss\card.css">

  
</head>
<body>
  <div class="container">
    <!-- Sidebar -->
    <aside>
      <div class="top">
        <div class="logo">
          <img src="\Monances-main\pages\Accumulations\img\Financial services.png" alt="Logo">
          <h3>Finance Manager</h3>
        </div>
      </div>
      <div class="sidebar">
        <a href="\Monances-main\pages\Dashboard\dashboard.php">
          <span class="icon">📊</span>
          <span>Dashboard</span>
        </a>
        <a href="/Monances-main/pages/Accumulations/accumulations.php">
          <span class="icon">💰</span>
          <span>Accumulations</span>
        </a>
        <a href="/Monances-main/pages/Рrofile/profile.php">
          <span class="icon">👤</span>
          <span>Setting up a profile</span>
        </a>
        <a href="https://t.me/Yura_Golinsky">
          <span class="icon">📞</span>
          <span>Contact</span>
        </a>
        <a href="/Monances-main/index.php">
          <span class="icon">🚪</span>
          <span>Exit</span>
        </a>
      </div>
    </aside>
    <!-- Main Content -->
    <main>
      <h1>Accumulations</h1>
      <p>This is the accumulations page. Here you can manage your savings and investments.</p>
      <!-- Button to Open the Modal -->
      <button id="openModalBtn">Add Accumulation</button>
      <button id="loadCardsBtn">To edit Upload cards</button>


<!-- Filter Section -->
<div class="filter-section">
  <label for="creatorFilter">Filter by Creator:</label>
  <select id="creatorFilter">
    <option value="">All</option>
    <!-- Options will be populated dynamically -->
  </select>
</div>

<!-- Container for Cards -->
<div id="cardContainer" class="card-container">
  <!-- Cards will be dynamically added here -->
</div>


      <!-- Container for Cards -->
      <div id="cardContainer" class="card-container">
        <!-- Cards will be dynamically added here -->
      </div>
    </main>

    <!-- The Modal for Adding Accumulation -->
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" id="closeModal">&times;</span>
        <h2>Add Accumulation</h2>
        <form id="accumulationForm">
          <label for="photo">Photo URL:</label>
          <input type="text" id="photo" name="photo" required><br>

          <label for="title">Title:</label>
          <input type="text" id="title" name="title" required><br>

          <label for="goal">Goal Amount:</label>
          <input type="number" id="goal" name="goal" required><br>

          <label for="currency">Currency:</label>
          <select id="currency" name="currency" required>
            <option value="UAH">₴ UAH</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
          </select><br>

          <label for="saved">Amount Saved:</label>
          <input type="number" id="saved" name="saved" required><br>

          <label for="date">Date (optional):</label>
          <input type="date" id="date" name="date"><br>

          <label for="creator">Creator Name:</label>
          <input type="text" id="creator" name="creator" required><br>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>

    <!-- The Edit Modal -->
    <div id="editModal" class="modal">
      <div class="modal-content">
        <span class="close" id="closeEditModal">&times;</span>
        <h2>Edit Accumulation</h2>
        <form id="editForm">
          <input type="hidden" id="editIndex" name="index">
          
          <label for="editPhoto">Photo URL:</label>
          <input type="text" id="editPhoto" name="photo" required><br>

          <label for="editTitle">Title:</label>
          <input type="text" id="editTitle" name="title" required><br>

          <label for="editGoal">Goal Amount:</label>
          <input type="number" id="editGoal" name="goal" required><br>

          <label for="editCurrency">Currency:</label>
          <select id="editCurrency" name="currency" required>
            <option value="UAH">₴ UAH</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
          </select><br>

          <label for="editSaved">Amount Saved:</label>
          <input type="number" id="editSaved" name="saved" required><br>

          <label for="editDate">Date (optional):</label>
          <input type="date" id="editDate" name="date"><br>

          <label for="editCreator">Creator Name:</label>
          <input type="text" id="editCreator" name="creator" required><br>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
<!-- Password Modal -->
<div id="passwordModal" class="modal">
  <div class="modal-content">
    <span class="close" id="closePasswordModal">&times;</span>
    <h2>Enter Password</h2>
    <form id="passwordForm">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required><br>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br>

      <button type="submit">Submit</button>
    </form>
  </div>
</div>




    <script src="/Monances-main/pages/Accumulations/JS/card.js"></script>
    <script src="/Monances-main/pages/Accumulations/JS/script.js"></script>
    <script src="/Monances-main/pages/Accumulations/JS/languageSelect.js"></script>

  

  
</body>
</html>
